import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { fundGraduateWallet, fundGraduateWalletSuccess, getGraduateWalletId, getGraduateWalletIdSuccess } from 'src/app/store/graduates/action';
import { validateOrganizationFundWallet, validateOrganizationFundWalletSuccess } from 'src/app/store/organization/action';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { environment } from 'src/environments/environment';
declare var PaystackPop: any;
import * as numeral from 'numeral';
import {
  Flutterwave,
  InlinePaymentOptions,
  PaymentSuccessResponse,
} from "flutterwave-angular-v3";
@Component({
  selector: 'app-fund-wallet',
  templateUrl: './fund-wallet.component.html',
  styleUrls: ['./fund-wallet.component.scss']
})
export class FundWalletComponent implements OnInit {
  walletData: any;
  walletForm!: FormGroup
  pk: string = environment.pkKey
  wavePk: string = environment.wavePk_key
  deviceModel: string;
  ipAddress: any;
  userData: any;
  isTransactionSuccessful: any;
  transactionId: any;
  walletValue!: string;
  initialFee: number = 0;
  title!: string;
  reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
  customerDetails = {
    name: "Demo Customer  Name",
    email: "customer@mail.com",
    phone_number: "08100000000",
  };

  customizations = {
    title: "Customization Title",
    description: "Customization Description",
    logo: "https://flutterwave.com/images/logo-colored.svg",
  };

  meta = { counsumer_id: "7898", consumer_mac: "kjs9s8ss7dd" };
  paymentData: InlinePaymentOptions = {
    public_key: this.wavePk,
    tx_ref: this.generateReference(),
    amount: 2500,
    currency: "NGN",
    subaccounts: [
      {
        id: "RS_798A35E2050826075149903873FD2E07",
        transaction_charge_type: "flat_subaccount",
        transaction_charge: 2000,
      }
    ],
    payment_options: "card",
    redirect_url: "",
    meta: this.meta,
    customer: this.customerDetails,
    customizations: this.customizations,
    callback: this.makePaymentCallback,
    onclose: this.closedPaymentModal,
    callbackContext: this,
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
    private fb: FormBuilder,
    private utilityService: UtilityService,
    private notification: NotificationsService,
    private flutterwave: Flutterwave

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


  makePaymentCallback(response: PaymentSuccessResponse): void {
    console.log("Pay", response);
    this.flutterwave.closePaymentModal(5);
  }
  closedPaymentModal(): void {
    console.log("payment is closed");
  }
  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }

  
  ngOnInit(): void {
        const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)
     this.store.dispatch(getGraduateWalletId())
    this.actions$.pipe(ofType(getGraduateWalletIdSuccess)).subscribe((res: any) => {
      this.walletData = res.payload.payload;
    })
    this.loadIp();

    this.walletForm = this.fb.group({
      amount: ['', Validators.required]
    })

    this.walletForm.valueChanges.subscribe((res: any) => {
      this.initialFee = res.amount
      this.walletValue = numeral(res.amount).format('00,')
    })


  }

  makePayment() {
    this.flutterwave.inlinePay(this.paymentData);
  }

  
   loadIp() {
    this.utilityService.getuserIP().subscribe((res: any) => {
     this.ipAddress = res.query
    })
  }

  proceedToPayment() {
    const {amount} = this.walletForm.value
    const payload = {
      graduateId: Number(this.userData.GraduateId),
      walletId: this.walletData.id,
      amount: numeral(amount).value(),
      refrenceNumber: this.reference
    }
    this.store.dispatch(fundGraduateWallet({payload}))
    this.actions$.pipe(ofType(fundGraduateWalletSuccess)).subscribe((res: any) => {
      if (res.payload.hasErrors === false) {
        this.transactionId = res.payload.payload?.transactionId
        // document.getElementById('paystack')?.click()
        this.lauchPaystack()
        // this.paymentInit()
        // console.log(this.initialFee, this.userData.email)
        // this.options = {
        //   amount: this.initialFee * 100,
        //   email: this.userData.email,
        //   ref: `${Math.ceil(Math.random() * 10e10)}`
        // }
      }
    })
  }

  lauchPaystack() {
    // console.log('launched')
    const amount: any = numeral(this.initialFee).value()
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: this.pk, // Replace with your public key
      reference: new Date().getTime().toString(),
      email: this.userData?.email,
      amount: amount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
      onCancel: (transaction: any) => {
        this.onClose(transaction);
      },
      onSuccess: (transaction: any) => {
        this.onSuccess(transaction);
      },
    });

  }

  onSuccess(trx: any) {
    //console.log(trx)
    this.isTransactionSuccessful = trx.status
    this.validatePayment(trx)
  }
  onClose(trx: any) {
    const payload = {
      transactionId: Number(this.transactionId),
      makePaymentType: 2,
      refrenceNumber: 'N/A',
      merchantType: 'PAYSTACK',
      isPaymentSuccessful:  false,
      imei: '',
      serialNumber: '',
      device: this.deviceModel,
      ipAddress: this.ipAddress
  
    }
    this.store.dispatch(validateOrganizationFundWallet({payload}))
    this.actions$.pipe(ofType(validateOrganizationFundWalletSuccess)).subscribe((res: any) => {
      // console.log(res)
      this.notification.publishMessages('warning', 'Payment cancelled')
      this.router.navigateByUrl('/graduate/transactions')
    })
  }

  validatePayment(data: any) {
    const payload = {
      transactionId: Number(this.transactionId),
      makePaymentType: 2,
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
      // console.log(res)
      this.notification.publishMessages('success', res.payload.description)
      this.router.navigateByUrl('/graduate/transactions')
    })
  }

  // paymentInit() {
  //   console.log('Payment initialized');
  // }

  // paymentDone(ref: any) {
  //   this.title = 'Payment successfull';
  //   console.log(this.title, ref);
  //   this.validatePayment(ref)

  // }

  // paymentCancel() {
  //   console.log('payment failed');
  // }

  cancel() {
    this.router.navigateByUrl('/graduate/transactions')

  }


}
