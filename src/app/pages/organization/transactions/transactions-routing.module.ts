import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakePaymentComponent } from './payment-plan/make-payment/make-payment.component';
import { PaymentPlanComponent } from './payment-plan/payment-plan.component';
import { TransactionsComponent } from './transactions.component';
import { FundWalletComponent } from './fund-wallet/fund-wallet.component';

const routes: Routes = [
  {path: '', component: TransactionsComponent,},
  {path: 'payment-plan' ,component: PaymentPlanComponent},
  {path: 'fund-wallet' ,component: FundWalletComponent},
  {path: 'make-payment/:id' ,component: MakePaymentComponent},
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
