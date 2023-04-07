import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { DateRangeComponent } from 'src/app/shared/date-range/date-range.component';
import { isUserSelector } from 'src/app/store/auth/selector';
import { getAllDashboardInfoData, getDashboardRevenueAnalysis, getDashboardTopInstitutions } from 'src/app/store/dashboard/action';
import { dashboardCardSelector, dashboardSelector } from 'src/app/store/dashboard/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';
import {Chart} from 'chart.js/auto'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  user$ = this.appStore.pipe(select(isUserSelector));
  dashboardCardInfo$ = this.appStore.pipe(select(dashboardCardSelector));
  revenueAnalysis$ = this.appStore.pipe(select(dashboardSelector));
  topInstitutionRequest$ = this.appStore.pipe(select(dashboardSelector));

  cardFilter = {
    range: 0,
    institutionId: '',
  }
  institutionData: any;
  institutionId: any;
  filter: any;
  cardInfo: any;
  revenueAnalysisData: any;
  topInstitutionRequests: any;
  constructor(
    private appStore: Store<AppStateInterface>,
    private store: Store,
    private actions$: Actions,
    private dialog : MatDialog
  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.institutionData = JSON.parse(data)
    this.institutionId = this.institutionData.InstitutionId

    this.store.dispatch(getAllDashboardInfoData({payload: {...this.cardFilter, institutionId: this.institutionId }}))
    this.store.dispatch(getDashboardRevenueAnalysis({payload: {...this.filter, institutionId: this.institutionId}}))
    this.store.dispatch(getDashboardTopInstitutions({payload: {...this.cardFilter, institutionId: this.institutionId}}))
    this.getDashboardCardInfo()
    this.getRevenueAnalysis()
    this.getTopInstitutions()

  }

  reloadScreen() {
    const cardFilter = {
      range: 0,
      institutionId: '',
    }
    this.store.dispatch(getAllDashboardInfoData({payload: {...cardFilter, institutionId: this.institutionId }}))
    this.store.dispatch(getDashboardRevenueAnalysis({payload: {...this.filter, institutionId: this.institutionId}}))
    this.store.dispatch(getDashboardTopInstitutions({payload: {...cardFilter, institutionId: this.institutionId}}))

  }

  ngAfterViewInit(): void {
    // this.createDistributionChart()
    this.createDistributionChart2()

  }


  getDashboardCardInfo() {
    this.dashboardCardInfo$.subscribe((res: any) => {
      this.cardInfo = res
      ////console.log(res)
      // this.createDistributionChart()
  })
}

getRevenueAnalysis() {
  this.revenueAnalysis$.subscribe((res: any) => {
    this.revenueAnalysisData = res
    this.createDistributionChart2()
    this.createDistributionChart3()

  })
}
getTopInstitutions() {
  this.topInstitutionRequest$.subscribe((res: any) => {
    this.topInstitutionRequests = res
    // const a = this.topInstitutionRequests?.topRequestsVMs?.map((x: any) => {
    //   return x.institutionName
    // })
    // const b = this.topInstitutionRequests?.topRequestsVMs?.map((x: any) => {
    //   return x.noOfRequests
    // })
    // ////console.log(res.topRequestsVMs, a, b)
    this.createDistributionChart()
  })
}

createDistributionChart( ) {
  const data = this.topInstitutionRequests?.topRequestsVMs;
  const a = this.topInstitutionRequests?.topRequestsVMs?.map((x: any) => {
    return x.institutionName
  })
  const b = this.topInstitutionRequests?.topRequestsVMs?.map((x: any) => {
    return x.noOfRequests
  })
  const t_ctx = document.getElementById('consentData') as unknown as any;
  const ctx = t_ctx.getContext('2d')

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
            const filter = {...this.cardFilter, ['startDate'] : start, ['endDate'] : end}
            this.cardFilter = filter;
            this.store.dispatch(getAllDashboardInfoData({payload: {...this.cardFilter, institutionId: this.institutionId }}))
            
          }
          
        })
      } else {
        const filter = {...this.filter, ['range'] : range};
        this.cardFilter = filter;
        this.store.dispatch(getAllDashboardInfoData({payload: {...this.cardFilter, institutionId: this.institutionId }}))
  }
}

createDistributionChart3( ) {
  const {completedRequests, processingRequests, pendingRequests} = this.revenueAnalysisData
  const label = ['Completed', 'Processing','Pending'];
  const bar = [completedRequests, processingRequests, pendingRequests];
  ////console.log(bar)
  const t_ctx = document.getElementById('pieData') as unknown as any;
  const ctx = t_ctx.getContext('2d')

  const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: label,
      datasets: [
        {
        // label: 'Revenue',
        data: bar,
        backgroundColor: ['#2ED3B7', '#FEC84B', '#4086EF']
      }
    ]
    },
    options: {
      // indexAxis: 'y',
      interaction: {},
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
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


  createDistributionChart2() {
    const data = this.topInstitutionRequests?.topRequestsVMs;
    const a = this.revenueAnalysisData.requestStatisticsVms?.map((x: any) => {
      return x.graduate
    })
    const b = this.revenueAnalysisData.requestStatisticsVms?.map((x: any) => {
      return x.organization
    })
    //console.log(a, b)
    const labels = ['MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT', 'SUN'];
    const bar = [100, 80, 25, 50, 400, 150, 200, 250, 300, 350];
    const line = [0, 50, 75, 50, 100, 150, 60, 35, 200, 150];
    const t_ctx = document.getElementById('request') as unknown as any;
    const ctx = t_ctx.getContext('2d')


    const chart = new Chart(ctx, {
      data: {
        labels: labels,
        datasets: [
          {
            type: 'bar',
            label: 'Graduate',
            data: a,
            // fill: false,
            backgroundColor: '#0D47A1'
          }, {
            type: 'line',
            label: 'Organization',
            data: b,
            // fill: false,
            borderColor: '#92BAF6'
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
