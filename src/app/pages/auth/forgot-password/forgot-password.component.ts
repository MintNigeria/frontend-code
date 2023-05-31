import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { RecaptchaErrorParameters } from 'ng-recaptcha';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { invokeLoginUser, loginSuccess, requestPasswordReset, requestPasswordResetSuccess } from 'src/app/store/auth/action';
import { isUserSelector } from 'src/app/store/auth/selector';
import { selectAppAPIResponse } from 'src/app/store/shared/app.selector';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { Status } from 'src/app/types/shared.types';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  loginAuth!: FormGroup;
  siteKey: string = environment.recaptchaKey;
  currentRoute!: string;
  status: Status = Status.NORMAL;
  user$ = this.appStore.pipe(select(isUserSelector));
  loggedInUser: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginAuth = new FormGroup({
      email: new FormControl(
        '',
        Validators.compose([Validators.email, Validators.required])
      ),
      recaptchaReactive: new FormControl(null),
    });
  }

  accessAccount() {
    this.status = Status.LOADING;
    this.store.dispatch(requestPasswordReset(this.loginAuth.value));
    this.actions$.pipe(ofType(requestPasswordResetSuccess)).subscribe((res: any) => {
      if (res.message.hasErrors === false) {
        this.notificationService.publishMessages('success', 'A password reset link has been sent to your registered email account');
        window.history.back()
      }
    })
  
  }

  fetchOTPCode() {}

  public resolved(captchaResponse: string): void {
    ////console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.loginAuth.controls['recaptchaReactive'].setValue(captchaResponse);
  }

  goBack() {
    window.history.back()
  }

}
