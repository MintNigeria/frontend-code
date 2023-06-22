import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { getAllPaymentPlans, getAllPaymentPlansSuccess } from 'src/app/store/configuration/action';
import { fundOrganizationWallet, fundOrganizationWalletSuccess, getOrganizationWalletId, getOrganizationWalletIdSuccess, validateOrganizationFundWallet, validateOrganizationFundWalletSuccess } from 'src/app/store/organization/action';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { environment } from 'src/environments/environment';
declare var PaystackPop: any;

@Component({
  selector: 'app-payment-plan',
  templateUrl: './payment-plan.component.html',
  styleUrls: ['./payment-plan.component.scss']
})
export class PaymentPlanComponent implements OnInit {
  planList: any;
pk: string = environment.pkKey
  userData: any;
  institutionId: any;
  walletId: any;
  selectedPlanData: any;
  deviceModel: string;
  ipAddress: any;
  isTransactionSuccessful: any;
  referenceNumber: any;
  failedTransactionId: any;
  transactionId: any;
  authData: any;
  constructor(
    private appStore: Store<AppStateInterface>,
    private store: Store,
    private actions$: Actions,
    private utilityService: UtilityService,
    private notification: NotificationsService,
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
    const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)
    const auth: any = localStorage.getItem('authData')
    this.authData = JSON.parse(data)
    this.institutionId = this.userData.InstitutionId

    this.store.dispatch(getAllPaymentPlans());
    this.actions$.pipe(ofType(getAllPaymentPlansSuccess)).subscribe((res: any) => {
      this.planList = res.payload;
    })
    this.store.dispatch(getOrganizationWalletId({id: this.userData.OrganizationId}))
    this.actions$.pipe(ofType(getOrganizationWalletIdSuccess)).subscribe((res: any) => {
      this.walletId = res.payload.id;
    })
    this.loadIp();

  }

   loadIp() {
    this.utilityService.getuserIP().subscribe((res: any) => {
     this.ipAddress = res.query
    })
  }

  selectPlan(plan: any) {
    this.selectedPlanData = plan
    
    this.buyOrganizationSubscription()
    // launch paystack thing here

  }

  buyOrganizationSubscription() {
    const payload = {
      organizationId: Number(this.userData.OrganizationId),
      amount: this.selectedPlanData.amount,
      subscriptionPlanId: this.selectedPlanData.id,
      walletId: this.walletId,
      transactionReferencenumber: new Date().getTime().toString(),
    }
    this.store.dispatch(fundOrganizationWallet({payload}))
    this.actions$.pipe(ofType(fundOrganizationWalletSuccess)).subscribe((res: any) => {
      this.transactionId = res?.payload?.payload?.transactionId
      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: this.pk, // Replace with your public key
        reference: new Date().getTime().toString(),
        email: this.userData?.email,
        amount: this.selectedPlanData?.amount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        onCancel: () => {
          this.onClose();
        },
        onSuccess: (transaction: any) => {
          this.onSuccess(transaction);
        },
      });
    })
  }

  onSuccess(trx: any) {
   
        this.isTransactionSuccessful = trx.status,
    this.referenceNumber = trx.reference

    this.validatePayment(trx)
  }
  onClose() {
    const payload = {
      transactionId: this.transactionId,
      makePaymentType: 3,
      refrenceNumber: 'N/A',
      merchantType: 'PAYSTACK',
      isPaymentSuccessful: false,
      imei: '',
      serialNumber: '',
      device: this.deviceModel,
      ipAddress: this.ipAddress
  
    }
    this.store.dispatch(validateOrganizationFundWallet({payload}))
    this.actions$.pipe(ofType(validateOrganizationFundWalletSuccess)).subscribe((res: any) => {
      ////console.log(res)
      this.notification.publishMessages('warning', 'Payment cancelled')
      this.router.navigateByUrl('/organization/transactions')
     

    })
  }

  validatePayment(data: any) {
    const payload = {
      transactionId: Number(this.transactionId),
      makePaymentType: 3,
      refrenceNumber: this.referenceNumber,
      merchantType: 'PAYSTACK',
      isPaymentSuccessful: this.isTransactionSuccessful === 'success' ? true : false,
      imei: '',
      serialNumber: '',
      device: this.deviceModel,
      ipAddress: this.ipAddress
  
    }
    this.store.dispatch(validateOrganizationFundWallet({payload}))
    this.actions$.pipe(ofType(validateOrganizationFundWalletSuccess)).subscribe((res: any) => {
      this.notification.publishMessages('success', res.payload.description)
      this.router.navigateByUrl('/organization/transactions')
     

    })
  }



}
