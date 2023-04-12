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
import { registerNewGraduate, registerNewGraduateSuccess, validateGraduateRegistration, validateGraduateRegistrationSuccess } from 'src/app/store/graduates/action';
import { resendOTP, resendOTPSuccess } from 'src/app/store/auth/action';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
@Component({
  selector: 'app-graduate-registration',
  templateUrl: './graduate-registration.component.html',
  styleUrls: ['./graduate-registration.component.scss']
})
export class GraduateRegistrationComponent implements OnInit {
  institutionType$ = this.appStore.pipe(select(institutionTypeSelector));
  institutionSectors$ = this.appStore.pipe(select(institutionSectorSelector));
  institutionBody$ = this.appStore.pipe(select(institutionBodySelector));

  institutionName$ = this.appStore.pipe(select(institutionRecordSelector));

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
  filter: any = {
    InstitutionBodyId: '',
    InstitutionTypeId: '',
    SectorId: '',
  }
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
    this.store.dispatch(
      getInstitutionSector()
    );
    this.store.dispatch(
      getInstitutionTypes()
    );
    this.store.dispatch(
      getInstitutionBody()
    );
    
    	// const countries = Country?.getAllCountries()
      // //console.log(contries)

  }

  initInstitutionRegForm() {
    this.institutionRegForm = this.fb.group({
      // institutionBody: ['', Validators.required],
      FirstName  : ['', Validators.required],
      LastName   : ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber : ['',[Validators.pattern(/^(\+?234|0)[789]\d{9}$/)]],
      Address : ['', Validators.required],
      Gender: ['', Validators.required],
      City: [null, Validators.required],
      Country: [null, Validators.required],
      State: [null, Validators.required],
      ZipCode: [null, Validators.required],
      IdType: [null, Validators.required],
      IdNumber: ['', Validators.required],
      institutionBodyId: [null, Validators.required],
      institutionTypeId: [null, Validators.required],
      institutionSectorId: [null, Validators.required],
      InstitutionName: [null, Validators.required],
      recaptchaReactive: [null],
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

  deleteFile(index: number){
    this.selectedFileList.splice(index, 1);
  }

  selectInstitutionBody(event: any) {
    const filter = {...this.filter, ['InstitutionBodyId'] : event.id}
    this.filter = filter;
    this.institutionRegForm.controls['institutionBodyId'].setValue(event.name)
  }
  selectInstitutionType(event: any) {
    const filter = {...this.filter, ['InstitutionTypeId'] : event.id}
    this.filter = filter;
    this.institutionRegForm.controls['institutionTypeId'].setValue(event.name)
    
  }
  selectInstitutionSector(event: any) {
    const filter = {...this.filter, ['SectorId'] : event.id}
    this.filter = filter;
    this.store.dispatch(getAllInstitutionRecords({payload: this.filter}))
    this.actions$.pipe(ofType(getAllInstitutionRecordsSuccess)).subscribe((res: any) => {
      ////console.log(res);
      this.institutionList = res.payload.data
    })
    this.institutionRegForm.controls['institutionSectorId'].setValue(event.name)

  }

  public resolved(captchaResponse: string): void {
    this.institutionRegForm.controls['recaptchaReactive'].setValue(captchaResponse)
  }

  continueCreation() {
    const data = {
      approvalFile : this.selectedFileList, ...this.institutionRegForm.value
    }
    this.store.dispatch(registerNewGraduate({payload: data}))
    this.actions$.pipe(ofType(registerNewGraduateSuccess)).subscribe((res: any) => {
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
    const {Email} = this.institutionRegForm.value
    const payload = {
      userName: Email,
      code: this.otpValue
    }
    
    this.store.dispatch(validateGraduateRegistration({payload}))
    this.actions$.pipe(ofType(validateGraduateRegistrationSuccess)).subscribe((res: any) => {
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
    const {Email} = this.institutionRegForm.value

    this.store.dispatch(resendOTP({email: Email}))
    this.actions$.pipe(ofType(resendOTPSuccess)).subscribe((res: any) => {
      if (res.message.hasErrors === false) {
        this.notification.publishMessages('success', res.message.description)
      }
    })
  }

}
