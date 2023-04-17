import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {Chart} from 'chart.js/auto'
import { dashboardRevenueSelector } from 'src/app/store/dashboard/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-revenue-pie-chart',
  templateUrl: './revenue-pie-chart.component.html',
  styleUrls: ['./revenue-pie-chart.component.scss']
})
export class RevenuePieChartComponent implements OnInit {
@Input() revenueAnalysisData!: any
@Input() revenueChartData!: any
revenueAnalysis$ = this.appStore.pipe(select(dashboardRevenueSelector));

  constructor(
    private appStore: Store<AppStateInterface>,
    private store: Store,

  ) { }

  ngOnInit(): void {
    // this.createDistributionChart3()
    this.getRevenueAnalysis()
  }

  getRevenueAnalysis() {
    this.revenueAnalysis$.subscribe((res: any) => {
      this.revenueAnalysisData = res
      // console.log(res)
      setTimeout(() => {
        this.createDistributionChart3()
      }, 2000);
    })
    
  }

  createDistributionChart3( ) {
    const {completedRequests, processingRequests, pendingRequests} = this.revenueAnalysisData
    const label = ['Completed', 'Processing','Pending'];
    const bar = [completedRequests, processingRequests, pendingRequests];
    ////console.log(bar)
    const t_ctx = document.getElementById('pieData') as unknown as any;
    const ctx = t_ctx.getContext('2d')
    const chartExist = Chart.getChart('pieData')
    if(chartExist != undefined) {
      chartExist.destroy(); 
    }
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
