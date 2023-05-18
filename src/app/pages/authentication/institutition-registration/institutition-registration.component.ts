import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { InstitutionService } from 'src/app/core/services/institution/institution.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { resendOTP, resendOTPForInstitution, resendOTPForInstitutionSuccess, resendOTPSuccess } from 'src/app/store/auth/action';
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
  // institutionType$ = this.appStore.pipe(select(institutionTypeSelector));
  // institutionSectors$ = this.appStore.pipe(select(institutionSectorSelector));
  // institutionBody$ = this.appStore.pipe(select(institutionBodySelector));
  // stateLGA$ = this.appStore.pipe(select(stateLgaSelector));
  // institutionName$ = this.appStore.pipe(select(institutionRecordSelector));
  lga: any;
filter: any = {
  InstitutionBodyId: '',
  InstitutionTypeId: '',
  SectorId: '',
}
  institutionList: any;
  institutionTypeList: any;
  institutionSectorList: any;
  institutionBodyList: any;
  stateLGAList: any;
  constructor(
    private fb: FormBuilder,
    private appStore: Store<AppStateInterface>,
    private store: Store,
    private router: Router,
    private actions$  : Actions,
    private notification: NotificationsService,
    private institutionService: InstitutionService,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.initInstitutionRegForm()
    // this.store.dispatch(
    //   getInstitutionSector()
    // );
    // this.store.dispatch(
    //   getInstitutionTypes()
    // );
    // this.store.dispatch(
    //   getInstitutionBody()
    // );
    // this.store.dispatch(
    //   invokeGetStateAndLGA()
    // );
    this.getInstitutionSector()
    this.getInstitutionTypes()
    this.getInstitutionBody()
    this.getStateAndLGA()
  }

  getInstitutionTypes() {
    this.institutionService.getAllInstitutionType().subscribe((res: any) => {
      this.institutionTypeList = res.payload;
    })
  }

  getInstitutionSector() {
    this.institutionService.getAllInstitutionSector().subscribe((res: any) => {
      this.institutionSectorList = res.payload;
    })
  }

  getInstitutionBody() {
    this.institutionService.getAllInstitutionBody().subscribe((res: any) => {
      this.institutionBodyList = res.payload;
    })
  }

  getStateAndLGA() {
    this.utilityService.getLocalGovernment().subscribe((res: any) => {
      this.stateLGAList = res.payload;
    })
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
    this.institutionService.getAllInstitutionRecords(this.filter).subscribe((res: any) => {
      // console.log(res)
      this.institutionList = res.payload
    })
    // this.store.dispatch(getAllInstitutionRecords({payload: this.filter}))
    // this.actions$.pipe(ofType(getAllInstitutionRecordsSuccess)).subscribe((res: any) => {
    //      // console.log(res);

    // })
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
    const data = this.stateLGAList.find((value: any) => value.id == Number(stateId));
    this.lga = data.lgaVMs;
    
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
        this.notification.publishMessages('success', 'Registration successful')
        this.showOTPPage = true;
        this.timer(10)

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
    
    this.store.dispatch(resendOTPForInstitution({email: EmailAddress}))
    this.actions$.pipe(ofType(resendOTPForInstitutionSuccess)).subscribe((res: any) => {
      if (res.message.hasErrors === false) {
        this.notification.publishMessages('success', res.message.description)
        this.timer(10)
      }
    })
  }
  
  continue() {
    document.getElementById('myModal')?.click()
    this.router.navigateByUrl('/auth/institution')

  }

  timeDisplay!: string;
  hideResend: boolean = false;

  timer(minute: any) {
    // let min = minute;
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;  

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.timeDisplay = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      if (seconds == 0 ) {
        clearInterval(timer);
        this.hideResend = true;
      } else {
        this.hideResend = false;

      }
    }, 1000);
  }
 

}
