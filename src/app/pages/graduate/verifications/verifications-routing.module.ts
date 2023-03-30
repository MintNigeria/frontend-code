import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificationComponent } from '../../organization/verification/verification.component';
import { InstitutionDetailsComponent } from './new-verification/institution-details/institution-details.component';
import { NewVerificationComponent } from './new-verification/new-verification.component';
import { VerificationDetailsComponent } from './verification-details/verification-details.component';
import { VerificationsComponent } from './verifications.component';

const routes: Routes = [
  { path: '', component: VerificationsComponent },
  {
    path: 'new',
    component: NewVerificationComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'institution-details' },
      { path: 'institution-details', component: InstitutionDetailsComponent },
    ]
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
