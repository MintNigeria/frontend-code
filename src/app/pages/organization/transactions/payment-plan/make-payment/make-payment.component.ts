import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent implements OnInit {

  otp: number[] = [];
  timer = 30;
  timerExpired = false;
  otpEntered = false;


  paymentForm!: FormGroup
  otpModal = "otpModal";
  successModal = "successModal";

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initPaymentForm()
    setTimeout(() => {
      this.populateForm()
    }, 2000);

    const interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(interval);
        this.timerExpired = true;
      }
    }, 1000);
  }

  initPaymentForm() {
    this.paymentForm = this.fb.group({
      cardNumber: ['', Validators.required],
      expiryMonth: ['', Validators.required],
      expiryYear: ['', Validators.required],
      cvc: ['', Validators.required],
      cardholderName: ['', Validators.required],
    })
  }

  populateForm() {
    this.paymentForm.patchValue({
      cardNumber: '1234 1234 1234 2123',
      expiryMonth: '11',
      expiryYear: '27',
      cvc: '789',
      cardholderName: 'Chiemela Esther',
    })
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
    ////console.log('Entered OTP:', enteredOtp);
    this.openSuccess();
  }

  openSuccess() {
    document.getElementById('successModal')?.click();
  }
  closeSuccess() {
    document.getElementById('successModal')?.click();
    document.getElementById('otpModal')?.click();
  }

}
