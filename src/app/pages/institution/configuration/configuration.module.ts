import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { ProcessingFeeComponent } from './processing-fee/processing-fee.component';
import { VerificationFeeComponent } from './verification-fee/verification-fee.component';
import { DispatchFeeComponent } from './dispatch-fee/dispatch-fee.component';
import { InstitutionSetupComponent } from './institution-setup/institution-setup.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AwaitingApprovalComponent } from './processing-fee/awaiting-approval/awaiting-approval.component';
import { AwaitingApprovalFeeComponent } from './verification-fee/awaiting-approval-fee/awaiting-approval-fee.component';


@NgModule({
  declarations: [
    ConfigurationComponent,
    ProcessingFeeComponent,
    VerificationFeeComponent,
    DispatchFeeComponent,
    InstitutionSetupComponent,
    AwaitingApprovalComponent,
    AwaitingApprovalFeeComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class ConfigurationModule { }
