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
    this.institutionId = this.userData.InstitutionId

    this.store.dispatch(getAllPaymentPlans());
    this.actions$.pipe(ofType(getAllPaymentPlansSuccess)).subscribe((res: any) => {
      this.planList = res.payload;
    })
    this.loadIp();

  }

   loadIp() {
    this.utilityService.getuserIP().subscribe((res: any) => {
     this.ipAddress = res.ip
    })
  }

  selectPlan(plan: any) {
    this.selectedPlanData = plan
    this.store.dispatch(getOrganizationWalletId({id: this.userData.OrganizationId}))
    this.actions$.pipe(ofType(getOrganizationWalletIdSuccess)).subscribe((res: any) => {
      //console.log(res)
      this.walletId = res.payload.id;
    })
    // launch paystack thing here
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: this.pk, // Replace with your public key
      reference: new Date().getTime().toString(),
      email: this.userData?.email,
      amount: plan?.amount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
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
    const payload = {
      organizationId: Number(this.userData.OrganizationId),
      amount: this.selectedPlanData.amount,
      subscriptionPlanId: this.selectedPlanData.id,
      walletId: this.walletId,
      transactionReferencenumber: trx.reference
    }
    //console.log(payload)
    this.store.dispatch(fundOrganizationWallet({payload}))
    this.actions$.pipe(ofType(fundOrganizationWalletSuccess)).subscribe((res: any) => {
      //console.log('res, res', res)
      // const id = res.payload.payload.
      this.validatePayment(res)
    })
  }
  onClose() {
    //console.log('trx')
  }

  validatePayment(data: any) {
    //console.log(data)
    const payload = {
      transactionId: Number(data?.payload?.payload?.transactionId),
      makePaymentType: 3,
      merchantType: 'PAYSTACK',
      isPaymentSuccessful: this.isTransactionSuccessful === 'success' ? true : false,
      imei: '',
      serialNumber: '',
      device: this.deviceModel,
      ipAddress: this.ipAddress
  
    }
    this.store.dispatch(validateOrganizationFundWallet({payload}))
    this.actions$.pipe(ofType(validateOrganizationFundWalletSuccess)).subscribe((res: any) => {
      //console.log(res)
      if (res) {

        this.notification.publishMessages('success', 'test')
        this.router.navigateByUrl('/organization/transactions')
      }

    })
  }



}
