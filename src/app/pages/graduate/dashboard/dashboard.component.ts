import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { DashboardService } from 'src/app/core/services/dashboard/dashboard.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { isUserSelector } from 'src/app/store/auth/selector';
import { getGraduateDashboardBottomData, getGraduateDashboardBottomDataSuccess, getGraduateDashboardTopData, getGraduateDashboardTopDataSuccess } from 'src/app/store/dashboard/action';
import { getMyInstitutionNotified, getMyInstitutionNotifiedSuccess, getMyInstitutionsNotifiedStatus, getMyInstitutionsNotifiedStatusSuccess, notifyMyInstitution, notifyMyInstitutionSuccess } from 'src/app/store/graduates/action';
import { AppStateInterface } from 'src/app/types/appState.interface';
import {Chart} from 'chart.js/auto'
import { MatDialog } from '@angular/material/dialog';
import { DateRangeComponent } from 'src/app/shared/date-range/date-range.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  deviceModel: string;
  ipAddress: any;
  // user$ = this.appStore.pipe(select(isUserSelector));

  filter = {
    range: 0,
  }
  userData: any;
  cardData!: any;
  recentApplications: any;
  recentTransactions: any;
  updatedData: any;
  showNotifyButton: any;
  modalId = 'messageModal'
  notifyInstitutionForm!: FormGroup
  user: any;
  
  constructor(
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
    private fb: FormBuilder,
    private utilityService: UtilityService,
    private notification: NotificationsService,
    private dashboardService: DashboardService,
    private dialog : MatDialog,

  ) { 
    const userAgent = navigator.userAgent;

    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
      this.deviceModel = 'iPad or iPhone';
    } else if (userAgent.match(/Android/i)) {
      this.deviceModel = 'Android';
    } else if (userAgent.match(/Window/i)) {
      this.deviceModel = 'Window';
    } else {
      this.deviceModel = 'Other';
    }
    const data: any = localStorage.getItem('authData')
    this.user = JSON.parse(data)

  }

  ngOnInit(): void {
    this.loadIp();
    this.initForm()
    const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)

    // this.store.dispatch(getGraduateDashboardTopData({payload: {...this.filter, GraduateId: this.userData.GraduateId}}))
    // this.actions$.pipe(ofType(getGraduateDashboardTopDataSuccess)).subscribe((res: any) => {
    //   console.log(res)
    //   this.cardData = res.payload;
    // })
    this.dashboardService.getGraduateDashboardTopData({...this.filter, GraduateId: this.userData.GraduateId}).subscribe((res: any) => {
      this.cardData = res.payload;
      // console.log(res.payload)
    })
    
    this.store.dispatch(getGraduateDashboardBottomData({payload: {...this.filter, GraduateId: this.userData.GraduateId}}))
    this.actions$.pipe(ofType(getGraduateDashboardBottomDataSuccess)).subscribe((res: any) => {
      this.recentApplications = res.payload.recentApplicationVMs;
      this.recentTransactions = res.payload.paymentHistoryVMs;
      this.createDistributionChart2(res.payload.applicationAndVerificationAnalyticsVMs)
    })

    this.checkInstitutionOnboarded()
    this.checkInstitutionOnboardedStatus()
  }

