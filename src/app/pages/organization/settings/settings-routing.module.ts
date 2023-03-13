import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { OrganizationProfileComponent } from './organization-profile/organization-profile.component';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {path: '', component:SettingsComponent,
children: [
  {path: 'my-profile', component:MyProfileComponent},
  {path: '', component:OrganizationProfileComponent},
  {path: 'change-password', component: ChangePasswordComponent}
]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
