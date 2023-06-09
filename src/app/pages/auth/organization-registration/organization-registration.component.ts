import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { getOrganisationIndustry, getOrganisationIndustrySuccess, getOrganisationSector, getOrganisationSectorSuccess } from 'src/app/store/configuration/action';
import { invokeGetStateAndLGA } from 'src/app/store/institution copy/action';
import { stateLgaSelector } from 'src/app/store/institution copy/selector';
import { registerOrganization, registerOrganizationSuccess, validateOrganizationCode, validateOrganizationCodeSuccess } from 'src/app/store/organization/action';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { environment } from 'src/environments/environment';
import { Country, State, City }  from 'country-state-city';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { resendOTP, resendOTPSuccess } from 'src/app/store/auth/action';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-organization-registration',
  templateUrl: './organization-registration.component.html',
  styleUrls: ['./organization-registration.component.scss']
})
export class OrganizationRegistrationComponent implements OnInit {
  SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  separateDialCode = true;


 
  otplength: any;
  otpValue: any;
  countries = Country.getAllCountries();
  states: any;
  cities: any;
  siteKey: string = environment.recaptchaKey

institutionRegForm!: FormGroup
selectedFile!: null
allowedFiled = ["image/png", "image/jpeg", "application/pdf"];
selectedFileList: any  = []
  showOTPPage: boolean = false;
  stateLGA$ = this.appStore.pipe(select(stateLgaSelector));
  // institutionName$ = this.appStore.pipe(select(institutionRecordSelector));
  lga: any;
  industrtList: any;
  sectorList: any;
  modalId = 'messageModal'

  institutionList: any;
  country: any;
  selectedCountry: any;
  selectedState!: any;
  selectedCity!: any;
  state: any;
  city: any;
  countryCode: any;
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
    this.initInstitutionRegForm()
    this.store.dispatch(getOrganisationIndustry())
    this.actions$.pipe(ofType(getOrganisationIndustrySuccess)).subscribe((res: any) => {
      this.industrtList = res.payload
    })
    this.store.dispatch(getOrganisationSector())
    this.actions$.pipe(ofType(getOrganisationSectorSuccess)).subscribe((res: any) => {
      this.sectorList = res.payload

    })
    
    this.store.dispatch(
      invokeGetStateAndLGA()
    );
    

  }

  initInstitutionRegForm() {
    this.institutionRegForm = this.fb.group({
      // institutionBody: ['', Validators.required],
      Name : ['', Validators.required],
      EmailAddress: ['', [Validators.required, Validators.email]],
      PhoneNumber : [null, Validators.required],
      City: [null, Validators.required],
      Country: [null, Validators.required],
      State: [null, Validators.required],
      Address : ['', Validators.required],
      OrganizationSectorId: [null, Validators.required],
      OrganizationIndustryId: [null, Validators.required],
      RegisteringBody: ['', Validators.required],
      DateOfIncorporation: ['', Validators.required],
      CAC: [''],
      recaptchaReactive: [null, Validators.required],
      Title: [''],
      FirstName: [''],
      LastName: [''],
      Designation: [''],
      consent: [false, Validators.requiredTrue],
      nspm: [false, Validators.requiredTrue],
      fileList: [null, [Validators.required, Validators.minLength(1)]],

    })
  }

 
  onCountryChange(event: any): void {
    this.countryCode = JSON.parse(event).isoCode
    this.states = State.getStatesOfCountry(JSON.parse(event).isoCode);
    this.selectedCountry = JSON.parse(event);
    this.institutionRegForm.controls['Country'].setValue(this.selectedCountry.name)
    
    // this.cities = this.selectedState = this.selectedCity = null;
  }
  
  onStateChange(event: any): void {
    this.cities = City.getCitiesOfState(this.countryCode, JSON.parse(event).isoCode)
    this.selectedState = JSON.parse(event);
    this.institutionRegForm.controls['State'].setValue(this.selectedState.name)
    
  }
  
  onCityChange(event: any): void {
    this.selectedCity = JSON.parse(event)
    this.institutionRegForm.controls['City'].setValue(this.selectedCity.name)

  }




  changeRegistrationType(event: any) {
    if (event.target.value === 'CAC' ) {
      this.institutionRegForm.controls['RegisteringBody'].setValue('CAC')
    } else {
      this.institutionRegForm.controls['RegisteringBody'].setValue('')
    }
  }

  selectLocalGovt(stateId: any) {
    this.stateLGA$.subscribe((x) => {
      const data = x.find((value: any) => value.id == Number(stateId));
      
      this.institutionRegForm.controls['State'].setValue(data.name)
      this.lga = data.lgaVMs;
    });
  }
  saveLocalGovt(id: any) {
    this.stateLGA$.subscribe((x) => {
    });
    const data = this.lga.find((value: any) => value.id == Number(id));
    this.institutionRegForm.controls['Lga'].setValue(data.name)
    this.lga = data.lgaVMs;
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
      this.institutionRegForm.patchValue({
        fileList: this.selectedFileList,
      });
      this.institutionRegForm.get('fileList')?.updateValueAndValidity();
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
    this.institutionRegForm.patchValue({
      fileList: this.selectedFileList,
    });
  }

  public resolved(captchaResponse: string): void {
    this.institutionRegForm.controls['recaptchaReactive'].setValue(captchaResponse)
  }

  continueCreation() {
    const data = {
      approvalFile : this.selectedFileList, ...this.institutionRegForm.value
    }
    this.store.dispatch(registerOrganization({payload: data}))
    this.actions$.pipe(ofType(registerOrganizationSuccess)).subscribe((res: any) => {
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
      userName: EmailAddress,
      code: this.otpValue
    }
    
    this.store.dispatch(validateOrganizationCode({payload}))
    this.actions$.pipe(ofType(validateOrganizationCodeSuccess)).subscribe((res: any) => {
      if (res.payload.hasErrors === false) {
        document.getElementById('myModal')?.click()
        this.showOTPPage = true;
        // this.router.navigateByUrl('/')
      }
    })
  }
  
  continue() {
    document.getElementById('myModal')?.click()
    this.router.navigateByUrl('/auth/organization')

  }
 
  resendOTP() {
    const {EmailAddress} = this.institutionRegForm.value

    this.store.dispatch(resendOTP({email: EmailAddress}))
    this.actions$.pipe(ofType(resendOTPSuccess)).subscribe((res: any) => {
      if (res.message.hasErrors === false) {
        this.notification.publishMessages('success', res.message.description)
        this.timer(10)

      }
    })
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
