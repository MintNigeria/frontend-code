import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificationsRoutingModule } from './verifications-routing.module';
import { VerificationsComponent } from './verifications.component';


@NgModule({
  declarations: [
    VerificationsComponent
  ],
  imports: [
    CommonModule,
    VerificationsRoutingModule
  ]
})
export class VerificationsModule { }
