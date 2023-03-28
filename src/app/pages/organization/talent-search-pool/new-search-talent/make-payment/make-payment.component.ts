import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent implements OnInit {

  selectedPaymentMethod: string = '';

  creditCard = false;
  wallet = false;
  main = true;

  otp: number[] = [];
  timer = 30;
  timerExpired = false;
  otpEntered = false;


  paymentForm!: FormGroup
  otpModal = "otpModal";
  successModal = "successModal";


  searchResults = [
    {
      name: 'Adekunle Ciroma',
      faculty: 'Management Science',
      department: 'Bank and Finance',
      matricNo: '123456',
      gradYear: '2019',
      action:'Verify'
    },
    {
      name: 'Adekunle Ciroma',
      faculty: 'Management Science',
      department: 'Bank and Finance',
      matricNo: '123456',
      gradYear: '2019',
      action:'Verify'
    },
    {
      name: 'Adekunle Ciroma',
      faculty: 'Management Science',
      department: 'Bank and Finance',
      matricNo: '123456',
      gradYear: '2019',
      action:'Verify'
    }
  ]

  constructor(
    private fb: FormBuilder,
    private router: Router
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
    console.log('Entered OTP:', enteredOtp);
    this.openSuccess();
  }

  openSuccess() {
    document.getElementById('successModal')?.click();
  }
  closeSuccess() {
    if (this.selectedPaymentMethod == 'creditCard') {
      document.getElementById('successModal')?.click();
      document.getElementById('otpModal')?.click();
      this.router.navigate(['organization/talent-search-pool/view-report/2']);
    } else{
      document.getElementById('successModal')?.click();
      this.router.navigate(['organization/talent-search-pool/view-report/2']);
    }
  }

  goBack() {
  window.history.back();
  }

  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
  }

  proceedToPayment() {
  if (this.selectedPaymentMethod === 'creditCard') {
    this.openCreditCardPayment();
  } else if (this.selectedPaymentMethod === 'wallet') {
    this.openWalletPayment();
  } else {
    alert('Please select a payment method');
  }
}

openCreditCardPayment() {
  this.creditCard = true;
  this.wallet = false;
  this.main= false;
  console.log('Credit Card payment initiated');
}

openWalletPayment() {
  this.creditCard = false;
  this.wallet = true;
  this.main= false;
  console.log('Wallet payment initiated');
}

}
