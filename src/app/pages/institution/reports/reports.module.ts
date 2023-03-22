import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InstitutionEffects } from 'src/app/store/institution/effects';
import { ReportingEffects } from 'src/app/store/reporting/effects';
import { reportingReducer } from 'src/app/store/reporting/reducers';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReportsRoutingModule,
    NgxPaginationModule,
    StoreModule.forFeature('reporting', reportingReducer),
    EffectsModule.forFeature([ReportingEffects, InstitutionEffects]),

  ]
})
export class ReportsModule { }
