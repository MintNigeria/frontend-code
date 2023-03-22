import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { TransactionsIndexComponent } from './transactions-index/transactions-index.component';
import { FundWalletComponent } from './fund-wallet/fund-wallet.component';


@NgModule({
  declarations: [
    TransactionsComponent,
    TransactionsIndexComponent,
    FundWalletComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule
  ]
})
export class TransactionsModule { }
