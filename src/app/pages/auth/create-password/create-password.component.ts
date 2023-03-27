import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions

  ) { }

  ngOnInit(): void {
    this.param = this.route.snapshot.params['email']
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
    this.createAccountForm = new FormGroup({ 
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      
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
     //console.log(res)
     if (res.hasErrors === false) {
      this.router.navigateByUrl('/')
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

}
