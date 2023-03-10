import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValueAddedServicesRoutingModule } from './value-added-services-routing.module';
import { ValueAddedServicesComponent } from './value-added-services.component';


@NgModule({
  declarations: [
    ValueAddedServicesComponent
  ],
  imports: [
    CommonModule,
    ValueAddedServicesRoutingModule
  ]
})
export class ValueAddedServicesModule { }
