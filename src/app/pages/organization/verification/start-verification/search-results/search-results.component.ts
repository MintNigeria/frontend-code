import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { getOrganizationWalletId, getOrganizationWalletIdSuccess, makePayment, makePaymentSuccess, validateOrganizationFundWallet, validateOrganizationFundWalletSuccess } from 'src/app/store/organization/action';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { environment } from 'src/environments/environment';

declare var PaystackPop: any;

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  pk: string = environment.pkKey

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


  trxData: any;
  userData: any;
  balance: any;
  transactionId: any;
  deviceModel!: string;
  ipAddress: any;
  selectedMerchant!: string;
  isTransactionSuccessful: any;

  constructor(
    private fb: FormBuilder,
    private appStore: Store<AppStateInterface>,
    private store: Store,
    private router: Router,
    private actions$  : Actions,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private notification: NotificationsService,


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
    this.transactionId = this.route.snapshot.params['id']
    const trx : any = sessionStorage.getItem('dx_l')
    this.trxData = JSON.parse(trx)
    const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)
    this.loadIp();

    this.initPaymentForm()
    this.store.dispatch(getOrganizationWalletId({id: this.userData.OrganizationId}))
    this.actions$.pipe(ofType(getOrganizationWalletIdSuccess)).subscribe((res: any) => {
      this.balance = res.payload.balance;
    })
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

  loadIp() {
    this.utilityService.getuserIP().subscribe((res: any) => {
     this.ipAddress = res.ip
    })
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
    //console.log('Entered OTP:', enteredOtp);
    this.openSuccess();
  }

  openSuccess() {
    document.getElementById('successModal')?.click();
  }
  
  closeSuccess() {
    if (this.selectedPaymentMethod == 'creditCard') {
      document.getElementById('successModal')?.click();
      document.getElementById('otpModal')?.click();
      this.router.navigate(['organization/verifications/view-verified-documents/2']);
    } else{
      document.getElementById('successModal')?.click();
      this.router.navigate(['organization/verifications/view-verified-documents/2']);
    }
  }

  payWithWallet() {
    const payload = {
      transactionId: Number(this.transactionId),
      makePaymentType: 5,
      isCard: false,
      imei: '',
      serialNumber: '',
      device: this.deviceModel,
      ipAddress: this.ipAddress
  
    }
    this.store.dispatch(makePayment({payload}))
    this.actions$.pipe(ofType(makePaymentSuccess)).subscribe((res: any) => {
      if (res.payload.hasErrors === false) {

        this.notification.publishMessages('success', 'successful')
        this.router.navigate(['organization/verifications/view-verified-documents/2']);      
      }
    })
  }

  selectPaymentMerchant(merchant: string) {
    this.selectedMerchant = merchant
  }

  payWithCard() {
    const payload = {
      transactionId: Number(this.transactionId),
      makePaymentType: 5,
      isCard: true,
      imei: '',
      serialNumber: '',
      device: this.deviceModel,
      ipAddress: this.ipAddress
  
    }
    this.store.dispatch(makePayment({payload}))
    this.actions$.pipe(ofType(makePaymentSuccess)).subscribe((res: any) => {
      if (res.payload.hasErrors === false) {
        // this.notification.publishMessages('success', 'successful')
        // this.router.navigate(['organization/verifications/view-verified-documents/2']);      
      }
    })
    if (this.selectedMerchant === 'Paystack') {
      this.launchPaystack()
    }
  }

  launchPaystack() {
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: this.pk, // Replace with your public key
      reference: new Date().getTime().toString(),
      email: this.userData?.email,
      amount: this.trxData?.amount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
      onCancel: () => {
        this.onClose();
      },
      onSuccess: (transaction: any) => {
        this.onSuccess(transaction);
      },
    });
  }

  onSuccess(trx: any) {
    ////console.log(trx)
    this.isTransactionSuccessful = trx.status
      this.validatePayment(trx)
  }
  onClose() {
    ////console.log('trx')
  }

  validatePayment(data: any) {
    ////console.log(data)
    const payload = {
      transactionId: Number(this.transactionId),
      makePaymentType: 5,
      refrenceNumber: data.reference,
      merchantType: 'PAYSTACK',
      isPaymentSuccessful: this.isTransactionSuccessful === 'success' ? true : false,
      imei: '',
      serialNumber: '',
      device: this.deviceModel,
      ipAddress: this.ipAddress
  
    }
    this.store.dispatch(validateOrganizationFundWallet({payload}))
    this.actions$.pipe(ofType(validateOrganizationFundWalletSuccess)).subscribe((res: any) => {
      console.log(res)
      if (res) {
        this.notification.publishMessages('success', 'successful')
        // this.router.navigate(['organization/verifications']); 
        this.router.navigateByUrl(`/organization/verifications/view-verified-documents/${res.payload.payload.institutionGraduateId}`)     

      }

    })
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
  //console.log('Credit Card payment initiated');
}

openWalletPayment() {
  this.creditCard = false;
  this.wallet = true;
  this.main= false;
  //console.log('Wallet payment initiated');
}

ngOnDestroy(): void {
  sessionStorage.removeItem('dx_l')
}





}



  