import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { OrganizationProfileComponent } from './organization-profile/organization-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InstitutionEffects } from 'src/app/store/institution/effects';
import { UsersAndRolesEffects } from 'src/app/store/users-and-roles/effects';
import { usersAndRolesReducer } from 'src/app/store/users-and-roles/reducer';
import { NgSelectModule } from '@ng-select/ng-select';
import { TwoFactorAuthenticationComponent } from './two-factor-authentication/two-factor-authentication.component';
import { GraduatesEffects } from 'src/app/store/graduates/effects';
import { NgOtpInputModule } from 'ng-otp-input';


@NgModule({
  declarations: [
    SettingsComponent,
    MyProfileComponent,
    OrganizationProfileComponent,
    ChangePasswordComponent,
    TwoFactorAuthenticationComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgOtpInputModule,
        StoreModule.forFeature('usersAndRoles', usersAndRolesReducer),
    EffectsModule.forFeature([UsersAndRolesEffects, InstitutionEffects, GraduatesEffects]),


  ]
})
export class SettingsModule { }
