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

  }

  ngAfterViewInit(): void {
    // this.createDistributionChart()
    this.createDistributionChart2()

  }
  createDistributionChart2() {
    throw new Error('Method not implemented.');
  }

  getDashboardCardInfo() {
    this.dashboardCardInfo$.subscribe((res: any) => {
      this.cardInfo = res
      console.log(res)
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
    // console.log(res.topRequestsVMs, a, b)
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
  const {revenueFromTranscripts, revenueFromCertificates, revenueFromOther} = this.revenueAnalysisData
  const label = ['Certificates', 'Transcript','Others'];
  const bar = [revenueFromCertificates,revenueFromTranscripts, revenueFromOther];
  console.log(bar)
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


}
