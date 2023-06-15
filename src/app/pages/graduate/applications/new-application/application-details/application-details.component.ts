import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { getAllProcessingFee, getAllProcessingFeeSuccess, getInstitutionConfiguration, getInstitutionConfigurationSuccess } from 'src/app/store/configuration/action';
import { createGraduateApplication, createGraduateApplicationSuccess, getActiveDeliveryOptions, getActiveDeliveryOptionsSuccess } from 'src/app/store/graduates/action';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { Country, State, City } from 'country-state-city';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { GraduatesService } from 'src/app/core/services/graduates/graduates.service';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent implements OnInit {
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  separateDialCode = true;

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
    whiteBgPassport: null,
    validIdCard: null,
    studentFinalClearance: null,
    notificationOfResult: null,
    affidavit: null,
    policceReport: null
  };
  selectedEmailFileList: any = [];
  selectedFileUploadList: any = [];
  selectedHardCopyList: any = [];
  academicDetails: any;
  paymentDetailsVM: any;
  userData: any;
  selectedDocumentType: any;
  selectedDocumentTypeId: any;
  dispatchFee: any;
  newDispatchVM: any;
  showDescription: boolean = false;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private router: Router,
    private actions$: Actions,
    private utilityService: UtilityService,
    private notification: NotificationsService,
    private graduateService: GraduatesService
  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)
    const record: any = sessionStorage.getItem('sel_Ver')
    this.academicDetails = JSON.parse(record);
    this.initForm()
    this.initFileUploadForm()
    this.initEmailForm()
    this.initHardCopyForm()
    this.store.dispatch(getInstitutionConfiguration({ institutionId: this.academicDetails.institutionId }))
    this.actions$.pipe(ofType(getInstitutionConfigurationSuccess)).subscribe((res: any) => {
      this.processingFeeList = res.payload.processingFeesVM
      this.dispatchFee = res.payload.dispatchFeeVMs.map((x: any) => {
        return { fee: x.fee, keyName: x.name.split(' ').join(''), label: x.name }
      })
      // console.log(this.dispatchFee)
    })
    this.emailForm.valueChanges.subscribe(res => {
      console.log(res)
    })

  }

  initForm() {
    this.appDetailsForm = this.fb.group({
      certificate: ['', Validators.required],
      deliveryMethod: ['', Validators.required],
      url: ['', Validators.required],
      loginUser: ['', Validators.required],
      loginPassword: ['', Validators.required],
      phoneNo: [''],
      additionalPhoneNo: ['', Validators.required],
      reasonForRequest: ['', Validators.required],
      fileList: [null, [Validators.required, Validators.minLength(1)]],

    })
  }
  initHardCopyForm() {
    this.hardCopyForm = this.fb.group({
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      phoneNo: ['', Validators.required],
      reasonForRequest: ['', Validators.required],
      dispatchAmount: ['', Validators.required],
      dispatchMethod: ['', Validators.required],
      fileList: [null, [Validators.required, Validators.minLength(2)]],


    })
  }
  initFileUploadForm() {
    this.fileUploadForm = this.fb.group({
      url: ['', Validators.required],
      loginUser: ['', Validators.required],
      loginPassword: ['', Validators.required],
      phoneNo: ['', Validators.required],
      reasonForRequest: ['', Validators.required],
      deliveryMethod: 0,
      fileList: [null, [Validators.required, Validators.minLength(2)]],

    })
  }
  initEmailForm() {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', Validators.required],
      reasonForRequest: ['', Validators.required],
      deliveryMethod: 0,
      fileList: [null, [Validators.required, Validators.minLength(2)]],
    })
  }

  originalCertificateClicked(data: any) {
    // console.log(data)
    this.showDescription = true
    this.selectedDocumentType = data.documentTypeName
    this.selectedDocumentTypeId = data.id
    this.store.dispatch(getActiveDeliveryOptions({ id: data.id }))
    this.actions$.pipe(ofType(getActiveDeliveryOptionsSuccess)).subscribe((res: any) => {
      this.deliveryType = res.payload
      this.selectedDestination = res.payload.deliveryOption
      // console.log(this.selectedDestination)
    })

  }

  changeDestination(option: any) {
    // console.log(option)
    this.paymentDetailsVM = option
    this.selectedDestination = option.deliveryOption
  }

  onCountryChange(event: any): void {
    this.countryCode = JSON.parse(event).isoCode
    this.states = State.getStatesOfCountry(JSON.parse(event).isoCode);
    this.selectedCountry = JSON.parse(event);
    this.hardCopyForm.controls['country'].setValue(this.selectedCountry.name)
    // console.log(this.selectedCountry)
    if (this.selectedCountry.name === 'Nigeria') {
      let data = this.dispatchFee.map((item: any) => {
        if ( item.keyName === "WithinState" || item.keyName === "OutsideStateWithinNigeria") {
          return item
        }
      })
      const a = data.filter(Boolean)
      this.newDispatchVM = a;
      // console.log(this.newDispatchVM)
    } else {
      let newData = this.dispatchFee.map((item: any) => {
        if ( item.keyName !== "WithinState" || item.keyName !== "OutsideStateWithinNigeria") {
          return item
        }
      })
      const list = newData.filter(Boolean)
      this.newDispatchVM = list;
      // console.log(list)

    }

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

  getDispatchData(event: any) {
    console.log(event)
    this.hardCopyForm.controls['dispatchMethod'].setValue(event.label)
    this.hardCopyForm.controls['dispatchAmount'].setValue(event.fee)

  }

  certificateTemplateClicked() {
    this.certificateOriginal = false;
    this.certificateTemplate = true;
    this.certifiedCopy = false;
    this.transcript = false;
    this.fileUploadMethod = true;
    this.emailUploadMethod = true;

  }



  certifiedCopyClicked() {
    this.certificateOriginal = false;
    this.certificateTemplate = false;
    this.certifiedCopy = true;
    this.transcript = false;
  }

  transcriptClicked() {
    this.certificateOriginal = false;
    this.certificateTemplate = false;
    this.certifiedCopy = false;
    this.transcript = true;
  }

  emailClicked() {
    this.emailSelect = true;
    this.hardCopy = false;
    this.fileUpload = false;
  }
  hardCopyClicked() {
    this.emailSelect = false;
    this.hardCopy = true;
    this.fileUpload = false;

  }

  fileUploadClicked() {
    this.emailSelect = false;
    this.hardCopy = false;
    this.fileUpload = true;
  }

  showAdditionalNumber() {
    this.additionalNumber = !this.additionalNumber;
  }

  handleEmailFileUpload(e: any, type: number) {
    const file = e.target.files[0];
    if (!this.allowedFiled.includes(file.type)) {
      alert("Invalid format! Please select only correct file type");

      return;
    } else {
      if (type === 1) {
        this.selectedFile = e.target.files[0].name

        this.selectedEmailFileList.push({
          name: "White Background Passport Photograph",
          type: 1,
          File: file
        })
      } else if (type === 2) {
        this.selectedFile2 = e.target.files[0].name

        this.selectedEmailFileList.push({ name: "Copy of Valid Means of Identification", type: 2, File: file })

      }
      this.emailForm.patchValue({
        fileList: this.selectedEmailFileList,
      });
      this.emailForm.get('fileList')?.updateValueAndValidity();
      console.log(this.selectedEmailFileList)
      const totalSize = this.selectedEmailFileList.map((item: any) => item.File).reduce((accumulator: any, currentFile: any) => accumulator + currentFile.size, 0);
      console.log(totalSize)
      if (totalSize > 5 * 1024 * 1024) { // 5MB in bytes
        this.selectedEmailFileList.pop();
        this.notification.publishMessages('danger', 'Total size of uploaded files exceeds the maximum allowed size of 5MB.')

      }

    }
  }

  handleFileUploadFiles(e: any, type: number) {
    const file = e.target.files[0];
    if (!this.allowedFiled.includes(file.type)) {
      alert("Invalid format! Please select only correct file type");

      return;
    } else {
      if (type === 1) {
        this.selectedFile = e.target.files[0].name
        this.selectedFileUploadList.push({
          name: "White Background Passport Photograph",
          type: 1,
          File: file
        })
      } else if (type === 2) {
        this.selectedFile2 = e.target.files[0].name

        this.selectedFileUploadList.push({ name: "Copy of Valid Means of Identification", type: 2, File: file })

      }
      this.fileUploadForm.patchValue({
        fileList: this.selectedFileUploadList,
      });
      this.fileUploadForm.get('fileList')?.updateValueAndValidity();
      const totalSize = this.selectedFileUploadList.reduce((accumulator: any, currentFile: any) => accumulator + currentFile.size, 0);
      if (totalSize > 5 * 1024 * 1024) { // 5MB in bytes
        this.selectedFileUploadList.pop();
        this.notification.publishMessages('danger', 'Total size of uploaded files exceeds the maximum allowed size of 5MB.')

      }

    }
  }
  handleHardCopyFiles(e: any, type: number) {
    const file = e.target.files[0];
    if (!this.allowedFiled.includes(file.type)) {
      alert("Invalid format! Please select only correct file type");

      return;
    } else {
      if (type === 1) {
        this.selectedFile = e.target.files[0].name
        this.selectedHardCopyList.push({
          name: "White Background Passport Photograph",
          type: 1,
          File: file
        })
      } else if (type === 2) {
        this.selectedFile2 = e.target.files[0].name

        this.selectedHardCopyList.push({ name: "Copy of Valid Means of Identification", type: 2, File: file })
      } else if (type === 3) {
        this.selectedFile3 = e.target.files[0].name
        this.selectedHardCopyList.push({ name: "Student Final Clearance", type: 3, File: file })
      } else if (type === 4) {
        this.selectedFile4 = e.target.files[0].name
        this.selectedHardCopyList.push({ name: "Notification of Result", type: 4, File: file })
      } else if (type === 5) {
        this.selectedFile5 = e.target.files[0].name
        this.selectedHardCopyList.push({ name: "Court Affidavit", type: 5, File: file })
      } else {
        this.selectedFile6 = e.target.files[0].name
        this.selectedHardCopyList.push({ name: "Police Report", type: 6, File: file })

      }
      this.hardCopyForm.patchValue({
        fileList: this.selectedHardCopyList,
      });
      this.hardCopyForm.get('fileList')?.updateValueAndValidity();
      const totalSize = this.selectedHardCopyList.reduce((accumulator: any, currentFile: any) => accumulator + currentFile.size, 0);
      if (totalSize > 5 * 1024 * 1024) { // 5MB in bytes
        this.selectedHardCopyList.pop();
        this.notification.publishMessages('danger', 'Total size of uploaded files exceeds the maximum allowed size of 5MB.')

      }

    }
  }


  cancel() {

  }

  // continue() {
  //   let data = {}
  //   if (this.selectedDestination === 1) {

  //     data = {
  //       emailOptionVM: [this.emailForm.value],
  //       supportingDocument: this.selectedEmailFileList,
  //       academicDetails: { ...this.academicDetails, GraduateId: this.userData.GraduateId },
  //       paymentDetailsVM: { ...this.paymentDetailsVM, documentType: this.selectedDocumentType, documentId: this.selectedDocumentTypeId }
  //     }
  //   } else if (this.selectedDestination === 2) {
  //     data = {
  //       fileUploadOptionVM: [this.fileUploadForm.value],
  //       supportingDocument: this.selectedFileList,
  //       academicDetails: { ...this.academicDetails, GraduateId: this.userData.GraduateId },
  //       paymentDetailsVM: { ...this.paymentDetailsVM, documentType: this.selectedDocumentType, documentId: this.selectedDocumentTypeId }
  //     }

  //   } else if (this.selectedDestination === 3) {
  //     data = {
  //       hardCopyOptionVM: [this.hardCopyForm.value],
  //       supportingDocument: this.selectedFileList,
  //       academicDetails: { ...this.academicDetails, GraduateId: this.userData.GraduateId },
  //       paymentDetailsVM: { ...this.paymentDetailsVM, documentType: this.selectedDocumentType, documentId: this.selectedDocumentTypeId }
  //     }

  //   }


  //   console.log(data)
  //   this.store.dispatch(createGraduateApplication({ payload: data }))
  //   this.actions$.pipe(ofType(createGraduateApplicationSuccess)).subscribe((res: any) => {
  //     if (res.payload.hasErrors === false) {

  //       // this.notification.publishMessages('success', res.payload.description)
  //       sessionStorage.setItem('app_Data', JSON.stringify(res.payload.payload))
  //       this.router.navigateByUrl(`/graduate/my-applications/new/review-order/${res.payload.payload.requestId}`)
  //       sessionStorage.setItem('appl_Dt', JSON.stringify(data))
  //     }
  //   })

  // }
  continueEmailProcess() {
    const data = {
      emailOptionVM: [this.emailForm.value],
      supportingDocument: this.selectedEmailFileList,
      academicDetails: { ...this.academicDetails, GraduateId: this.userData.GraduateId },
      paymentDetailsVM: { ...this.paymentDetailsVM, documentType: this.selectedDocumentType, documentId: this.selectedDocumentTypeId }
    }


    this.graduateService.createGraduateApplicationEmail(data).subscribe((res: any) => {
      if (res.hasErrors === false) {

        this.notification.publishMessages('success', res.description)
        sessionStorage.setItem('app_Data', JSON.stringify(res.payload))
        this.router.navigateByUrl(`/graduate/my-applications/new/review-order/${res.payload.requestId}`)
        sessionStorage.setItem('appl_Dt', JSON.stringify(data))
      }
    })
  }
  continueFileUploadProcess() {
    const data = {
      fileUploadOptionVM: [this.fileUploadForm.value],
      supportingDocument: this.selectedFileUploadList,
      academicDetails: { ...this.academicDetails, GraduateId: this.userData.GraduateId },
      paymentDetailsVM: { ...this.paymentDetailsVM, documentType: this.selectedDocumentType, documentId: this.selectedDocumentTypeId }
    }


    this.graduateService.createGraduateApplicationFileUpload(data).subscribe((res: any) => {
      if (res.hasErrors === false) {

        this.notification.publishMessages('success', res.description)
        sessionStorage.setItem('app_Data', JSON.stringify(res.payload))
        this.router.navigateByUrl(`/graduate/my-applications/new/review-order/${res.payload.requestId}`)
        sessionStorage.setItem('appl_Dt', JSON.stringify(data))
      }
    })
  }
  continueHardCopyProcess() {
    const data = {
      hardCopyOptionVM: [this.hardCopyForm.value],
      supportingDocument: this.selectedHardCopyList,
      academicDetails: { ...this.academicDetails, GraduateId: this.userData.GraduateId },
      paymentDetailsVM: { ...this.paymentDetailsVM, documentType: this.selectedDocumentType, documentId: this.selectedDocumentTypeId }
    }

    this.graduateService.createGraduateApplicationHardCopy (data).subscribe((res: any) => {
      if (res.hasErrors === false) {

        this.notification.publishMessages('success', res.description)
        sessionStorage.setItem('app_Data', JSON.stringify(res.payload))
        this.router.navigateByUrl(`/graduate/my-applications/new/review-order/${res.payload.requestId}`)
        sessionStorage.setItem('appl_Dt', JSON.stringify(data))
      }
    })
  }
}
