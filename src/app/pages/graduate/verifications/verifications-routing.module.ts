import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificationComponent } from '../../organization/verification/verification.component';
import { InstitutionDetailsComponent } from './new-verification/institution-details/institution-details.component';
import { NewVerificationComponent } from './new-verification/new-verification.component';
import { SearchTableComponent } from './new-verification/search-table/search-table.component';
import { VerificationReasonComponent } from './new-verification/verification-reason/verification-reason.component';
import { VerificationDetailsComponent } from './verification-details/verification-details.component';
import { VerificationsComponent } from './verifications.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { MakePaymentComponent } from '../applications/new-application/make-payment/make-payment.component';

const routes: Routes = [
  { path: '', component: VerificationsComponent },
  {
    path: 'new',
    component: NewVerificationComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'institution-details' },
      { path: 'institution-details', component: InstitutionDetailsComponent },
      {
        path: 'search-table', component: SearchTableComponent
      },
      {
        path: 'verification-reason',
        component: VerificationReasonComponent
      },
      {
        path: 'make-payment/:id', component: MakePaymentComponent
      },
    ]
  },
  {
    path: 'verification-details', component: ViewDetailsComponent
  },
  {
    path: 'verification-details/:id', component: VerificationDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationsRoutingModule {}
