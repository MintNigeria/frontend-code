import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewVerificationComponent } from './new-verification/new-verification.component';
import { VerificationsComponent } from './verifications.component';
import { ViewDetailsComponent } from './view-details/view-details.component';

const routes: Routes = [
  { path: '', component: VerificationsComponent },
  {path: 'new', component: NewVerificationComponent},
  {path: 'details/:id', component: ViewDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificationsRoutingModule { }
