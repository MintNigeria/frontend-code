import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { GraduateRegistrationComponent } from './graduate-registration/graduate-registration.component';
import { InstitutitionRegistrationComponent } from './institutition-registration/institutition-registration.component';
import { LoginComponent } from './login/login.component';
import { OrganizationRegistrationComponent } from './organization-registration/organization-registration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { OrganizationLoginComponent } from './organization-login/organization-login.component';
import { GraduateLoginComponent } from './graduate-login/graduate-login.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'institution', component: LoginComponent },
      { path: 'organization', component: OrganizationLoginComponent },
      { path: 'graduate', component: GraduateLoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'create-account/institution', component: InstitutitionRegistrationComponent },
      { path: 'create-account/organization', component: OrganizationRegistrationComponent },
      { path: 'create-account/graduate', component: GraduateRegistrationComponent  },
      { path: 'create-password/:email', component: CreatePasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: '',   redirectTo: 'auth/institution', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
