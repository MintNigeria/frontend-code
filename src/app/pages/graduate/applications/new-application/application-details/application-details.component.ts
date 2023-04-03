import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { getAllProcessingFee, getAllProcessingFeeSuccess, getInstitutionConfiguration, getInstitutionConfigurationSuccess } from 'src/app/store/configuration/action';
import { getActiveDeliveryOptions, getActiveDeliveryOptionsSuccess } from 'src/app/store/graduates/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent implements OnInit {
  certificateOriginal: boolean = true;
  certificateTemplate: boolean = false;
  certifiedCopy: boolean = false;
  transcript: boolean = false;
  additionalNumber: boolean = false;
  hardCopyMethod: boolean = true;
  emailUploadMethod: boolean = false;
  fileUploadMethod: boolean = false;
  appDetailsForm!: FormGroup;

  emailSelect: boolean = true;
  fileUpload: boolean = false;
  hardCopy: boolean = false;

  selectedFile!: null
allowedFiled = ["image/png", "image/jpeg", "application/pdf"];
selectedFileList: any  = []
processingFeeList: any;
  deliveryType: any;
 

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private router: Router,
    private actions$: Actions,
    private utilityService: UtilityService,
    private notification: NotificationsService
  ) { }

  ngOnInit(): void {
     const record: any = sessionStorage.getItem('sel_Ver')
    const data = JSON.parse(record)
    this.initForm()
    this.store.dispatch(getInstitutionConfiguration({institutionId: data.institutionId}))
    this.actions$.pipe(ofType(getInstitutionConfigurationSuccess)).subscribe((res: any) => {
      console.log(res)
      this.processingFeeList = res.payload.processingFeesVM
      // this.isFeeApproved = res.payload.isProcessingFeeApproved
      // this.isFirstFeeApproved = res.payload.isFirstTimeAddingProcessingFee

      // this.updatedData = this.processingFeeList.map((x: any, index: number) => {
      //   const a = x.processingFeeConfigVM.map((element: any) => {
      //     return {
      //       processingFeeConfigId: element.id,
      //       fee: element.fee
      //     }
      //   });
       
      // })
    })

  }

  initForm(){
    this.appDetailsForm = this.fb.group ({
      certificate: ['', Validators.required],
      deliveryMethod: ['', Validators.required],
      url: ['', Validators.required],
      loginUser: ['', Validators.required],
      loginPassword: ['', Validators.required],
      phoneNo: ['', Validators.required],
      additionalPhoneNo: [ '', Validators.required ],
      reasonForRequest: [ '',  Validators.required  ],

    })
  }

  originalCertificateClicked(data: any){
    this.store.dispatch(getActiveDeliveryOptions({id: data.id}))
    this.actions$.pipe(ofType(getActiveDeliveryOptionsSuccess)).subscribe((res: any) => {
      this.deliveryType = res.payload
      console.log(this.deliveryType)
    })
    // this.certificateOriginal = true;
    // this.certificateTemplate = false;
    // this.certifiedCopy = false;
    // this.transcript = false;
    // this.hardCopyMethod = true;
    // this.fileUploadMethod = false;
    // this.emailUploadMethod = false;
  }

  certificateTemplateClicked(){
    this.certificateOriginal = false;
    this.certificateTemplate = true;
    this.certifiedCopy = false;
    this.transcript = false;
    this.fileUploadMethod = true;
    this.emailUploadMethod = true;
    
  }

 

  certifiedCopyClicked(){
    this.certificateOriginal = false;
    this.certificateTemplate = false;
    this.certifiedCopy = true;
    this.transcript = false;
  }

  transcriptClicked(){
    this.certificateOriginal = false;
    this.certificateTemplate = false;
    this.certifiedCopy = false;
    this.transcript = true;
  }

  emailClicked(){
    this.emailSelect = true;
    this.hardCopy = false; 
    this.fileUpload = false;
  }
  hardCopyClicked(){
    this.emailSelect = false;
    this.hardCopy = true; 
    this.fileUpload = false;

  }

  fileUploadClicked(){
    this.emailSelect = false;
    this.hardCopy = false; 
    this.fileUpload = true;
  }

  showAdditionalNumber(){
    this.additionalNumber = !this.additionalNumber;
  }

  handleFileUpload(e: any) {
    const file = e.target.files[0];
    if (!this.allowedFiled.includes(file.type)) {
		  alert("Invalid format! Please select only correct file type");

		  return;
		} else {
      this.selectedFile = e.target.files[0].name
      this.selectedFileList.push(file)
    }
  }

  cancel(){

  }
}
