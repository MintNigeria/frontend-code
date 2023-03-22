import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { reportingReducer } from 'src/app/store/reporting/reducers';
import { ReportingEffects } from 'src/app/store/reporting/effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { InstitutionEffects } from 'src/app/store/institution/effects';

@NgModule({
  declarations: [
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxPaginationModule,
    TransactionsRoutingModule,
    StoreModule.forFeature('reporting', reportingReducer),
    EffectsModule.forFeature([ReportingEffects, InstitutionEffects]),

  ]
})
export class TransactionsModule { }
