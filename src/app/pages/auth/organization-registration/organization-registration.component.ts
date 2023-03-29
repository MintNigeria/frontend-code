import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { getOrganisationIndustry, getOrganisationIndustrySuccess, getOrganisationSector, getOrganisationSectorSuccess } from 'src/app/store/configuration/action';
import { invokeGetStateAndLGA } from 'src/app/store/institution copy/action';
import { stateLgaSelector } from 'src/app/store/institution copy/selector';
import { createNewInstitution, createNewInstitutionSuccess, getAllInstitutionRecords, getAllInstitutionRecordsSuccess, getInstitutionBody, getInstitutionSector, getInstitutionTypes, ValidateRegistrationCode, ValidateRegistrationCodeSuccess } from 'src/app/store/institution/action';
import { institutionTypeSelector, institutionSectorSelector, institutionBodySelector, institutionRecordSelector } from 'src/app/store/institution/selector';
import { registerOrganization, registerOrganizationSuccess, validateOrganizationCode, validateOrganizationCodeSuccess } from 'src/app/store/organization/action';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { environment } from 'src/environments/environment';
import { Country, State, City }  from 'country-state-city';

@Component({
  selector: 'app-organization-registration',
  templateUrl: './organization-registration.component.html',
  styleUrls: ['./organization-registration.component.scss']
})
export class OrganizationRegistrationComponent implements OnInit {
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
  institutionType$ = this.appStore.pipe(select(institutionTypeSelector));
  institutionSectors$ = this.appStore.pipe(select(institutionSectorSelector));
  institutionBody$ = this.appStore.pipe(select(institutionBodySelector));
  stateLGA$ = this.appStore.pipe(select(stateLgaSelector));
  institutionName$ = this.appStore.pipe(select(institutionRecordSelector));
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
  constructor(
    private fb: FormBuilder,
    private appStore: Store<AppStateInterface>,
    private store: Store,
    private router: Router,
    private actions$  : Actions
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
      getInstitutionBody()
    );
    this.store.dispatch(
      invokeGetStateAndLGA()
    );
    
    	// const countries = Country?.getAllCountries()
      // //console.log(contries)

  }

  initInstitutionRegForm() {
    this.institutionRegForm = this.fb.group({
      // institutionBody: ['', Validators.required],
      Name : ['', Validators.required],
      EmailAddress: ['', [Validators.required, Validators.email]],
      PhoneNumber : ['', Validators.required],
      City: [null, Validators.required],
      Country: [null, Validators.required],
      State: [null, Validators.required],
      Address : ['', Validators.required],
      OrganizationSectorId: [null, Validators.required],
      OrganizationIndustryId: [null, Validators.required],
      RegisteringBody: ['', Validators.required],
      DateOfIncorporation: ['', Validators.required],
      CAC: [''],
      recaptchaReactive: [null],
      Title: [''],
      FirstName: [''],
      LastName: [''],
      Designation: [''],
      consent: ['', Validators.required],
      nspm: ['', Validators.required],
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
      this.selectedFile = e.target.files[0].name
      this.selectedFileList.push(file)
    }
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

  }

}
