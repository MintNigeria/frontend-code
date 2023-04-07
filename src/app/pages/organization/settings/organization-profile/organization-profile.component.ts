import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { invokeGetStateAndLGA } from 'src/app/store/institution copy/action';
import { stateLgaSelector } from 'src/app/store/institution copy/selector';
import { organizationProfile, organizationProfileSuccess, updateOrganization, updateOrganizationSuccess } from 'src/app/store/organization/action';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { Country, State, City }  from 'country-state-city';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';


@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.scss']
})
export class OrganizationProfileComponent implements OnInit {
  countries = Country.getAllCountries();
  states: any;
  cities: any;

 profileForm!: FormGroup
  selectedFile!: null
  allowedFiled = ["image/png", "image/jpeg", "application/pdf"];

  confirmChanges = 'confirmChanges';
  changesConfirmed = 'changesConfirmed';
  userData: any;
  lga: any;

  selectedCountry: any;
  selectedState!: any;
  selectedCity!: any;
  state: any;
  city: any;
  countryCode: any;
  deviceModel: string;
  ipAddress: any;
  profileImage: any;

  constructor(
    private fb: FormBuilder,
    private appStore: Store<AppStateInterface>,
    private store: Store,
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
    const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)
    this.initProfileForm()
    this.store.dispatch(
      invokeGetStateAndLGA()
      );
      this.loadIp();

    this.store.dispatch(organizationProfile({id: this.userData.OrganizationId }))
    this.actions$.pipe(ofType(organizationProfileSuccess)).subscribe((res: any) => {
      //console.log(res)
      
      setTimeout(() => {
        this.profileImage = res.payload.payload.logo;
        this.populateForm(res.payload.payload)
      }, 2000);
    })
  }

  loadIp() {
    this.utilityService.getuserIP().subscribe((res: any) => {
     this.ipAddress = res.ip
    })
  }
  initProfileForm() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      address: ['', Validators.required],
      sector: ['', Validators.required],
      establishment: ['', Validators.required],
      regNumber: ['',Validators.required],
      file: [null]
    })
  }

  populateForm(data: any) {
    this.profileForm.patchValue({
      name: data.name,
      sector: data.organizationSector,
      establishment: data?.dateOfInCorporation,
      type: data.registeringBody,
      regNumber: data.cac,
      email: data.email,
      phone: data.phoneNumber,
      country: data.country,
      city: data.city,
      state: data.state,
      address: data.address,
    })
  }

  handleFileUpload(e: any) {
    const file = e.target.files[0];
    ////console.log(file)
    if (!this.allowedFiled.includes(file.type)) {
		  alert("Invalid format! Please select only correct file type");

		  return;
		} else {
      this.selectedFile = e.target.files[0].name
      this.profileForm.controls['file'].setValue(file)

    }
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

  
  openConfirmChanges() {
    document.getElementById('confirmChanges')?.click();
  }

  cancelConfirmChanges() {
    document.getElementById('confirmChanges')?.click();
  }

  openChangesConfirmed(){
    document.getElementById('changesConfirmed')?.click();
    document.getElementById('confirmChanges')?.click();
  }

  saveUpdates() {
    const {city, state, country, phone, file, address } = this.profileForm.value
    const payload = {
      id: this.userData.OrganizationId,
      imei: '',
      serialNumber: '',
      device: this.deviceModel,
      ipAddress: this.ipAddress,
      city,
      state,
      country,
      phone,
      file,
      address
    }
    this.store.dispatch(updateOrganization({payload}))
    this.actions$.pipe(ofType(updateOrganizationSuccess)).subscribe((res: any) => {
      //console.log(res)
      if (res.payload.hasErrors === false) {
        document.getElementById('confirmChanges')?.click();
        this.notification.publishMessages('success', res.payload.payload)
      }
    })
  }


}
