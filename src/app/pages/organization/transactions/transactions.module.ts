import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentPlanComponent } from './payment-plan/payment-plan.component';
import { MakePaymentComponent } from './payment-plan/make-payment/make-payment.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrganizationEffects } from 'src/app/store/organization/effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { organizationReducer } from 'src/app/store/organization/reducers';
import { ConfigurationEffects } from 'src/app/store/configuration/effects';


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
    NgxPaginationModule,
    StoreModule.forFeature('organization', organizationReducer),
    EffectsModule.forFeature([OrganizationEffects, ConfigurationEffects]),

  ]
})
export class TransactionsModule { }
