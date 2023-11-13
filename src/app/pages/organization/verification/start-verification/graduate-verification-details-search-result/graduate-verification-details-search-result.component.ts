import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { organizationSectorAndIndustry, organizationSectorAndIndustrySuccess, organizationVerificationByGraduateDetails, organizationVerificationByGraduateDetailsSuccess, reasonForRequest, reasonForRequestSuccess } from 'src/app/store/organization/action';

@Component({
  selector: 'app-graduate-verification-details-search-result',
  templateUrl: './graduate-verification-details-search-result.component.html',
  styleUrls: ['./graduate-verification-details-search-result.component.scss']
})
export class GraduateVerificationDetailsSearchResultComponent implements OnInit {
  edit = 'editModal';
  graduateList: any;
  modalViewData: any;
  userData: any;
  balance: any;
  activateBtn: boolean = false;
  
  recordList: any
  selectedReason!: null;
  data : any
  requestReason: any;
  reasonForm!: FormGroup;
  ipAddress: any;
  deviceModel: any;
  organizationAndSectorName: any;
  constructor(
    private router : Router,
    private fb: FormBuilder,
    private store: Store,
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
    const record: any = sessionStorage.getItem('ver_Ys')
    this.recordList = JSON.parse(record)
    const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)
    this.loadIp();
    this.store.dispatch(reasonForRequest())
    this.actions$.pipe(ofType(reasonForRequestSuccess)).subscribe((res: any) => {
      this.requestReason = res.payload;
    })
    this.initForm()
    this.store.dispatch(organizationSectorAndIndustry({id: this.userData.OrganizationId}))
    this.actions$.pipe(ofType(organizationSectorAndIndustrySuccess)).subscribe((res: any) => {
      this.organizationAndSectorName = res.payload;
    })
  }
  viewDetails(data: any) {
    this.reasonForm.controls['checked'].setValue(true)
    this.data = data;
    // document.getElementById('editModal')?.click();
  }
  loadIp() {
    this.utilityService.getuserIP().subscribe((res: any) => {
     this.ipAddress = res.query
    })
  }

  initForm() {
    this.reasonForm = this.fb.group({
      selectedReason: [null, Validators.required],
      checked: ['', Validators.required]
    })
  }

  goBack(){
    window.history.back()
  }

  verifyData() {
    const {selectedReason, checked} = this.reasonForm.value;
    const payload = {
      reasonForRequestType: selectedReason,
      institutionGraduateId: Number(this.data.id),
      institutionId: Number(this.data.institutionId),
      organizationId: Number(this.userData.OrganizationId),
      organizationIndustry: this.organizationAndSectorName.organizationIndustry,
      organizationSectorName: this.organizationAndSectorName.organizationSector,
      imei: '',
      serialNumber: '',
      device: this.deviceModel,
      ipAddress: this.ipAddress,
      graduateRecordInformationVM: {
        fullName: this.data.fullName,
        gender: this.data.gender,
        faculty: this.data.faculty,
        department: this.data.department,
        yearOfEntry: this.data.yearOfEntry,
        graduationYear: this.data.graduationYear,
        matriculationNumber: this.data.matriculationNumber,
        degreeType: this.data.degreeType,
        programme: this.data.programme,
        grade: this.data.grade,
      }
    }
    this.store.dispatch(organizationVerificationByGraduateDetails({payload}))
    this.actions$.pipe(ofType(organizationVerificationByGraduateDetailsSuccess)).subscribe((res: any) => {
      if (res.payload.hasErrors === false) {
        this.notification.publishMessages('success', res.payload.description)
        sessionStorage.setItem('dx_l', JSON.stringify(res.payload.payload))
        this.router.navigateByUrl(`/organization/verifications/graduate-details-payment/${res.payload.payload.transactionId}`)
        // this.router.navigateByUrl('/organization/verifications')
        // /organization/verifications/verify-documents/2
      }
    })
  }

  openEdit() {
    sessionStorage.setItem('sel_Ver', JSON.parse(this.data))
    this.router.navigateByUrl('/graduate/my-verifications/new/verification-reason')
    document.getElementById('editModal')?.click();
  }
  
  proceed() {
    sessionStorage.setItem('sel_Ver', JSON.stringify(this.data))
    this.router.navigateByUrl('/graduate/my-verifications/new/verification-reason')
    document.getElementById('editModal')?.click();

  }
  closeEdit() {
    document.getElementById('editModal')?.click();
  }

  checkConsent(event: any) {
    if (event.checked === true) {
      this.activateBtn = true
    } else {
      this.activateBtn = false

    }
  }


}
