import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {Chart} from 'chart.js/auto'
import { dashboardTopInstitutionSelector } from 'src/app/store/dashboard/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-top-institution-chart',
  templateUrl: './top-institution-chart.component.html',
  styleUrls: ['./top-institution-chart.component.scss']
})
export class TopInstitutionChartComponent implements OnInit {
  topInstitutionRequest$ = this.appStore.pipe(select(dashboardTopInstitutionSelector));

  @Input() topInstitutionRequests! : any
  topInstitutionRequestData: any;
  constructor(
    private appStore: Store<AppStateInterface>,
    private store: Store,

  ) { }

  ngOnInit(): void {
    this.getTopInstitutions()
    // this.createDistributionChart()

  }

  getTopInstitutions() {
    this.topInstitutionRequest$.subscribe((res: any) => {
      this.topInstitutionRequestData = res
      setTimeout(() => {
        this.createDistributionChart()
        
      }, 2000);
    })
  }

  createDistributionChart( ) {
    const data = this.topInstitutionRequests?.topRequestsVMs;
    const a = this.topInstitutionRequestData?.topRequestsVMs?.map((x: any) => {
      return x.institutionName
    })
    const b = this.topInstitutionRequestData?.topRequestsVMs?.map((x: any) => {
      return x.noOfRequests
    })
    const chartExist = Chart.getChart('consentData')
    if(chartExist != undefined) {
      chartExist.destroy(); 
    }
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
    myChart?.update();
  }

}
