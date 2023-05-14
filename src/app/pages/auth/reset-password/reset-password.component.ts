import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { createPassword, createPasswordSuccess, invokeLoginUser, loginSuccess, resetPassword, resetPasswordSuccess } from 'src/app/store/auth/action';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { Status } from 'src/app/types/shared.types';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
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
  param!: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
    private notification: NotificationsService,
    private fb: FormBuilder,
    private auth: AuthService

  ) { }

  ngOnInit(): void {
    this.param = this.route.snapshot.queryParams
    this.initLoginForm();
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
      password: [ '', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [  Validators.required, Validators.minLength(6)]],     
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
      token: this.param.code,
      newPassword: password
    }
    // temporary fix
    this.auth.resetPassword(payload).subscribe((res: any) => {
      if (res.hasErrors === false) {
            this.notification.publishMessages('success', res.payload.description)
            if (this.param.UserType === '2') {
              this.router.navigateByUrl('/auth/institution')
            }
             if (this.param.UserType === '3') {
              this.router.navigateByUrl('/auth/graduate')
            }
             if (this.param.UserType === '4') {
              this.router.navigateByUrl('/auth/organization')
            }

      }
    })
  //   this.store.dispatch(resetPassword({payload}))
  //   this.actions$.pipe(ofType(resetPasswordSuccess)).subscribe((res: any) => {
  //    if (res.payload.hasErrors === false) {
  //     this.notification.publishMessages('success', res.payload.description)
  //     this.router.navigateByUrl('/')
  //    }
  //  }) 
  
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
