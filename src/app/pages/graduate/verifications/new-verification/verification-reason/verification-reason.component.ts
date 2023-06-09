import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { submitVerificationReasonForRequest, submitVerificationReasonForRequestSuccess } from 'src/app/store/graduates/action';
import { reasonForRequest, reasonForRequestSuccess } from 'src/app/store/organization/action';

@Component({
  selector: 'app-verification-reason',
  templateUrl: './verification-reason.component.html',
  styleUrls: ['./verification-reason.component.scss']
})
export class VerificationReasonComponent implements OnInit {
  requestId: any;
  requestDetail: any;
  selectedFile!: null
  allowedFiled = ["image/png", "image/jpeg", "application/pdf"];
  selectedFileList: any  = []
  reasonForm!: FormGroup
  reasons: any;
  selectedVerificationUser: any;
  userData: any;
  deviceModel: string;
  ipAddress: any;
  showDefault: boolean = true;

  constructor(
    private fb: FormBuilder,
    private location: LocationStrategy,
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
    this.loadIp();

    this.reasonForm = this.fb.group({
      reasonForRequest: [null, Validators.required],
      fileList: [null, [Validators.required, Validators.minLength(1)]],
    })
    const record: any = sessionStorage.getItem('sel_Ver')
    this.selectedVerificationUser = JSON.parse(record)
    this.store.dispatch(reasonForRequest())
    this.actions$.pipe(ofType(reasonForRequestSuccess)).subscribe((res: any) => {
      this.reasons = res.payload
    })
  }

  changeReason(event: any){

  }

  loadIp() {
    this.utilityService.getuserIP().subscribe((res: any) => {
     this.ipAddress = res.query
    })
  }

  handleFileUpload(e: any) {
    const file = e.target.files[0];
    if (!this.allowedFiled.includes(file.type)) {
		  alert("Invalid format! Please select only correct file type");

		  return;
		} else {
      this.showDefault = true;

      this.selectedFile = e.target.files[0].name
      this.selectedFileList.push(file)
      this.reasonForm.patchValue({
        fileList: this.selectedFileList,
      });
      this.reasonForm.get('fileList')?.updateValueAndValidity();
      const totalSize = this.selectedFileList.reduce((accumulator: any, currentFile: any) => accumulator + currentFile.size, 0);
      if (totalSize > 5 * 1024 * 1024) { // 5MB in bytes
        this.selectedFileList.pop(); 
        this.notification.publishMessages('danger', 'Total size of uploaded files exceeds the maximum allowed size of 5MB.')
        
      } 
    }
  }

  deleteFile(index: number){
    this.showDefault = true;

    this.selectedFileList.splice(index, 1);
    this.reasonForm.patchValue({
      fileList: this.selectedFileList,
    });
  }

  
  back() {
    this.location.back();
  }



  submitRequestReason() {
    const {reasonForRequest} = this.reasonForm.value
    const payload = {
      GraduateId: this.userData.GraduateId,
      InstitutionGraduateId: this.selectedVerificationUser.id,
      ReasonForRequestType: reasonForRequest,
      InstitutionId: this.selectedVerificationUser.institutionId,
      Document: this.selectedFileList,
      imei: '',
      serialNumber: '',
      device: this.deviceModel,
      ipAddress: this.ipAddress,

    }
    this.store.dispatch(submitVerificationReasonForRequest({payload}))
    this.actions$.pipe(ofType(submitVerificationReasonForRequestSuccess)).subscribe((res: any) => {
      sessionStorage.setItem('ver_pMy', JSON.stringify(res.payload.payload))
      if (res.payload.hasErrors === false) {
        this.router.navigateByUrl(`/graduate/my-verifications/new/make-payment/${res.payload.payload.transactionId}`)
      }
      
      // routerLink="/graduate/my-verifications/verification-details"
    })
  }
}
