import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { getAllProcessingFee, getAllProcessingFeeSuccess, getInstitutionConfiguration, getInstitutionConfigurationSuccess } from 'src/app/store/configuration/action';
import { createGraduateApplication, createGraduateApplicationSuccess, getActiveDeliveryOptions, getActiveDeliveryOptionsSuccess } from 'src/app/store/graduates/action';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { Country, State, City }  from 'country-state-city';

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
  selectedFile2!: null
  selectedFile3!: null
  selectedFile4!: null
  selectedFile5!: null
  selectedFile6!: null
allowedFiled = ["image/png", "image/jpeg", "application/pdf"];
// selectedFileList: any  = []
processingFeeList: any;
  deliveryType: any;
  selectedDestination: any;
  hardCopyForm!: FormGroup;
  emailForm!: FormGroup;
  fileUploadForm!: FormGroup;
  countries = Country.getAllCountries();
  states: any;
  cities: any;
  selectedCountry: any;
  selectedState!: any;
  selectedCity!: any;
  state: any;
  city: any;
  countryCode: any;
selectedFileList: any = {
 

}
  academicDetails: any;
  paymentDetailsVM: any;
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
    this.academicDetails = data;
    this.initForm()
    this.initFileUploadForm()
    this.initEmailForm()
    this.initHardCopyForm()
    this.store.dispatch(getInstitutionConfiguration({institutionId: data.institutionId}))
    this.actions$.pipe(ofType(getInstitutionConfigurationSuccess)).subscribe((res: any) => {
      console.log(res)
      this.processingFeeList = res.payload.processingFeesVM
      
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
  initHardCopyForm(){
    this.hardCopyForm = this.fb.group ({
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      phoneNo: [ '' ],
      reasonForRequest: [ '',  Validators.required  ],
      deliveryMethod: [ '',  Validators.required  ],

    })
  }
  initFileUploadForm(){
    this.fileUploadForm = this.fb.group ({
      url: ['', Validators.required],
      loginUser: ['', Validators.required],
      loginPassword: ['', Validators.required],
      phoneNo: ['', Validators.required],
      reasonForRequest: [ '',  Validators.required  ],

    })
  }
  initEmailForm(){
    this.emailForm = this.fb.group ({
      email: ['', Validators.required],
      phoneNo: ['', Validators.required],
      reasonForRequest: [ '',  Validators.required  ],

    })
  }

  originalCertificateClicked(data: any){
    this.store.dispatch(getActiveDeliveryOptions({id: data.id}))
    this.actions$.pipe(ofType(getActiveDeliveryOptionsSuccess)).subscribe((res: any) => {
      this.deliveryType = res.payload
      this.selectedDestination = res.payload.deliveryOption
      console.log(this.selectedDestination)
    })
    // this.certificateOriginal = true;
    // this.certificateTemplate = false;
    // this.certifiedCopy = false;
    // this.transcript = false;
    // this.hardCopyMethod = true;
    // this.fileUploadMethod = false;
    // this.emailUploadMethod = false;
  }
  
  changeDestination(option: any) {
    console.log(option)
    this.paymentDetailsVM = option
    this.selectedDestination = option.deliveryOption
  }

  onCountryChange(event: any): void {
    this.countryCode = JSON.parse(event).isoCode
    this.states = State.getStatesOfCountry(JSON.parse(event).isoCode);
    this.selectedCountry = JSON.parse(event);
    this.hardCopyForm.controls['country'].setValue(this.selectedCountry.name)
    
    // this.cities = this.selectedState = this.selectedCity = null;
  }
  
  onStateChange(event: any): void {
    this.cities = City.getCitiesOfState(this.countryCode, JSON.parse(event).isoCode)
    this.selectedState = JSON.parse(event);
    this.hardCopyForm.controls['state'].setValue(this.selectedState.name)
    
  }
  
  onCityChange(event: any): void {
    this.selectedCity = JSON.parse(event)
    this.hardCopyForm.controls['city'].setValue(this.selectedCity.name)

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

  handleFileUpload(e: any, type: number) {
    const file = e.target.files[0];
    if (!this.allowedFiled.includes(file.type)) {
		  alert("Invalid format! Please select only correct file type");

		  return;
		} else {
      // this.selectedFileList.push(file)
      if (type === 1) {
        this.selectedFileList['whiteBgPassport'] = { name: "White Background Passport Photograph", type: 1, File: file }
        this.selectedFile = e.target.files[0].name
      } else if (type === 2) {
        this.selectedFile2 = e.target.files[0].name
        this.selectedFileList['validIdCard'] = { name: "Copy of Valid Means of Identification", type: 2, File: file }
      } else if (type === 3) {
        this.selectedFile3 = e.target.files[0].name
        this.selectedFileList['studentFinalClearance'] = { name: "Notification of Result", type: 3, File: file }
      } else if (type === 4) {
        this.selectedFile4 = e.target.files[0].name
        this.selectedFileList['notificationOfResult'] = { name: "Notification of Result", type: 5, File: file }
      } else if (type === 5) {
        this.selectedFile5 = e.target.files[0].name
        this.selectedFileList['affidavit'] = { name: "Court Affidavit", type: 5, File: file }
      } if (type === 6) {
        this.selectedFile6 = e.target.files[0].name
        this.selectedFileList['policceReport'] = { name: "Police Report", type: 6, File: file }
      }
    }

    console.log(this.selectedFileList)
  }

  cancel(){

  }

  continue() {
    // routerLink="/graduate/my-applications/new/review-order"
    let data = {}
    if (this.selectedDestination === 1) {

      data = {
        emailVm: this.emailForm.value,
        supportingDocument: this.selectedFileList,
        academicDetails: this.academicDetails,
        paymentDetailsVM: this.paymentDetailsVM
      }
    } else if (this.selectedDestination === 2) {
      data = {
        fileUploadVm: this.fileUploadForm.value,
        supportingDocument: this.selectedFileList,
        academicDetails: this.academicDetails,
        paymentDetailsVM: this.paymentDetailsVM
      }
      
    } else {
      data = {
        hardCopyVm: this.hardCopyForm.value,
        supportingDocument: this.selectedFileList,
        academicDetails: this.academicDetails,
        paymentDetailsVM: this.paymentDetailsVM
      }

    }
    this.store.dispatch(createGraduateApplication({payload: data}))
    this.actions$.pipe(ofType(createGraduateApplicationSuccess)).subscribe((res: any) => {
      console.log(res)
    })

    sessionStorage.setItem('appl_Dt', JSON.stringify(data))
    this.router.navigateByUrl(`/graduate/my-applications/new/review-order`)
    // this.router.navigateByUrl(`/graduate/my-applications/new/review-order${requestId}`)
  }
}
