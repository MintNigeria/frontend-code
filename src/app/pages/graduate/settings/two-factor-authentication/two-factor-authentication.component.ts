import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

   onTwoFactorToggle(): void {
    this.twoFactorEnabled = !this.twoFactorEnabled;
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
    document.getElementById('otpModal')?.click();
  }

  closeOtpModal(){
     document.getElementById('otpModal')?.click();
  }

  onOtpChange(index: number, event: any) {
    const otpValue = event.target.value;
    if (!isNaN(otpValue)) {
      this.otp[index] = parseInt(otpValue, 10);
      if (this.otp.every((value) => !isNaN(value))) {
        this.otpEntered = true;
      }
    } else {
      this.otp[index] = 0;
      this.otpEntered = false;
    }
  }

  verifyOtp() {
    const enteredOtp = this.otp.join('');
    //console.log('Entered OTP:', enteredOtp);
    this.openSuccess();
  }

  openSuccess() {
    document.getElementById('successModal')?.click();
  }
  
  closeSuccess() {
    document.getElementById('successModal')?.click();
  }

}
