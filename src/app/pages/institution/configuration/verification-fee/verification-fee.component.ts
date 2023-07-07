import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { getInstitutionConfiguration, getInstitutionConfigurationSuccess, sendverificationFeeForApproval, sendverificationFeeForApprovalSuccess } from 'src/app/store/configuration/action';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as numeral from 'numeral';

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
  verificationFeeSetup!: boolean;

  
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
      this.verificationFeeSetup = res.payload.hasSetUpVerificationFee
      this.isFirstFeeApproved = res.payload.isFirstTimeAddingVerificationFee
      console.log(res.payload)
      this.vericationList = res.payload.institutionVerifcationFeeVMs.map((x: any) => {
        return {
          name: x.name,
          id: x.id,
          inActiveFee: numeral(x.inActiveFee).format('00,'),
        }
      })
      // this.processingFees = res.payload
      this.updatedData = this.vericationList?.map((x: any) => {
        return {
          id: x.id,
          amount: numeral(x.inActiveFee).format('00,'),
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
     this.ipAddress = res.query
    })
  }

  addCommas(data: any, input: any, parent: number) {
    let newData2 = this.vericationList[parent]
    newData2  = {...newData2, inActiveFee: numeral(input.value).format('00,')}
    this.vericationList[parent] = newData2
  }



  getFee(data: any, input: any, parent: number) {
    const allData = this.updatedData
    let newData = this.updatedData[parent]
    newData  = {...newData, amount: numeral(input.value).value()}
   
    this.updatedData[parent] = newData;
    sessionStorage.setItem('verX_f', JSON.stringify(this.updatedData))
  }

  sendForApproval() {
    const data: any = sessionStorage.getItem('verX_f')
    const newData = JSON.parse(data)
    const payload = newData.map((x: any) => {
      return {
        id: x.id,
        amount: numeral(x.amount).value(),
        imei: x.imei,
        serialNumber: x.serialNumber,
        device: x.device,
        ipAddress: x.ipAddress
    }})
this.store.dispatch(sendverificationFeeForApproval({institutionId: this.institutionId, payload }))
this.actions$.pipe(ofType(sendverificationFeeForApprovalSuccess)).subscribe((res: any) => {
  if (res.payload.hasErrors === false) {
    this.notification.publishMessages('success', res.payload.description)
    this.store.dispatch(getInstitutionConfiguration({institutionId: this.institutionId}))
    sessionStorage.removeItem('verX_f')
  }
})

    // [routerLink]="'/institution/configuration/awaiting-approval-fee'"
  }

 

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  

}
