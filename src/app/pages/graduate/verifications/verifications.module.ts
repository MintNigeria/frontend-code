import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificationsRoutingModule } from './verifications-routing.module';
import { VerificationsComponent } from './verifications.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { VerificationDetailsComponent } from './verification-details/verification-details.component';
import { NewVerificationComponent } from './new-verification/new-verification.component';
import { InstitutionDetailsComponent } from './new-verification/institution-details/institution-details.component';
import { SharedModule  } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchTableComponent } from './new-verification/search-table/search-table.component';
import { VerificationReasonComponent } from './new-verification/verification-reason/verification-reason.component';
import { RequestEmptyStateComponent } from 'src/app/shared/request-empty-state/request-empty-state.component';
import { MakePaymentComponent } from './new-verification/make-payment/make-payment.component';


@NgModule({
  declarations: [
    VerificationsComponent,
    VerificationDetailsComponent,
    NewVerificationComponent,
    InstitutionDetailsComponent,
    SearchTableComponent,
    MakePaymentComponent,
    VerificationReasonComponent
  ],
  imports: [
    CommonModule,
    RequestEmptyStateComponent,
    VerificationsRoutingModule,
    NgxPaginationModule,
    NgSelectModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VerificationsModule { }
