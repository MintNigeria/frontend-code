import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { getOrganizationWalletId, getOrganizationWalletIdSuccess, makePayment, makePaymentSuccess, validateOrganizationFundWallet, validateOrganizationFundWalletSuccess } from 'src/app/store/organization/action';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
declare var PaystackPop: any;
import { environment } from 'src/environments/environment';
import { getGraduateWalletId, getGraduateWalletIdSuccess, retryApplicationVarificationPayment, retryApplicationVarificationPaymentSuccess } from 'src/app/store/graduates/action';
import {
  Flutterwave,
  InlinePaymentOptions,
  PaymentSuccessResponse,
} from "flutterwave-angular-v3";
import { ConfigurationService } from 'src/app/core/services/configuration/configuration.service';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent implements OnInit, OnDestroy {
  pk: string = environment.pkKey
  wavePk: string = environment.wavePk_key

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
  transactionId: any;
  trxData: any;
  userData: any;
  deviceModel: string;
  balance: any;
  ipAddress: any;
  selectedMerchant: string = '';
  isTransactionSuccessful: any;
  requestId: any;

  retryPayment: boolean = false;
  retryApplicationAmount:any;
  retryApplicationTransactionId!: number;
  retryApplicationmakePaymentType!: number;
  reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
  customerDetails : any;
  customizations : any;

  constructor(
    private fb: FormBuilder,
    private appStore: Store<AppStateInterface>,
    private store: Store,
    private router: Router,
    private actions$  : Actions,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private notification: NotificationsService,
    private flutterwave: Flutterwave,
    private configurationService: ConfigurationService

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
    const trx : any = sessionStorage.getItem('ver_pMy')
    this.trxData = JSON.parse(trx)
    const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)
    this.customerDetails = {
      name: `${this.userData?.given_name + ' ' + this.userData?.family_name}`,
      email: this.userData?.email,
      phone_number: this.userData?.phone_number

    }
    this.customizations = {
      title: 'Verification Payment',
    }
    this.store.dispatch(getGraduateWalletId())
    this.actions$.pipe(ofType(getGraduateWalletIdSuccess)).subscribe((res: any) => {
      this.balance = res.payload.payload.balance;

    })
    this.requestId = this.route.snapshot.params['id']
    const currentURL = window.location.href;
      const path = new URL(currentURL).pathname;
      if (path.includes('retry-payment')) {
        this.getApplicationAmout()
      }
    this.loadIp();

  }

  loadIp() {
    this.utilityService.getuserIP().subscribe((res: any) => {
     this.ipAddress = res.query
    })
  }

  getApplicationAmout() {
    this.store.dispatch(retryApplicationVarificationPayment({id: this.requestId}))
    this.actions$.pipe(ofType(retryApplicationVarificationPaymentSuccess)).subscribe((res: any) => {
      this.retryPayment = true;
      this.retryApplicationAmount = res.payload?.amount
      this.retryApplicationTransactionId = res.payload?.transactionId
      this.retryApplicationmakePaymentType= res.payload?.makePaymentType
    })
  }

  openOtpModal(){
    document.getElementById('otpModal')?.click();
  }

  closeOtpModal(){
     document.getElementById('otpModal')?.click();
  }



  openSuccess() {
    document.getElementById('successModal')?.click();
  }
  closeSuccess() {
    if (this.selectedPaymentMethod == 'creditCard') {
      document.getElementById('successModal')?.click();
      document.getElementById('otpModal')?.click();
      this.router.navigate(['/graduate/my-verifications']);
    } else{
      document.getElementById('successModal')?.click();
      this.router.navigate(['/graduate/my-verifications']);
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
  //console.log('Credit Card payment initiated');
}

openWalletPayment() {
  this.creditCard = false;
  this.wallet = true;
  this.main= false;
  //console.log('Wallet payment initiated');
}

payWithWallet() {
  const payload = {
    transactionId: this.retryPayment === false ? Number(this.transactionId): Number(this.retryApplicationTransactionId),
    makePaymentType: this.retryPayment === false ? 4 : this.retryApplicationmakePaymentType,
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
      document.getElementById('successModal')?.click();

      // this.router.navigate(['organization/verifications/view-verified-documents/2']);      
    }
  })
}


