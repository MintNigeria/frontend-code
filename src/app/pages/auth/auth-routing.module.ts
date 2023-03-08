import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { GraduateRegistrationComponent } from './graduate-registration/graduate-registration.component';
import { InstitutitionRegistrationComponent } from './institutition-registration/institutition-registration.component';
import { LoginComponent } from './login/login.component';
import { OrganizationRegistrationComponent } from './organization-registration/organization-registration.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'auth/login', component: LoginComponent },
      { path: 'auth/organization', component: LoginComponent },
      { path: 'auth/graduate', component: LoginComponent },
      { path: 'create-account/institution', component: InstitutitionRegistrationComponent },
      { path: 'create-account/organization', component: OrganizationRegistrationComponent },
      { path: 'create-account/graduate', component: GraduateRegistrationComponent  },
      { path: '',   redirectTo: '/auth/login', pathMatch: 'full' },
      // { path: 'forgot-password', component: ForgotPasswordComponent },
      // { path: 'create-password', component: CreatePasswordComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
