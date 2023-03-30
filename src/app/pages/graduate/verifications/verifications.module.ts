import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificationsRoutingModule } from './verifications-routing.module';
import { VerificationsComponent } from './verifications.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { NewVerificationComponent } from './new-verification/new-verification.component';
import {  NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    VerificationsComponent,
    ViewDetailsComponent,
    NewVerificationComponent
  ],
  imports: [
    CommonModule,
    VerificationsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class VerificationsModule { }
