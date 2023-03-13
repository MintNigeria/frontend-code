import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { OrganizationProfileComponent } from './organization-profile/organization-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SettingsComponent,
    MyProfileComponent,
    OrganizationProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class SettingsModule { }
