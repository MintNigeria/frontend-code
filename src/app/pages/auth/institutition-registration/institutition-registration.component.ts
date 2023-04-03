import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { resendOTP, resendOTPSuccess } from 'src/app/store/auth/action';
import { invokeGetStateAndLGA } from 'src/app/store/institution copy/action';
import { stateLgaSelector } from 'src/app/store/institution copy/selector';
import { createNewInstitution, createNewInstitutionSuccess, getAllInstitutionRecords, getAllInstitutionRecordsSuccess, getInstitutionBody, getInstitutionSector, getInstitutionTypes, ValidateRegistrationCode, ValidateRegistrationCodeSuccess } from 'src/app/store/institution/action';
import { institutionTypeSelector, institutionSectorSelector, institutionBodySelector, institutionRecordSelector } from 'src/app/store/institution/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-institutition-registration',
  templateUrl: './institutition-registration.component.html',
  styleUrls: ['./institutition-registration.component.scss']
})
export class InstitutitionRegistrationComponent implements OnInit {
  otplength: any;
  otpValue: any;
  modalId = 'messageModal'

  siteKey: string = environment.recaptchaKey

institutionRegForm!: FormGroup
selectedFile!: null
allowedFiled = ["image/png", "image/jpeg", "application/pdf"];
selectedFileList: any  = []
  showOTPPage: boolean = false;
  institutionType$ = this.appStore.pipe(select(institutionTypeSelector));
  institutionSectors$ = this.appStore.pipe(select(institutionSectorSelector));
  institutionBody$ = this.appStore.pipe(select(institutionBodySelector));
  stateLGA$ = this.appStore.pipe(select(stateLgaSelector));
  institutionName$ = this.appStore.pipe(select(institutionRecordSelector));
  lga: any;
filter: any = {
  InstitutionBodyId: '',
  InstitutionTypeId: '',
  SectorId: '',
}
  institutionList: any;
  constructor(
    private fb: FormBuilder,
    private appStore: Store<AppStateInterface>,
    private store: Store,
    private router: Router,
    private actions$  : Actions
  ) { }

  ngOnInit(): void {
    this.initInstitutionRegForm()
    this.store.dispatch(
      getInstitutionSector()
    );
    this.store.dispatch(
      getInstitutionTypes()
    );
    this.store.dispatch(
      getInstitutionBody()
    );
    this.store.dispatch(
      invokeGetStateAndLGA()
    );
    
  }

  initInstitutionRegForm() {
    this.institutionRegForm = this.fb.group({
      // institutionBody: ['', Validators.required],
      RegisteringBody : ['', Validators.required],
      institutionBodyId: [null, Validators.required],
      institutionTypeId: [null, Validators.required],
      institutionSectorId: [null, Validators.required],
      InstitutionName: [null, Validators.required],
      DateOfIncorporation: [''],
      RegistrationNumber: [''],
      LgaId: [null, Validators.required],
      StateId: [null, Validators.required],
      EmailAddress: ['', [Validators.required, Validators.email]],
      PhoneNumber : ['', [Validators.pattern(/^(\+?234|0)[789]\d{9}$/)]],
      Street : ['', Validators.required],
      recaptchaReactive: [null],
      Title: [''],
      FirstName: [''],
      LastName: [''],
      Designation: [''],
      consent: ['', Validators.required],
      nspm: ['', Validators.required],
    })
  }

  selectInstitutionBody(event: any) {
    const filter = {...this.filter, ['InstitutionBodyId'] : event}
    this.filter = filter;
  }
  selectInstitutionType(event: any) {
    const filter = {...this.filter, ['InstitutionTypeId'] : event}
    this.filter = filter;
  }

  selectInstitutionSector(event: any) {
    const filter = {...this.filter, ['SectorId'] : event}
    this.filter = filter;
    this.store.dispatch(getAllInstitutionRecords({payload: this.filter}))
    this.actions$.pipe(ofType(getAllInstitutionRecordsSuccess)).subscribe((res: any) => {
         // console.log(res);

        this.institutionList = res.payload.data
    })
  }

  changeRegistrationType(event: any) {
    if (event.target.value === 'CAC' ) {
      this.institutionRegForm.controls['RegisteringBody'].setValue('CAC')
    } else {
      this.institutionRegForm.controls['RegisteringBody'].setValue('')
    }
  }

  selectLocalGovt(stateId: any) {
    // const id = stateId.target.value;
    // ////console.log(value)
    this.stateLGA$.subscribe((x) => {
      const data = x.find((value: any) => value.id == Number(stateId));
     

      this.lga = data.lgaVMs;
      ////console.log(data);
    });
  }

  handleFileUpload(e: any) {
    const file = e.target.files[0];
    ////console.log(file)
    if (!this.allowedFiled.includes(file.type)) {
		  alert("Invalid format! Please select only correct file type");

		  return;
		} else {
      this.selectedFile = e.target.files[0].name
      this.selectedFileList.push(file)
    }
  }

  deleteFile(index: number){
    this.selectedFileList.splice(index, 1);
  }

  public resolved(captchaResponse: string): void {
    ////console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.institutionRegForm.controls['recaptchaReactive'].setValue(captchaResponse)
  }

  continueCreation() {
    const data = {
      approvalFile : this.selectedFileList, ...this.institutionRegForm.value
    }
    ////console.log(data, this.institutionRegForm)
    this.store.dispatch(createNewInstitution({payload: data}))
    this.actions$.pipe(ofType(createNewInstitutionSuccess)).subscribe((res: any) => {
      if (res.payload.hasErrors === false) {
        this.showOTPPage = true;
      }
    })
  }
  onOtpChange(event: any) {
    this.otplength = event
    this.otpValue = event;
  }

  verifyOTP() {
   const {EmailAddress} = this.institutionRegForm.value
    const payload = {
      email: EmailAddress,
      code: this.otpValue
    }

    this.store.dispatch(ValidateRegistrationCode({payload}))
    this.actions$.pipe(ofType(ValidateRegistrationCodeSuccess)).subscribe((res: any) => {
      if (res.payload.hasErrors === false) {
        document.getElementById('myModal')?.click()

        this.showOTPPage = true;
      }
    })
  }

  resendOTP() {
    const {EmailAddress} = this.institutionRegForm.value

    this.store.dispatch(resendOTP({email: EmailAddress}))
    this.actions$.pipe(ofType(resendOTPSuccess)).subscribe((res: any) => {
      if (res.message.hasErrors === false) {
        console.log('res', res)
      }
    })
  }
  
  continue() {
    document.getElementById('myModal')?.click()
    this.router.navigateByUrl('/')

  }
 

}
