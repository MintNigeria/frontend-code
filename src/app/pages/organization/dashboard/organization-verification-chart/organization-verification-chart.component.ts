import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Chart } from 'chart.js';
import { DateRangeComponent } from 'src/app/shared/date-range/date-range.component';
import { getOrganizationVerificationAnalysisData, getOrganizationVerificationAnalysisDataSuccess, getOrganizationDashboardInfo } from 'src/app/store/dashboard/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-organization-verification-chart',
  templateUrl: './organization-verification-chart.component.html',
  styleUrls: ['./organization-verification-chart.component.scss']
})
export class OrganizationVerificationChartComponent implements OnInit {
  userData: any;
  filter = {
    range: 0,
  }
  constructor(
    private appStore: Store<AppStateInterface>,
    private store: Store,
    private actions$: Actions,
    private dialog : MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)
    this.store.dispatch(getOrganizationVerificationAnalysisData({payload: {...this.filter, organizationId: this.userData.OrganizationId}}))
    this.actions$.pipe(ofType(getOrganizationVerificationAnalysisDataSuccess)).subscribe((res: any) => {
      this.createDistributionChart2(res.payload.verificationAnalyticsVMs)

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

              this.store.dispatch(getOrganizationVerificationAnalysisData({payload: {...this.filter, organizationId: this.userData.OrganizationId}}))

              // this.store.dispatch(getAllDashboardInfoData({payload: this.filter}))
              // called directly as a temporaty fix. 
    // this.dashboardService.getOrganizationVerificationAnalysis({...this.filter, organizationId: this.userData.OrganizationId}).subscribe((res: any) => {
    //   console.log(res)
    // })

              
            }
            
          })
        } else {
          const filter = {...this.filter, ['range'] : range};
          this.filter = filter;

          this.store.dispatch(getOrganizationVerificationAnalysisData({payload: {...this.filter, organizationId: this.userData.OrganizationId}}))

          // called directly as a temporaty fix. 
    // this.dashboardService.getOrganizationVerificationAnalysis({...this.filter, organizationId: this.userData.OrganizationId}).subscribe((res: any) => {
    //   console.log(res)
    // })

        }
  }

  createDistributionChart2(data: any) {
    const t_ctx = document.getElementById('request') as unknown as any;
    const ctx = t_ctx.getContext('2d')
    
    const chartExist = Chart.getChart('request')
    if(chartExist != undefined) {
      chartExist.destroy(); 
    }
    const verification = data.completedVerValue
    const label = data.completedRequest
   
    const chart = new Chart(ctx, {
      data: {
        labels: label,
        datasets: [
          {
            type: 'bar',
            label: 'Verification',
            data: verification,
            // fill: false,
            backgroundColor: '#0D47A1'
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
