import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { RecaptchaErrorParameters } from 'ng-recaptcha';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { invokeLoginUser, loginSuccess } from 'src/app/store/auth/action';
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
    this.currentRoute = this.route.snapshot.url[1].path;
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
    this.store.dispatch(invokeLoginUser(this.loginAuth.value));
    this.actions$.pipe(ofType(loginSuccess)).subscribe((res: any) => {
      console.log(res) 
      if (res.accessToken !== undefined) {
        this.notificationService.publishMessages('success', 'Login Successful');
        if (this.loggedInUser.UserType === 'Institution') {
          this.router.navigateByUrl('/institution/dashboard');
  
          // this.showOTPPage = true;
        }
        if (this.loggedInUser.UserType === 'Graduates') {
            this.router.navigateByUrl('/graduate/dashboard');
          // this.showOTPPage = true;
        }
        if (this.loggedInUser.UserType === 'Organization') {
            this.router.navigateByUrl('/organization/dashboard');
          // this.showOTPPage = true;
        }
      }
    })
    // let auth$ = this.appStore.pipe(select(selectAppAPIResponse));
    // auth$.subscribe((x) => {
    //   if (x.isApiSuccessful && !x.isLoading) this.status = Status.SUCCESS;
    //   if (!x.isApiSuccessful && !x.isLoading) this.status = Status.SUCCESS;
    // });
    // this.user$.subscribe((x) => {
    //   if(x)
    // });
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
