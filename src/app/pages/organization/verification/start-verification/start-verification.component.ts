import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { getInstitutionSector, getInstitutionTypes } from 'src/app/store/institution/action';
import { getOrganizationWalletId, getOrganizationWalletIdSuccess, organizationSectorAndIndustry, organizationSectorAndIndustrySuccess, reasonForRequest, reasonForRequestSuccess, verifyGraduateRecord, verifyGraduateRecordSuccess } from 'src/app/store/organization/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-start-verification',
  templateUrl: './start-verification.component.html',
  styleUrls: ['./start-verification.component.scss']
})
export class StartVerificationComponent implements OnInit {
  referenceForm!: FormGroup
  selectedFile!: null
  allowedFiled = ["image/png", "image/jpeg", "application/pdf"];
  userData: any;
  balance: any;
  deviceModel: string;
  ipAddress: any;
  requestReason: any;
  organizationAndSectorName: any;

  constructor(
    private fb: FormBuilder,
    private appStore: Store<AppStateInterface>,
    private store: Store,
    private router: Router,
    private actions$  : Actions,
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
    this.userData = JSON.parse(data)
    this.loadIp();

    this.store.dispatch(
      getInstitutionSector()
    );
    this.store.dispatch(
      getInstitutionTypes()
    );
    this.initReferenceForm()
   
    this.store.dispatch(reasonForRequest())
    this.actions$.pipe(ofType(reasonForRequestSuccess)).subscribe((res: any) => {
      this.requestReason = res.payload;
    })
    this.store.dispatch(organizationSectorAndIndustry({id: this.userData.OrganizationId}))
    this.actions$.pipe(ofType(organizationSectorAndIndustrySuccess)).subscribe((res: any) => {
      this.organizationAndSectorName = res.payload;
    })
    this.store.dispatch(getOrganizationWalletId({id: this.userData.OrganizationId}))
    this.actions$.pipe(ofType(getOrganizationWalletIdSuccess)).subscribe((res: any) => {
      this.balance = res.payload.balance;
    })

  }

  loadIp() {
    this.utilityService.getuserIP().subscribe((res: any) => {
     this.ipAddress = res.ip
    })
  }

  initReferenceForm() {
    this.referenceForm = this.fb.group({
    refNumber: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{13}$/)]],
    reasonForRequest: ['', Validators.required],
  });
  }


  goBack() {
  window.history.back();
  }

  isRefNumberValid(): boolean {
  const refNumberControl = this.referenceForm.get('refNumber');
  return (refNumberControl?.valid ?? false) && (refNumberControl?.touched ?? false);
}


verifyData() {
  const {refNumber, reasonForRequest} = this.referenceForm.value
  const payload = {
    referenceCode: refNumber,
  organizationId: Number(this.userData.OrganizationId),
  organizationIndustry: this.organizationAndSectorName.organizationIndustry,
  // organizationSectorName: this.organizationAndSectorName.organizationSector,
  reasonForRequestType: reasonForRequest,
  imei: '',
  serialNumber: '',
  device: this.deviceModel,
    ipAddress: this.ipAddress
  }
  this.store.dispatch(verifyGraduateRecord({payload}))
  this.actions$.pipe(ofType(verifyGraduateRecordSuccess)).subscribe((res: any) => {
    if (res.payload.hasErrors === false) {
      this.notification.publishMessages('success', res.payload.description)
      sessionStorage.setItem('dx_l', JSON.stringify(res.payload.payload))
      this.router.navigateByUrl(`/organization/verifications/verify-documents/${res.payload.payload.transactionId}`)
      // this.router.navigateByUrl('/organization/verifications')
      // /organization/verifications/verify-documents/2
    }
  })

  // [routerLink]="''"
}
}