initForm() {
  this.notifyInstitutionForm = this.fb.group({
    institutionName: [''],
    institutionBody: [''],
    institutionType: [''],
    institutionSector: [''],
    faculty: ['', Validators.required],
    department: ['', Validators.required],
    matriculationNumber: [''],
    graduateId: ['', Validators.required],
    imei: '',
      serialNumber: '',
      device: '',
      ipAddress: ''
  })
}
  
  loadIp() {
    this.utilityService.getuserIP().subscribe((res: any) => {
     this.ipAddress = res.ip
    })
  }
  checkInstitutionOnboardedStatus() {
    this.store.dispatch(getMyInstitutionsNotifiedStatus({id: this.userData.GraduateId}))
    this.actions$.pipe(ofType(getMyInstitutionsNotifiedStatusSuccess)).subscribe((res: any) => {
     this.showNotifyButton = res.payload.showNotifyMe

    })
   
  }
  checkInstitutionOnboarded() {
    this.store.dispatch(getMyInstitutionsNotifiedStatus({id: this.userData.GraduateId}))
    this.store.dispatch(getMyInstitutionNotified({id: this.userData.GraduateId}))
    this.actions$.pipe(ofType(getMyInstitutionNotifiedSuccess)).subscribe((res: any) => {
     this.updatedData = res.payload.payload
     this.notifyInstitutionForm.patchValue({
      graduateId: Number(this.userData.GraduateId),
      imei: '',
      serialNumber: '',
      device: this.deviceModel,
      ipAddress: this.ipAddress
     })
    //  .map((x: any) => {
    //     if (x.hasInstitutionOnboarded === false) {
    //       return {
    //         institutionName: x.institutionName,
    //         imei: '',
    //   serialNumber: '',
    //   device: this.deviceModel,
    //   ipAddress: this.ipAddress
    //       }
    //     } else {
    //       return x
    //     }
    //   })

    })
   
  }

  selectInstitution(event: any) {
    this.notifyInstitutionForm.patchValue({
      institutionName : event.institutionName,
      institutionBody: event.institutionBody,
      institutionType : event.institutionType,
      institutionSector : event.institutionSector
    })
  }

  notifyInstitution() {
    document.getElementById('myModal')?.click()
    
  }
  
  cancel() {
    this.notifyInstitutionForm.reset();
    document.getElementById('myModal')?.click()

  }
  actionNotification() {
    console.log(this.notifyInstitutionForm.value)
    this.store.dispatch(notifyMyInstitution({payload: this.notifyInstitutionForm.value}))
    this.actions$.pipe(ofType(notifyMyInstitutionSuccess)).subscribe((res: any) => {
      this.notification.publishMessages('success', res.payload.description)
      // document.getElementById('myModal')?.click()
      this.cancel()
    })

  }

  changeRange(range: number) {
    if (range === 5) {
      // launch calender
      const dialogRef = this.dialog.open(DateRangeComponent, {
        // width: '600px',
        height: 'auto',
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe((res: any) => {
        if (res) {
              const {start , end} = res; // use this start and end as fromDate and toDate on your filter
              const filter = {...this.filter, ['startDate'] : start, ['endDate'] : end, range: 5}
              this.filter = filter;

              this.store.dispatch(getGraduateDashboardBottomData({payload: {...this.filter, GraduateId: this.userData.GraduateId}}))
            }
            
          })
        } else {
          const filter = {...this.filter, ['range'] : range};
          this.filter = filter;

          this.store.dispatch(getGraduateDashboardBottomData({payload: {...this.filter, GraduateId: this.userData.GraduateId}}))
        }
  }
  
  createDistributionChart2(data: any) {
    const t_ctx = document.getElementById('request') as unknown as any;
    const ctx = t_ctx.getContext('2d')
    
    const chartExist = Chart.getChart('request')
    if(chartExist != undefined) {
      chartExist.destroy(); 
    }
    const grad = data?.completedApplicationValue
    const org = data?.completedVerificationValue
    const label = data?.completedRequest
   
    const chart = new Chart(ctx, {
      data: {
        labels: label,
        datasets: [
          {
            type: 'line',
            label: 'Application',
            data: grad,
            // fill: false,
            backgroundColor: '#0D47A1'
          }, {
            type: 'line',
            label: 'Verification',
            data: org,
            // fill: false,
            borderColor: '#FAC515'
          }]
      },
      options: {
        interaction: {},
        scales: {
          x: {
            display: true,
          },
          y: {
            display: true,
          },
        },
        plugins: {
          legend: {
            display: false,
            position: 'right',
          },
        },
      },
    }

    );
    chart.update()
  }
  
  
}
