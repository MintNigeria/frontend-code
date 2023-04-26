import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultsComponent } from './start-verification/search-results/search-results.component';
import { VerifyDocumentsComponent } from './start-verification/search-results/verify-documents/verify-documents.component';
import { StartVerificationComponent } from './start-verification/start-verification.component';
import { VerificationComponent } from './verification.component';
import { GraduateVerificationDetailsComponent } from './start-verification/graduate-verification-details/graduate-verification-details.component';
import { GraduateVerificationDetailsSearchResultComponent } from './start-verification/graduate-verification-details-search-result/graduate-verification-details-search-result.component';
import { GraduateVerificationPaymentComponent } from './start-verification/graduate-verification-payment/graduate-verification-payment.component';

const routes: Routes = [
  {path: '', component: VerificationComponent,},

  {path: 'verify-documents', component: StartVerificationComponent},
  {path: 'verify-graduate-details', component: GraduateVerificationDetailsComponent},
  {path: 'graduate-details-search-result', component: GraduateVerificationDetailsSearchResultComponent},
  {path: 'graduate-details-payment/:id', component: GraduateVerificationPaymentComponent},
  {path: 'verify-documents/:id', component: SearchResultsComponent},
  {path: 'verify-documents/:id/:id', component: VerifyDocumentsComponent},

  {path: 'view-verified-documents/:id', component: VerifyDocumentsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificationRoutingModule { }
