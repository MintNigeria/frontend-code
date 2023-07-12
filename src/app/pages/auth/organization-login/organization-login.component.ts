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
import { SingleSessionModalComponent } from 'src/app/shared/components/single-session-modal/single-session-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

@Component({
  selector: 'app-organization-login',
  templateUrl: './organization-login.component.html',
  styleUrls: ['./organization-login.component.scss']
})
export class OrganizationLoginComponent implements OnInit {
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
    private dialog: MatDialog,
    private notificationService: NotificationsService,
    private utility: UtilityService

  ) {}

  ngOnInit(): void {
    this.currentRoute = this.route.snapshot.url[0].path;
    this.initLoginForm();
    const a = this.utility.getCookieValue('email')
    if (a !== undefined) {
      this.loginAuth.patchValue({
        email: a
      })
    }
  }

  initLoginForm() {
    this.loginAuth = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      email: new FormControl(
        '',
        Validators.compose([Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), Validators.required])
      ),
      rememberMe: new FormControl(false),
      // recaptchaReactive: new FormControl(null),
      recaptchaReactive: new FormControl(null, [Validators.required]),

    });
  }

  accessAccount() {
    this.status = Status.LOADING;
    this.store.dispatch(invokeLoginUser({payload: this.loginAuth.value}));
    this.actions$.pipe(ofType(loginSuccess)).subscribe((res: any) => {
      if (res.accessToken !== undefined) {
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
        
        if (this.loggedInUser.UserType === 'Organization') {
          localStorage.setItem('userData', JSON.stringify(this.loggedInUser));
          localStorage.setItem('authData', JSON.stringify(data));
          this.notificationService.publishMessages('success', 'Login Successful');
            this.router.navigateByUrl('/organization/dashboard');
        }  
        else if (this.loggedInUser.UserType !== 'Organization') {
          this.notificationService.publishMessages('error', 'Invalid login credential');
          localStorage.clear()


        }
      } else if (res.accessToken === undefined && res.hasErrors === false) {
        this.show2FAOTP = true;
        this.timer(3)
      } else if (res.accessToken === undefined && res.hasErrors === true && res.errors[0] === 'You have an active session!!!') {
        this.launchSingleLoginModal(this.loginAuth.value)

      }
    })
    const {email,rememberMe} = this.loginAuth.value;
    if (rememberMe === true) {
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
      document.cookie = `email=${email}; expires=${expires.toUTCString()}; path=/`;
    } else {
      this.utility.deleteCookie('email')
    }
    
  }

  fetchOTPCode() {}

  public resolved(captchaResponse: string): void {
    ////console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.loginAuth.controls['recaptchaReactive'].setValue(captchaResponse);
  }

  createAccount() {
   
    this.router.navigateByUrl('/auth/create-account/organization');
   
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
      this.notificationService.publishMessages('success', 'Login Successful');
      localStorage.setItem('userData', JSON.stringify(this.loggedInUser));
      localStorage.setItem('authData', JSON.stringify(data));
      
     
      if (this.loggedInUser.UserType === 'Organization') {
          this.router.navigateByUrl('/organization/dashboard');
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
        this.timer(3)
       

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


  launchSingleLoginModal(data: any) {
    const dialogRef = this.dialog.open(SingleSessionModalComponent, {
      // width: '600px',
      // height: '600px'
      data,
      disableClose: true 

    });
  }

}
