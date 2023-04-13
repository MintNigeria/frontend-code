import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { activateDeactivate2FA, activateDeactivate2FASuccess, confirm2FAction, confirm2FActionSuccess } from 'src/app/store/auth/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-two-factor-authentication',
  templateUrl: './two-factor-authentication.component.html',
  styleUrls: ['./two-factor-authentication.component.scss']
})
export class TwoFactorAuthenticationComponent implements OnInit {

  twoFactorEnabled: boolean = false;
  emailEnabled: boolean = true;


  otp: number[] = [];
  timer = 30;
  timerExpired = false;
  otpEntered = false;


  
  otpModal = "otpModal";
  successModal = "successModal";
  graduateData: any;
  otplength: any;
  otpValue: any;

  constructor(
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
    private notification: NotificationsService
  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.graduateData = JSON.parse(data)

  }

   onTwoFactorToggle(event: any): void {
    if (event.checked === true) {
      this.twoFactorEnabled = true
    } else {
      this.twoFactorEnabled = false
    }
    // this.twoFactorEnabled = !this.twoFactorEnabled;
  }

  onEmailToggle(): void {
    this.emailEnabled = !this.emailEnabled;
  }

  onSave(): void {
    // Your save logic here.
    console.log('Save button clicked');
  }

  onCancel(): void {
    // Your cancel logic here.
    console.log('Cancel button clicked');
  }

  openOtpModal(){
    console.log('dsdsdsd')
    const payload = {
      enable2FA: this.twoFactorEnabled ,
      code: ''
    }
    
    this.store.dispatch(activateDeactivate2FA({payload}))
    this.actions$.pipe(ofType(activateDeactivate2FASuccess)).subscribe((res: any) => {
      if(res.message.hasErrors === false) {
        // this.notification.publishMessages('success', res.message.description)
        document.getElementById('otpModal')?.click();
      }
    })
  }

  onOtpChange(event: any) {
    this.otplength = event
    this.otpValue = event;
  }

  closeOtpModal(){
     document.getElementById('otpModal')?.click();
  }

  // onOtpChange(index: number, event: any) {
  //   const otpValue = event.target.value;
  //   if (!isNaN(otpValue)) {
  //     this.otp[index] = parseInt(otpValue, 10);
  //     if (this.otp.every((value) => !isNaN(value))) {
  //       this.otpEntered = true;
  //     }
  //   } else {
  //     this.otp[index] = 0;
  //     this.otpEntered = false;
  //   }
  // }

  verifyOtp() {
    // const enteredOtp = this.otp.join('');
    const payload = {
      enable2FA: this.twoFactorEnabled ,
      code: this.otpValue
    }
    
    this.store.dispatch(activateDeactivate2FA({payload}))
    this.actions$.pipe(ofType(activateDeactivate2FASuccess)).subscribe((res: any) => {
      if(res.message.hasErrors === false) {
        // this.notification.publishMessages('success', res.message.description)
        document.getElementById('otpModal')?.click();
        this.closeOtpModal()
        setTimeout(() => {
          
          this.openSuccess();
        }, 1000);
      }
    })
  }
  
  resendOTP() {
    //console.log('Entered OTP:', enteredOtp);
    this.store.dispatch(confirm2FAction({email: this.graduateData.email}))
    this.actions$.pipe(ofType(confirm2FActionSuccess)).subscribe((res: any) => {
      console.log(res)
      if(res.message.hasErrors === false) {
        this.notification.publishMessages('success', res.message.description)
        // document.getElementById('otpModal')?.click();
      }
    })

  }

  openSuccess() {
    document.getElementById('successModal')?.click();
  }
  
  closeSuccess() {
    document.getElementById('successModal')?.click();
  }

}
