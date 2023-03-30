import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { makePayment, makePaymentSuccess } from 'src/app/store/organization/action';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent implements OnInit {
  makePayment: boolean = true;
  fundWallet: boolean = false;
  makePaymentForm!: FormGroup;
  otpModal = "otpModal";
  otpEntered = false;
  timer = 30;
  transactionId: any;
  deviceModel!: string;
  ipAddress: any;
  otp: number[] = [];
  timerExpired = false;
  successModal = "successModal";
  balance: any;
  id: string = '3'
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store,
    private notification: NotificationsService,
    private actions$  : Actions,
    private router: Router
  ) { 
    const userAgent = navigator.userAgent;

    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
      this.deviceModel = 'iPad or iPhone';
    } else if (userAgent.match(/Android/i)) {
      this.deviceModel = 'Android';
    } else if (userAgent.match(/Window/i)) {
      this.deviceModel = 'Window';
    } else {
      this.deviceModel = 'Other';
    }
  }

  ngOnInit(): void {
    this.initForm()
    this.transactionId = this.route.snapshot.params['id']
  }

  initForm(){
    this.makePaymentForm = this.fb.group({
      expiryDate: ['', Validators.required],
      cvc: ['', Validators.required],
      cardNo: ['', Validators.required],
      nameOnCard: ['', Validators.required],
      expiryYear: ['', Validators.required],
      amount: ['', Validators.required]
     

    })
  }
  cancel() {
   
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

  proceedWallet(){
    this.fundWallet = true;
    this.makePayment = false;
  }

  payWithCard(){
    document.getElementById('otpModal')?.click();
  }

  goBack() {
    window.history.back();
    }


  verifyOtp() {
    const enteredOtp = this.otp.join('');
   
    //console.log('Entered OTP:', enteredOtp);
    document.getElementById('otpModal')?.click();
    this.openSuccess();
  }

  openSuccess() {
    document.getElementById('successModal')?.click();
  }

  populateForm() {
    this.makePaymentForm.patchValue({
      cardNo: '1234 1234 1234 2123',
      expirydate: '11',
      expiryYear: '27',
      cvc: '789',
      nameOnCard: 'Chiemela Esther',
    })
  }
  
  closeSuccess() {

      document.getElementById('successModal')?.click();
      this.router.navigateByUrl(`graduate/my-applications/view-application/${this.id}`);
    
    
  }
}
