import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { createPassword, createPasswordSuccess, invokeLoginUser, loginSuccess } from 'src/app/store/auth/action';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { Status } from 'src/app/types/shared.types';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnInit {
  createAccountForm!: FormGroup;
  lenghtChecked = false;
  lowercaseChecked = false;
  uppercaseChecked = false;
  numberChecked = false;
  specialCharacterChecked = false;
  nospaceChecked = false;
  passwordValidation = false;
  modalId = 'messageModal';
  requestToken: string = '';
  param!: string;
  userType: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
    private notification: NotificationsService,
    private fb: FormBuilder

  ) { }

  ngOnInit(): void {
    this.param = this.route.snapshot.params['email']
    this.userType = this.route.snapshot.queryParams['userType']
    this.initLoginForm();
    // if (!this.requestToken) return window.history.back();
    this.createAccountForm.valueChanges.subscribe((val) => {
      this.lenghtChecked = val.password.length > 8 ? true : false;
      this.numberChecked = RegExp('(?=.*[0-9])').test(val.password)
        ? true
        : false;
      this.lowercaseChecked = RegExp('(?=.*[a-z])').test(val.password)
        ? true
        : false;
      this.uppercaseChecked = RegExp('(?=.*[A-Z])').test(val.password)
        ? true
        : false;
      this.specialCharacterChecked = RegExp(
        '(?=.*[!@#$%^&*)(+=._-])(?!.* )'
      ).test(val.password)
        ? true
        : false;
      this.nospaceChecked = RegExp(/\s/).test(val.password) ? false : true;
      this.passwordValidation = this.validatePassword(val.password);
    });
  }

  initLoginForm() {
    this.createAccountForm = this.fb.group({ 
      password: ['',  [Validators.required, Validators.minLength(8) ]],
      confirmPassword: ['',  [Validators.required, Validators.minLength(6) ]]
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    });
  }

   validatePassword(password: any) {
    const expression = RegExp(
      '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*)(+=._-])(?!.* ).{8,32}$'
    );
    return expression.test(password);
  }

  createPassword() {
    const {password, confirmPassword} = this.createAccountForm.value
    const payload = {
      email: this.param,
      password,
      confirmPassword
    }
    this.store.dispatch(createPassword({...payload }))
    this.actions$.pipe(ofType(createPasswordSuccess)).subscribe((res: any) => {
     if (res.payload.hasErrors === false) {
      this.notification.publishMessages('success', res.payload.description)
      if (this.userType === '2') {
        this.router.navigateByUrl('/auth/institution')
      }
       if (this.userType === '3') {
        this.router.navigateByUrl('/auth/graduate')
      }
       if (this.userType === '4') {
        this.router.navigateByUrl('/auth/organization')
      }
     }
   }) 
    // this.status = Status.LOADING;
    // this.store.dispatch(invokeLoginUser(this.loginAuth.value));
    // this.actions$.pipe(ofType(loginSuccess)).subscribe((res: any) => {
    //   const helper = new JwtHelperService();
    //   this.loggedInUser = helper.decodeToken(res.accessToken);
    //   localStorage.setItem('userData', JSON.stringify(this.loggedInUser))
    //   if (this.loggedInUser.UserType === 'Institution') {
    //       this.router.navigateByUrl('/institution/dashboard');
    //     // this.showOTPPage = true;
    //   }
    // })
    // let auth$ = this.appStore.pipe(select(selectAppAPIResponse));
    // auth$.subscribe((x) => {
    //   if (x.isApiSuccessful && !x.isLoading) this.status = Status.SUCCESS;
    //   if (!x.isApiSuccessful && !x.isLoading) this.status = Status.SUCCESS;
    // });
    // this.user$.subscribe((x) => {
    //   if(x)
    // });
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
  
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }
  
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

}
