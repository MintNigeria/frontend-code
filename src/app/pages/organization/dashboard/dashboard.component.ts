import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DashboardService } from 'src/app/core/services/dashboard/dashboard.service';
import { DateRangeComponent } from 'src/app/shared/date-range/date-range.component';
import { getAllDashboardInfoData, getOrganizationDashboardBottomInfo, getOrganizationDashboardBottomInfoSuccess, getOrganizationDashboardInfo, getOrganizationDashboardInfoSuccess, getOrganizationVeficiationAnalysis, getOrganizationVeficiationAnalysisSuccess } from 'src/app/store/dashboard/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  verificationHistory = [
  {
    id: '1',
    date: '12/01/2023',
    verificationID: '#3066',
    name:'Adekunle Ciroma',
    phoneNumber: '0819036356377',
    institution: 'University of Lagos',
    department: 'Banking and Finance',
    reasonForRequest: 'Educational Verification',
    action: 'View'
  },
  {
    id: '2',
    date: '12/01/2023',
    verificationID: '#3066',
    name:'Adekunle Ciroma',
    phoneNumber: '0819036356377',
    institution: 'University of Lagos',
    department: 'Banking and Finance',
    reasonForRequest: 'Educational Verification',
    action: 'View'
  },
  {
    id: '3',
    date: '12/01/2023',
    verificationID: '#3066',
    name:'Adekunle Ciroma',
    phoneNumber: '0819036356377',
    institution: 'University of Lagos',
    department: 'Banking and Finance',
    reasonForRequest: 'Educational Verification',
    action: 'View'
  },
  {
    id: '4',
    date: '12/01/2023',
    verificationID: '#3066',
    name:'Adekunle Ciroma',
    phoneNumber: '0819036356377',
    institution: 'University of Lagos',
    department: 'Banking and Finance',
    reasonForRequest: 'Educational Verification',
    action: 'View'
  },
  {
    id: '5',
    date: '12/01/2023',
    verificationID: '#3066',
    name:'Adekunle Ciroma',
    phoneNumber: '0819036356377',
    institution: 'University of Lagos',
    department: 'Banking and Finance',
    reasonForRequest: 'Educational Verification',
    action: 'View'
  },
  {
    id: '6',
    date: '12/01/2023',
    verificationID: '#3066',
    name:'Adekunle Ciroma',
    phoneNumber: '0819036356377',
    institution: 'University of Lagos',
    department: 'Banking and Finance',
    reasonForRequest: 'Educational Verification',
    action: 'View'
  }
 ]
 filter = {
  range: 0,
}
  cardInfo: any;
  userData: any;
  verificationData: any;
  constructor(
    private appStore: Store<AppStateInterface>,
    private store: Store,
    private actions$: Actions,
    private dialog : MatDialog,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)
    this.store.dispatch(getOrganizationDashboardInfo({payload: {...this.filter, organizationId: this.userData.OrganizationId}}))
    this.actions$.pipe(ofType(getOrganizationDashboardInfoSuccess)).subscribe((res: any) => {
      this.cardInfo = res.payload;
    })
   
    this.store.dispatch(getOrganizationDashboardBottomInfo({payload: {...this.filter, organizationId: this.userData.OrganizationId}}))
    this.actions$.pipe(ofType(getOrganizationDashboardBottomInfoSuccess)).subscribe((res: any) => {
      this.verificationData = res.payload;
    })

    // called directly as a temporaty fix. 
    this.dashboardService.getOrganizationVerificationAnalysis({...this.filter, organizationId: this.userData.OrganizationId}).subscribe((res: any) => {
      console.log(res)
    })

    // this.store.dispatch(getOrganizationVeficiationAnalysis({payload: {...this.filter, organizationId: this.userData.OrganizationId}}))
    // this.actions$.pipe(ofType(getOrganizationVeficiationAnalysisSuccess)).subscribe((res: any) => {
    //   //console.log(res)
    // })
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
              const filter = {...this.filter, ['startDate'] : start, ['endDate'] : end}
              this.filter = filter;
              this.store.dispatch(getAllDashboardInfoData({payload: this.filter}))
              
            }
            
          })
        } else {
          const filter = {...this.filter, ['range'] : range};
          this.filter = filter;
          this.store.dispatch(getOrganizationDashboardInfo({payload: this.filter}))
        }
  }
  
}
