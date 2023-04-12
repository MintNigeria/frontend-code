import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyInstituitonComponent } from './my-instituiton/my-instituiton.component';
import { MyHubComponent } from './my-hub/my-hub.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TwoFactorAuthenticationComponent } from './two-factor-authentication/two-factor-authentication.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { usersAndRolesReducer } from 'src/app/store/users-and-roles/reducer';
import { UsersAndRolesEffects } from 'src/app/store/users-and-roles/effects';
import { InstitutionEffects } from 'src/app/store/institution/effects';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgOtpInputModule } from 'ng-otp-input';
import { RequestEmptyStateComponent } from 'src/app/shared/request-empty-state/request-empty-state.component';
import { GraduatesEffects } from 'src/app/store/graduates/effects';


@NgModule({
  declarations: [
    SettingsComponent,
    MyProfileComponent,
    MyInstituitonComponent,
    MyHubComponent,
    ChangePasswordComponent,
    TwoFactorAuthenticationComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RequestEmptyStateComponent,
    NgSelectModule,
    NgxPaginationModule,
    NgOtpInputModule,
    StoreModule.forFeature('usersAndRoles', usersAndRolesReducer),
    EffectsModule.forFeature([UsersAndRolesEffects, InstitutionEffects, GraduatesEffects]),
  ]
})
export class SettingsModule { }
