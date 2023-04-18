import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { DashboardService } from 'src/app/core/services/dashboard/dashboard.service';
import { DateRangeComponent } from 'src/app/shared/date-range/date-range.component';
import { getAllDashboardInfoData, getOrganizationDashboardBottomInfo, getOrganizationDashboardBottomInfoSuccess, getOrganizationDashboardInfo, getOrganizationDashboardInfoSuccess, getOrganizationVerificationAnalysisData, getOrganizationVerificationAnalysisDataSuccess } from 'src/app/store/dashboard/action';
import { AppStateInterface } from 'src/app/types/appState.interface';
import {Chart} from 'chart.js/auto'
import { isUserSelector } from 'src/app/store/auth/selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user$ = this.appStore.pipe(select(isUserSelector));

  verificationHistory: any
 filter = {
  range: 0,
}
  cardInfo: any;
  userData: any;
  verificationData: any;
  topVerification: any;
  selectedDateType!: string;
  constructor(
    private appStore: Store<AppStateInterface>,
    private store: Store,
    private actions$: Actions,
    private dialog : MatDialog,
    private dashboardService: DashboardService,
    private router: Router
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
      this.topVerification = res.payload.topVerificationVMs;
      this.verificationHistory = res.payload.recentVerificationsVMs;
      setTimeout(() => {
        this.createDistributionChart()
      }, 3000);
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
              const filter = {...this.filter, ['startDate'] : start, ['endDate'] : end}
              this.filter = filter;

              this.store.dispatch(getOrganizationDashboardInfo({payload: {...this.filter, organizationId: this.userData.OrganizationId}}))

              
            }
            
          })
        } else {
          const filter = {...this.filter, ['range'] : range};
          this.filter = filter;

          this.store.dispatch(getOrganizationDashboardInfo({payload: {...this.filter, organizationId: this.userData.OrganizationId}}))

        }
  }
  changeTopListRange(range: number, name: string) {
    this.selectedDateType = name
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

              this.store.dispatch(getOrganizationDashboardBottomInfo({payload: {...this.filter, organizationId: this.userData.OrganizationId}}))

              
            }
            
          })
        } else {
          const filter = {...this.filter, ['range'] : range};
          this.filter = filter;

          this.store.dispatch(getOrganizationDashboardBottomInfo({payload: {...this.filter, organizationId: this.userData.OrganizationId}}))

        }
  }


  

  viewVerification(id: any) {
    this.router.navigateByUrl(`/organization/verifications/view-verified-documents/${id}`)
  }

  createDistributionChart( ) {
    const a = this.topVerification?.map((x: any) => {
      return x.institutionName
    })
    const b = this.topVerification?.map((x: any) => {
      return x.noOfVerification
    })
    const t_ctx = document.getElementById('consentData') as unknown as any;
    const ctx = t_ctx.getContext('2d')
    const chartExist = Chart.getChart('consentData')
    if(chartExist != undefined) {
      chartExist.destroy(); 
    }
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: a,
        datasets: [
          {
          // label: 'Revenue',
          data: b,
          backgroundColor: '#4086EF'
        }
      ]
      },
      options: {
        indexAxis: 'y',
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
    myChart.update();
  }
  
}
