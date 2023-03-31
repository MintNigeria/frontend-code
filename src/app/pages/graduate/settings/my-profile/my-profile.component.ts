import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { invokeGetStateAndLGA } from 'src/app/store/institution copy/action';
import { stateLgaSelector } from 'src/app/store/institution copy/selector';
import { invokeGetInstitution, invokeGetInstitutionSuccess, updatedInstitution, updatedInstitutionSuccess } from 'src/app/store/institution/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

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

    this.institutionId = this.institutionData.InstitutionId
    this.store.dispatch(invokeGetInstitution({id: this.institutionId}))
    this.actions$.pipe(ofType(invokeGetInstitutionSuccess)).subscribe((res: any) => {
      ////console.log(res)
      this.populateForm(res.payload)
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
      name: ['', Validators.required],
      type: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      state: ['', Validators.required],
      lga: ['', Validators.required],
      gender: ['', Validators.required],
      lgaId: [''],
      stateId: [''],
      address: ['', Validators.required],
      sector: ['', Validators.required],
      establishment: ['', Validators.required],
      regNumber: ['',Validators.required],
      twitter: [''],
      facebook: [''],
      linkedIn: [''],
      socialMedia: [''],
      logo: [null]
    })
  }

  populateForm(data: any) {
    this.profileForm.patchValue({
      name: data.institutionName,
      sector: data.institutionSector,
      establishment: '02-02-1967',
      type: 'CAC',
      regNumber: data.rcNumber,
      email: data.emailAddress,
      phone: data.phoneNumber,
      state: data.state,
      lga: data.lga,
      address: data.address,
      gender: 'male',
      twitter: 'twitter.com/',
      facebook:'facebook.com/',
      linkedIn: 'linkedin.com/',
      socialMedia: 'ciroma',
      
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
      this.profileForm.controls['logo'].setValue(file)

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

  selectLocalGovt(data: any) {
    console.log(data)
    this.stateLGA$.subscribe((x) => {
      const record = x.find((value: any) => value.id == Number(data.id));
      this.profileForm.controls['state'].setValue(data.id)
  
  
      this.lga = record.lgaVMs;
    });
  }
  selectLga(data: any) {
    this.profileForm.controls['lga'].setValue(data.id)
    
  }

  saveUpdates() {
    const {lga, state, address, logo, phone } = this.profileForm.value;
    const payload = {
      imei: '',
      serialNumber: '',
      device: this.deviceModel,
      ipAddress: this.ipAddress,
      lga,
      state,
      address,
      logo,
      phone
    }
    this.store.dispatch(updatedInstitution({payload, id: this.institutionId}))
    this.actions$.pipe(ofType(updatedInstitutionSuccess)).subscribe((res: any) => {
      console.log(res)
      document.getElementById('confirmChanges')?.click();
      this.notification.publishMessages('success', res.payload.payload)

    })
  }


}
