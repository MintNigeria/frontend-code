import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { GraduateRegistrationComponent } from './graduate-registration/graduate-registration.component';
import { InstitutitionRegistrationComponent } from './institutition-registration/institutition-registration.component';
import { OrganizationRegistrationComponent } from './organization-registration/organization-registration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {path: '', component: AuthenticationComponent, children: [
    { path: 'institution', component: LoginComponent },
      { path: 'organization', component: LoginComponent },
      { path: 'graduate', component: LoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'create-account/institution', component: InstitutitionRegistrationComponent },
      { path: 'create-account/organization', component: OrganizationRegistrationComponent },
      { path: 'create-account/graduate', component: GraduateRegistrationComponent  },
      { path: 'create-password/:email', component: CreatePasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      // { path: '',   redirectTo: 'auth/institution', pathMatch: 'full' },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
