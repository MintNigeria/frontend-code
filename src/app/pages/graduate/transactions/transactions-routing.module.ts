import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FundWalletComponent } from './fund-wallet/fund-wallet.component';
import { TransactionsIndexComponent } from './transactions-index/transactions-index.component';
import { TransactionsComponent } from './transactions.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsComponent,
    children: [
      { path: '', component: TransactionsIndexComponent },
      { path: 'fund-wallet', component: FundWalletComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule {}
