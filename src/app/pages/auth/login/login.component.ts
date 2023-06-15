import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { RecaptchaErrorParameters } from 'ng-recaptcha';
import { confirm2FAction, confirm2FActionSuccess, invokeLoginUser, loginSuccess } from 'src/app/store/auth/action';
import { isUserSelector } from 'src/app/store/auth/selector';
import { selectAppAPIResponse } from 'src/app/store/shared/app.selector';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { Status } from 'src/app/types/shared.types';
import { environment } from 'src/environments/environment';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginAuth!: FormGroup;
  siteKey: string = environment.recaptchaKey;
  currentRoute!: string;
  status: Status = Status.NORMAL;
  user$ = this.appStore.pipe(select(isUserSelector));
  loggedInUser: any;
  show2FAOTP: boolean = false;
  otplength: any;
  otpValue: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
    private notificationService: NotificationsService,
  ) {}

  ngOnInit(): void {
    this.currentRoute = this.route.snapshot.url[0].path;
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginAuth = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl(
        '',
        Validators.compose([Validators.email, Validators.required])
      ),
      recaptchaReactive: new FormControl('', [Validators.required]),
    });
  }

  accessAccount() {
    // this.status = Status.LOADING;

    this.store.dispatch(invokeLoginUser({payload: this.loginAuth.value}));
    this.actions$.pipe(ofType(loginSuccess)).subscribe((res: any) => {
      console.log(res)
      if (res.accessToken !== undefined && typeof(res.payload) !== 'string') {
        const helper = new JwtHelperService();
        this.loggedInUser = helper.decodeToken(res.accessToken);
        const data =  {
          isAuthenticated: true,
          user: {
            firstName: this.loggedInUser.given_name,
            lastName: this.loggedInUser.family_name,
            email: this.loggedInUser.email,
            id: this.loggedInUser.id,
            lastLogin: this.loggedInUser.last_login_time,
            name: this.loggedInUser.name,
            phoneNumber: this.loggedInUser.phone_number,
            userType: this.loggedInUser.UserType,
            role: this.loggedInUser?.role || 'undefined',
          },
          permissions: this.loggedInUser.Permission
    
        };
        console.log(this.loggedInUser.UserType)
        if (this.loggedInUser.UserType === 'Institution') {
          this.router.navigateByUrl('/institution/dashboard');
          this.notificationService.publishMessages('success', 'Login Successful');
          localStorage.setItem('userData', JSON.stringify(this.loggedInUser));
          localStorage.setItem('authData', JSON.stringify(data));
        } else if(this.loggedInUser.UserType !== 'Institution') {
          this.notificationService.publishMessages('error', 'Invalid login credential');
          // localStorage.clear()
        }
       
      } else {
        this.show2FAOTP = true;
        this.timer(1)
       
      }
    })
  
  }

  fetchOTPCode() {}

  public resolved(captchaResponse: string): void {
    this.loginAuth.controls['recaptchaReactive'].setValue(captchaResponse);
  }

  createAccount() {
   
    this.router.navigateByUrl('/auth/create-account/institution');
  }

  verifyOTP() {
    const {email, password} = this.loginAuth.value
    const payload = {
      email,
      password,
      code: this.otpValue,
      twoFA: true
    }

    this.store.dispatch(invokeLoginUser({payload}));
    this.actions$.pipe(ofType(loginSuccess)).subscribe((res: any) => {
      const helper = new JwtHelperService();
      this.loggedInUser = helper.decodeToken(res.accessToken);
      const data =  {
        isAuthenticated: true,
        user: {
          firstName: this.loggedInUser.given_name,
          lastName: this.loggedInUser.family_name,
          email: this.loggedInUser.email,
          id: this.loggedInUser.id,
          lastLogin: this.loggedInUser.last_login_time,
          name: this.loggedInUser.name,
          phoneNumber: this.loggedInUser.phone_number,
          userType: this.loggedInUser.UserType,
          role: this.loggedInUser?.role || 'undefined',
        },
        permissions: this.loggedInUser.Permission
  
      };
      localStorage.setItem('userData', JSON.stringify(this.loggedInUser));
      localStorage.setItem('authData', JSON.stringify(data));
      this.notificationService.publishMessages('success', 'Login Successful');
      if (this.loggedInUser.UserType === 'Institution') {
        this.router.navigateByUrl('/institution/dashboard');

        // this.showOTPPage = true;
      }
     
    
    })
    
   
  }

   onOtpChange(event: any) {
    this.otplength = event
    this.otpValue = event;
  }
  
  continue() {
    document.getElementById('myModal')?.click()
    this.router.navigateByUrl('/auth/organization')

  }
 
  resendOTP() {
    const {email} = this.loginAuth.value

    this.store.dispatch(confirm2FAction({email}))
    this.actions$.pipe(ofType(confirm2FActionSuccess)).subscribe((res: any) => {
      if (res.message.hasErrors === false) {
        this.notificationService.publishMessages('success', res.message.description);
        this.timer(1)
      }
    })
  }

  timeDisplay!: string;
  hideResend: boolean = false;

  timer(minute: any) {
    // let min = minute;
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;  

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.timeDisplay = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      if (seconds == 0 ) {
        clearInterval(timer);
        this.hideResend = true;
      } else {
        this.hideResend = false;

      }
    }, 1000);
  }
}
