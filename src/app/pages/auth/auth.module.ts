import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SplitScreenComponent } from './split-screen/split-screen.component';
import { LoginComponent } from './login/login.component';
import { InstitutitionRegistrationComponent } from './institutition-registration/institutition-registration.component';
import { OrganizationRegistrationComponent } from './organization-registration/organization-registration.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  RecaptchaFormsModule,
  RecaptchaModule,
  RECAPTCHA_V3_SITE_KEY,
} from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { GraduateRegistrationComponent } from './graduate-registration/graduate-registration.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { StoreModule } from '@ngrx/store';
import { authReducers } from 'src/app/store/auth/reducers';
import { AuthEffects } from 'src/app/store/auth/effects';
import { EffectsModule } from '@ngrx/effects';
import { InstitutionEffects } from 'src/app/store/institution/effects';
import { NgSelectModule } from '@ng-select/ng-select';
import { UtilityEffects } from 'src/app/store/institution copy/effects';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyPasswordComponent } from './verify-password/verify-password.component';
import { ConfigurationEffects } from 'src/app/store/configuration/effects';
import { OrganizationEffects } from 'src/app/store/organization/effects';

@NgModule({
  declarations: [
    AuthComponent,
    SplitScreenComponent,
    LoginComponent,
    InstitutitionRegistrationComponent,
    OrganizationRegistrationComponent,
    GraduateRegistrationComponent,
    CreatePasswordComponent,
    ForgotPasswordComponent,
    VerifyPasswordComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    NgOtpInputModule,
    NgSelectModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', authReducers),
    EffectsModule.forFeature([AuthEffects, UtilityEffects, ConfigurationEffects, OrganizationEffects, InstitutionEffects]),
  ],
  // providers: [{ provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptchaKey }],
})
export class AuthModule {}
