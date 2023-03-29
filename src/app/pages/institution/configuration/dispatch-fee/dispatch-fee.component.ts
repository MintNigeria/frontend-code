import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { getInstitutionConfiguration, getInstitutionConfigurationSuccess, saveDispatchFee, saveDispatchFeeSuccess } from 'src/app/store/configuration/action';
import { AppStateInterface } from 'src/app/types/appState.interface';


@Component({
  selector: 'app-dispatch-fee',
  templateUrl: './dispatch-fee.component.html',
  styleUrls: ['./dispatch-fee.component.scss']
})
export class DispatchFeeComponent implements OnInit {
  deviceModel: string;
  ipAddress!: any;
  updatedData: any;
  feeForm!: FormGroup
  institutionData: any;
  institutionId: any;
  dispatchFee: any;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private router: Router,
    private actions$: Actions,
    private utilityService: UtilityService,
    private notification: NotificationsService) {
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
      this.dispatchFee = res.payload.dispatchFeeVMs
      this.updatedData = this.dispatchFee.map((x: any, index: number) => {
        return {
          id: x.id,
        fee: x.fee,
        }
      })
      //console.log(this.updatedData)

      // this.processingFees = res.payload
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
    newData  = {...newData, fee: Number(input.value)}
   
    this.updatedData[parent] = newData;
    sessionStorage.setItem('dispX_f', JSON.stringify(this.updatedData))
  }

  saveDispatch() {
    const data: any = sessionStorage.getItem('dispX_f')
    const newData = JSON.parse(data)
this.store.dispatch(saveDispatchFee({institutionId: this.institutionId, payload: newData }))
this.actions$.pipe(ofType(saveDispatchFeeSuccess)).subscribe((res: any) => {
  if (res.payload.hasErrors === false) {
    this.notification.publishMessages('success', res.payload.description)
    this.store.dispatch(getInstitutionConfiguration({institutionId: this.institutionId}))
    sessionStorage.removeItem('dispX_f')
  }
})
  }

}
