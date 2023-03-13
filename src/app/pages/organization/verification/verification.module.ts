import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificationRoutingModule } from './verification-routing.module';
import { VerificationComponent } from './verification.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StartVerificationComponent } from './start-verification/start-verification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchResultsComponent } from './start-verification/search-results/search-results.component';
import { VerifyDocumentsComponent } from './start-verification/search-results/verify-documents/verify-documents.component';


@NgModule({
  declarations: [
    VerificationComponent,
    StartVerificationComponent,
    SearchResultsComponent,
    VerifyDocumentsComponent
  ],
  imports: [
    CommonModule,
    VerificationRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class VerificationModule { }
