import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from 'src/app/store/auth/effects';
import { authReducers } from 'src/app/store/auth/reducers';
import { ConfigurationEffects } from 'src/app/store/configuration/effects';
import { GraduatesEffects } from 'src/app/store/graduates/effects';
import { UtilityEffects } from 'src/app/store/institution copy/effects';
import { InstitutionEffects } from 'src/app/store/institution/effects';
import { OrganizationEffects } from 'src/app/store/organization/effects';
import { LoginComponent } from './login/login.component';
import { AuthenticationComponent } from './authentication.component';
import { NgOtpInputModule } from 'ng-otp-input';
import {
  RecaptchaFormsModule,
  RecaptchaModule,
  RECAPTCHA_V3_SITE_KEY,
} from 'ng-recaptcha';
import { InstitutitionRegistrationComponent } from './institutition-registration/institutition-registration.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { GraduateRegistrationComponent } from './graduate-registration/graduate-registration.component';
import { OrganizationRegistrationComponent } from './organization-registration/organization-registration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyPasswordComponent } from './verify-password/verify-password.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    LoginComponent,
    AuthenticationComponent,
    InstitutitionRegistrationComponent,
    OrganizationRegistrationComponent,
    GraduateRegistrationComponent,
    CreatePasswordComponent,
    ForgotPasswordComponent,
    VerifyPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgOtpInputModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    NgSelectModule,
    StoreModule.forFeature('auth', authReducers),
    EffectsModule.forFeature([AuthEffects, UtilityEffects, OrganizationEffects, InstitutionEffects, GraduatesEffects, ConfigurationEffects]),
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