selectPaymentMerchant(merchant: string) {
  this.selectedMerchant = merchant
}

payWithCard() {
  const payload = {
    transactionId: this.retryPayment === false ? Number(this.transactionId): Number(this.retryApplicationTransactionId),
    makePaymentType: this.retryPayment === false ? 4 : this.retryApplicationmakePaymentType,
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
  // if (this.selectedMerchant === 'Paystack') {
  //   this.launchPaystack()
  // }
  if (this.selectedMerchant === 'Flutterwave') {
    this.makePaymentWithFlutterwave()
  } 
}


// paystack implementations

launchPaystack() {
  const paystack = new PaystackPop();
  paystack.newTransaction({
    key: this.pk, // Replace with your public key
    reference: new Date().getTime().toString(),
    email: this.userData?.email,
    amount: this.retryPayment === false ? (this.trxData?.amount * 100) : (this.retryApplicationAmount * 100) , //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
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


// launch flutterwave modal


makePaymentWithFlutterwave() {
  const paymentData: InlinePaymentOptions = {
    public_key: this.wavePk,
    tx_ref: this.generateReference(),
    amount: this.retryPayment === false ? (this.trxData?.amount) : (this.retryApplicationAmount) , //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    currency: "NGN",
    subaccounts: [
      {
        id: this.trxData.institutionSubAccount,
        transaction_charge_type: "flat_subaccount",
        transaction_charge: Number(this.trxData.institutionAmount),
      }
    ],
    payment_options: "card, ussd",
    redirect_url: "",
    customer: this.customerDetails,
    customizations: this.customizations,
    callback: this.makePaymentCallback,
    onclose: this.closedPaymentModal,
    callbackContext: this,
  };
  this.flutterwave.inlinePay(paymentData);
}

makePaymentCallback(response: PaymentSuccessResponse): void {
  console.log("Pay", response);
  this.flutterwave.closePaymentModal(5);
  this.callFLWverification(response)
}


callFLWverification(response: any) {
  this.configurationService.verifyFLWTransactions(response.transaction_id).subscribe((res: any) => {
    console.log(res)
    if (res.payload.status === 'successful') {
      
      this.isTransactionSuccessful = 'success'
      this.validatePayment(response)
    }
  })
}
closedPaymentModal(): void {
  // console.log("payment is closed");
}
generateReference(): string {
  let date = new Date();
  return date.getTime().toString();
}

// flutterwave validate payment






// validate main payment
validatePayment(data: any) {
  ////console.log(data)
  const payload = {
    transactionId: this.retryPayment === false ? Number(this.transactionId): Number(this.retryApplicationTransactionId),
    makePaymentType: this.retryPayment === false ? 4 : this.retryApplicationmakePaymentType,
    refrenceNumber: data.reference || data.flw_ref,
    merchantType: 'FLUTTERWAVE',
    isPaymentSuccessful: this.isTransactionSuccessful === 'success' ? true : false,
    imei: '',
    serialNumber: '',
    device: this.deviceModel,
    ipAddress: this.ipAddress

  }
  this.store.dispatch(validateOrganizationFundWallet({payload}))
  this.actions$.pipe(ofType(validateOrganizationFundWalletSuccess)).subscribe((res: any) => {
    ////console.log(res)
    if (res) {
      this.notification.publishMessages('success', 'successful')
      this.router.navigate(['/graduate/my-verifications']);      

    }

  })
}

ngOnDestroy(): void {
  sessionStorage.removeItem('ver_pMy')
  sessionStorage.removeItem('sel_Ver')
}

}
