import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentPlanComponent } from './payment-plan/payment-plan.component';
import { MakePaymentComponent } from './payment-plan/make-payment/make-payment.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    TransactionsComponent,
    PaymentPlanComponent,
    MakePaymentComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class TransactionsModule { }
