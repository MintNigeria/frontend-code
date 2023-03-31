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

@Component({
  selector: 'app-fund-wallet',
  templateUrl: './fund-wallet.component.html',
  styleUrls: ['./fund-wallet.component.scss']
})
export class FundWalletComponent implements OnInit {
  walletData: any;
  walletForm!: FormGroup
  pk: string = environment.pkKey
  deviceModel: string;
  ipAddress: any;
  userData: any;
  isTransactionSuccessful: any;
  transactionId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
    private fb: FormBuilder,
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
  }

  
   loadIp() {
    this.utilityService.getuserIP().subscribe((res: any) => {
     this.ipAddress = res.ip
    })
  }

  proceedToPayment() {
    const {amount} = this.walletForm.value
    const payload = {
      graduateId: Number(this.userData.GraduateId),
      walletId: this.walletData.id,
      amount: Number(amount),
      refrenceNumber: '16801776659763433434343434'
    }
    this.store.dispatch(fundGraduateWallet({payload}))
    this.actions$.pipe(ofType(fundGraduateWalletSuccess)).subscribe((res: any) => {
      if (res.payload.hasErrors === false) {
        console.log(res)
        this.transactionId = res.payload.payload?.transactionId
        this.lauchPaystack()
      }
    })
  }

  lauchPaystack() {
    const {amount} = this.walletForm.value
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: this.pk, // Replace with your public key
      reference: new Date().getTime().toString(),
      email: this.userData?.email,
      amount: amount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
      onCancel: () => {
        this.onClose();
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
  onClose() {
    ////console.log('trx')
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
      this.notification.publishMessages('success', 'successful')
      this.router.navigateByUrl('/graduate/transactions')
    })
  }

}
