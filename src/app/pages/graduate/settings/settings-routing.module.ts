import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyHubComponent } from './my-hub/my-hub.component';
import { MyInstituitonComponent } from './my-instituiton/my-instituiton.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SettingsComponent } from './settings.component';
import { TwoFactorAuthenticationComponent } from './two-factor-authentication/two-factor-authentication.component';

const routes: Routes = [
  { path: '', component: SettingsComponent,
children: [
  {path: '', component:  MyProfileComponent},
  {path: 'my-institution', component: MyInstituitonComponent},
  {path: 'my-hub', component: MyHubComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path: '2fa', component: TwoFactorAuthenticationComponent}
] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
