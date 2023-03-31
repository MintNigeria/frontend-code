import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { getGraduateProfile, getGraduateProfileSuccess, updateGraduateProfile, updateGraduateProfileSuccess } from 'src/app/store/graduates/action';
import { invokeGetStateAndLGA } from 'src/app/store/institution copy/action';
import { stateLgaSelector } from 'src/app/store/institution copy/selector';
import { invokeGetInstitution, invokeGetInstitutionSuccess, updatedInstitution, updatedInstitutionSuccess } from 'src/app/store/institution/action';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { Country, State, City }  from 'country-state-city';
import * as moment from 'moment';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  countries = Country.getAllCountries();
  states: any;
  cities: any;
  profileForm!: FormGroup
  selectedFile!: null
  allowedFiled = ["image/png", "image/jpeg", "application/pdf"];

  confirmChanges = 'confirmChanges';
  changesConfirmed = 'changesConfirmed';
  institutionData: any;
  institutionId: any;
  stateLGA$ = this.appStore.pipe(select(stateLgaSelector));
  lga: any;
  deviceModel: string;
  ipAddress: any;
  profileImage: any;

  selectedCountry: any;
  selectedState!: any;
  selectedCity!: any;
  state: any;
  city: any;
  countryCode: any;
  

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
    private utilityService: UtilityService,
    private notification: NotificationsService


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
    this.initProfileForm()
    const data: any = localStorage.getItem('userData')
    this.institutionData = JSON.parse(data)
    ////console.log(this.institutionData)
    this.loadIp();

    this.institutionId = this.institutionData.GraduateId
    this.store.dispatch(getGraduateProfile({id: this.institutionId}))
    this.actions$.pipe(ofType(getGraduateProfileSuccess)).subscribe((res: any) => {
      console.log(res)
      this.populateForm(res.payload.payload)
      this.profileImage = res.payload.logo;

    })
    this.store.dispatch(
      invokeGetStateAndLGA()
      );
    // setTimeout(() => {
    //   this.populateForm()
    // }, 2000);
  }

  loadIp() {
    this.utilityService.getuserIP().subscribe((res: any) => {
     this.ipAddress = res.ip
    })
  }
  initProfileForm() {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: ['', Validators.required],
      type: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      lga: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      lgaId: [''],
      zipCode: [''],
      stateId: [''],
      address: ['', Validators.required],
      twitter: [''],
      facebook: [''],
      linkedIn: [''],
      socialMedia: [''],
      profileImage: [null]
    })
  }

  populateForm(data: any) {
    this.profileForm.patchValue({
      firstName: data?.firstName,
      lastName: data?.lastName,
      middleName: data?.middleName,
      email: data?.email,
      phone: data?.phoneNumber,
      state: data?.state,
      country: data?.country,
      dateOfBirth: moment(data?.dateOfBirth).format('YYYY-MM-DD'),
      city: data?.city,
      address: data?.address,
      zipCode: data?.zipCode,
      gender: data?.gender,
      twitter: data?.twitter,
      facebook: data?.facebook,
      linkedIn: data?.linkedIn,
      
    })
  }

  onCountryChange(event: any): void {
    this.countryCode = JSON.parse(event).isoCode
    this.states = State.getStatesOfCountry(JSON.parse(event).isoCode);
    this.selectedCountry = JSON.parse(event);
    this.profileForm.controls['country'].setValue(this.selectedCountry.name)
    
    // this.cities = this.selectedState = this.selectedCity = null;
  }
  
  onStateChange(event: any): void {
    this.cities = City.getCitiesOfState(this.countryCode, JSON.parse(event).isoCode)
    //console.log(this.cities)
    this.selectedState = JSON.parse(event);
    this.profileForm.controls['state'].setValue(this.selectedState.name)
    
  }
  
  onCityChange(event: any): void {
    this.selectedCity = JSON.parse(event)
    this.profileForm.controls['city'].setValue(this.selectedCity.name)

  }

  handleFileUpload(e: any) {
    const file = e.target.files[0];
    ////console.log(file)
    if (!this.allowedFiled.includes(file.type)) {
		  alert("Invalid format! Please select only correct file type");

		  return;
		} else {
      this.selectedFile = e.target.files[0].name
      this.profileForm.controls['ProfileImage'].setValue(file)

    }
  }

  
  openConfirmChanges() {
    document.getElementById('confirmChanges')?.click();
  }

  cancelConfirmChanges() {
    document.getElementById('confirmChanges')?.click();
  }

  openChangesConfirmed(){
    // document.getElementById('changesConfirmed')?.click();
    document.getElementById('confirmChanges')?.click();
  }


  saveUpdates() {
    const {firstName, lastName, email, phone, state, country, dateOfBirth, city, address, zipCode, twitter, facebook, linkedIn, profileImage } = this.profileForm.value;
    const payload = {
      imei: '',
      serialNumber: '',
      device: this.deviceModel,
      ipAddress: this.ipAddress,
      firstName, lastName, email, phone, state, country, dateOfBirth, city, address, zipCode, twitter, facebook, linkedIn, profileImage 
    }
    this.store.dispatch(updateGraduateProfile({payload}))
    this.actions$.pipe(ofType(updateGraduateProfileSuccess)).subscribe((res: any) => {
      console.log(res)
      document.getElementById('confirmChanges')?.click();
      this.notification.publishMessages('success', res.payload.payload)

    })
  }


}
