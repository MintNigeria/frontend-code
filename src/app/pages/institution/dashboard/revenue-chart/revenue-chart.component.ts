import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {Chart} from 'chart.js/auto'
import { dashboardRevenueSelector } from 'src/app/store/dashboard/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-revenue-chart',
  templateUrl: './revenue-chart.component.html',
  styleUrls: ['./revenue-chart.component.scss']
})
export class RevenueChartComponent implements OnInit {
@Input() revenueChartData!: any
revenueAnalysis$ = this.appStore.pipe(select(dashboardRevenueSelector));
  revenueAnalysisData: any;

  constructor(
    private appStore: Store<AppStateInterface>,
    private store: Store,
  ) { }

  ngOnInit(): void {
    // this.createDistributionChart2()
    this.getRevenueAnalysis()
  }

  getRevenueAnalysis() {
    this.revenueAnalysis$.subscribe((res: any) => {
      this.revenueAnalysisData = res
      setTimeout(() => {
        this.createDistributionChart2()
      }, 2000);
    })
    
  }

  
  createDistributionChart2() {
    const t_ctx = document.getElementById('request') as unknown as any;
    const ctx = t_ctx.getContext('2d')
    
    const chartExist = Chart.getChart('request')
    if(chartExist != undefined) {
      chartExist.destroy(); 
    }
    const grad = this.revenueAnalysisData?.revenueStatisticsBar?.completedGradValue
    const org = this.revenueAnalysisData?.revenueStatisticsBar?.completedOrgValue
    const label = this.revenueAnalysisData?.revenueStatisticsBar?.completedRequest
   
    const chart = new Chart(ctx, {
      data: {
        labels: label,
        datasets: [
          {
            type: 'bar',
            label: 'Graduate',
            data: grad,
            // fill: false,
            backgroundColor: '#0D47A1'
          }, {
            type: 'line',
            label: 'Organization',
            data: org,
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


