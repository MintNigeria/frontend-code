import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { TransactionsIndexComponent } from './transactions-index/transactions-index.component';
import { FundWalletComponent } from './fund-wallet/fund-wallet.component';
import { GraduatesEffects } from 'src/app/store/graduates/effects';
import { graduatesReducer } from 'src/app/store/graduates/reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrganizationEffects } from 'src/app/store/organization/effects';
import { RequestEmptyStateComponent } from 'src/app/shared/request-empty-state/request-empty-state.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TransactionsComponent,
    TransactionsIndexComponent,
    FundWalletComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RequestEmptyStateComponent,
    TransactionsRoutingModule,
    NgxPaginationModule,
    StoreModule.forFeature('graduates', graduatesReducer),
    EffectsModule.forFeature([GraduatesEffects, OrganizationEffects]),

  ]
})
export class TransactionsModule { }
