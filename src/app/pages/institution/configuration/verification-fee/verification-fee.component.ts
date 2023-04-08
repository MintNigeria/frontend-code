import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { getInstitutionConfiguration, getInstitutionConfigurationSuccess, sendverificationFeeForApproval, sendverificationFeeForApprovalSuccess } from 'src/app/store/configuration/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-verification-fee',
  templateUrl: './verification-fee.component.html',
  styleUrls: ['./verification-fee.component.scss']
})
export class VerificationFeeComponent implements OnInit {
  feeForm!: FormGroup
  vericationList: any;
  institutionData: any;
  institutionId: any;
  deviceModel: string;
  ipAddress!: any;
  updatedData: any;
  isFeeApproved: any;
  isFirstFeeApproved: any;

  
  constructor( 
    private fb: FormBuilder,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private router: Router,
    private actions$: Actions,
    private utilityService: UtilityService,
    private notification: NotificationsService
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
    this.institutionData = JSON.parse(data)
    this.institutionId = this.institutionData.InstitutionId
    this.loadIp();

    this.store.dispatch(getInstitutionConfiguration({institutionId: this.institutionId}))
    this.actions$.pipe(ofType(getInstitutionConfigurationSuccess)).subscribe((res: any) => {
      ////console.log(res)
      this.isFeeApproved = res.payload.isVerificationFeeApproved
      this.isFirstFeeApproved = res.payload.isFirstTimeAddingVerificationFee

      this.vericationList = res.payload.institutionVerifcationFeeVMs
      // this.processingFees = res.payload
      this.updatedData = this.vericationList?.map((x: any) => {
        return {
          id: x.id,
          amount: x.fee,
          imei: '',
      serialNumber: '',
      device: this.deviceModel,
      ipAddress: this.ipAddress
        }
      })
      
    })
  }

   loadIp() {
    this.utilityService.getuserIP().subscribe((res: any) => {
     this.ipAddress = res.ip
    })
  }


  getFee(data: any, input: any, parent: number) {
    const allData = this.updatedData
    let newData = this.updatedData[parent]
    newData  = {...newData, amount: Number(input.value)}
   
    this.updatedData[parent] = newData;
    sessionStorage.setItem('verX_f', JSON.stringify(this.updatedData))
  }

  sendForApproval() {
    const data: any = sessionStorage.getItem('verX_f')
    const newData = JSON.parse(data)
this.store.dispatch(sendverificationFeeForApproval({institutionId: this.institutionId, payload: newData }))
this.actions$.pipe(ofType(sendverificationFeeForApprovalSuccess)).subscribe((res: any) => {
  if (res.payload.hasErrors === false) {
    this.notification.publishMessages('success', res.payload.description)
    this.store.dispatch(getInstitutionConfiguration({institutionId: this.institutionId}))
    sessionStorage.removeItem('verX_f')
  }
})

    // [routerLink]="'/institution/configuration/awaiting-approval-fee'"
  }

 

  

}
