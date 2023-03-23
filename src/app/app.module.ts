import { DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NotifierModule } from 'angular-notifier';
import { RecaptchaModule } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderInterceptor } from './core/interceptors/http-loader.interceptor';
import { AuthInterceptor } from './core/interceptors/http.interceptor';
import { appReducer } from './store/shared/app.reducer';
import { metaReducers, reducers } from './types/appState.interface';
import { customNotifierOptions } from './types/index.types';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RecaptchaModule,
    AppRoutingModule,
    NotifierModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('apiResponse', appReducer),
    EffectsModule.forRoot(),
    NotifierModule.withConfig(customNotifierOptions),
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({
      features: {
        persist: true,
        lock: true,
        pause: false,
      },
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
