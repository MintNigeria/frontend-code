import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DashboardEffects } from 'src/app/store/dashboard/effects';
import { dashboardReducer } from 'src/app/store/dashboard/reducer';
import { RevenueChartComponent } from './revenue-chart/revenue-chart.component';
import { TopInstitutionChartComponent } from './top-institution-chart/top-institution-chart.component';
import { RevenuePieChartComponent } from './revenue-pie-chart/revenue-pie-chart.component';


@NgModule({
  declarations: [
    DashboardComponent,
    RevenueChartComponent,
    TopInstitutionChartComponent,
    RevenuePieChartComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    StoreModule.forFeature('dashboard', dashboardReducer),
    EffectsModule.forFeature([DashboardEffects])

  ]
})
export class DashboardModule { }
