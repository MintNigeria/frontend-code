import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValueAddedServicesRoutingModule } from './value-added-services-routing.module';
import { ValueAddedServicesComponent } from './value-added-services.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MakePaymentVasComponent } from './make-payment-vas/make-payment-vas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewReportsComponent } from './view-reports/view-reports.component';


@NgModule({
  declarations: [
    ValueAddedServicesComponent,
    MakePaymentVasComponent,
    ViewReportsComponent
  ],
  imports: [
    CommonModule,
    ValueAddedServicesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ValueAddedServicesModule { }
