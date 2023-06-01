import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { resendOTP, resendOTPForInstitution, resendOTPForInstitutionSuccess, resendOTPSuccess } from 'src/app/store/auth/action';
import { invokeGetStateAndLGA } from 'src/app/store/institution copy/action';
import { stateLgaSelector } from 'src/app/store/institution copy/selector';
import { createNewInstitution, createNewInstitutionSuccess, getAllInstitutionRecords, getAllInstitutionRecordsSuccess, getAllInstitutionTypeLinkedToBody, getAllInstitutionTypeLinkedToBodySuccess, getInstitutionBody, getInstitutionSector, getInstitutionSectorSuccess, getInstitutionTypes, ValidateRegistrationCode, ValidateRegistrationCodeSuccess } from 'src/app/store/institution/action';
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
  institutionBodyList: any;
  institutionSectorList: any;
  sectorListData: any;
  currentYear!: string;
  showDefault: boolean = true;
  constructor(
    private fb: FormBuilder,
    private appStore: Store<AppStateInterface>,
    private store: Store,
    private router: Router,
    private actions$  : Actions,
    private notification: NotificationsService
  ) { }

  ngOnInit(): void {
    this.currentYear = new Date().toISOString().slice(0, 10);
    this.initInstitutionRegForm()
    this.store.dispatch(
      getInstitutionSector()
    );
    this.actions$.pipe(ofType(getInstitutionSectorSuccess)).subscribe((res: any) => {
      this.sectorListData = res.payload.data;
      this.institutionSectorList = this.sectorListData;
    })
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
      recaptchaReactive: [null, Validators.required],
      Title: [''],
      FirstName: [''],
      LastName: [''],
      Designation: [''],
      consent: ['', Validators.required],
      nspm: ['', Validators.required],
    })
  }

  selectInstitutionBody(event: any) {
    if (event.name === 'Professional Institution') {
      this.institutionSectorList = [
        {id: '', name: 'Private'}
      ]
    } else {
      this.institutionSectorList = this.sectorListData
    }

    const filter = {...this.filter, ['InstitutionBodyId'] : event.id}
    this.filter = filter;
    this.store.dispatch(getAllInstitutionTypeLinkedToBody({id: event.id}))
    this.actions$.pipe(ofType(getAllInstitutionTypeLinkedToBodySuccess)).subscribe((res: any) => {
      this.institutionBodyList  = res.payload.data
    })
    this.institutionRegForm.controls['institutionBodyId'].setValue(event.id)

  }

  selectInstitutionType(event: any) {
    const filter = {...this.filter, ['InstitutionTypeId'] : event}
    this.filter = filter;
  }

  selectInstitutionSector(event: any) {
    const filter = {...this.filter, ['SectorId'] : event}
    this.filter = filter;
    console.log(this.filter)
    this.store.dispatch(getAllInstitutionRecords({payload: this.filter}))
    this.actions$.pipe(ofType(getAllInstitutionRecordsSuccess)).subscribe((res: any) => {
         // console.log(res);

        this.institutionList = res.payload.data
    })
  }

  changeRegistrationType(event: any) {
    if (event.target.value === 'CAC' ) {
      this.institutionRegForm.controls['RegisteringBody'].setValue('CAC')
      this.institutionRegForm.controls['RegistrationNumber'].setValidators([Validators.pattern('^(rc|RC)+([0-9]{7,7})+$')])
    } else {
      this.institutionRegForm.controls['RegistrationNumber'].clearValidators()
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
      this.showDefault = true;
      this.selectedFile = e.target.files[0].name
      this.selectedFileList.push(file)
    }
  }

  deleteFile(index: number){
    this.showDefault = true;
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
