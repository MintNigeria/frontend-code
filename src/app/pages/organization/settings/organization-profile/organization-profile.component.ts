import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { invokeGetStateAndLGA } from 'src/app/store/institution copy/action';
import { stateLgaSelector } from 'src/app/store/institution copy/selector';
import { organizationProfile, organizationProfileSuccess } from 'src/app/store/organization/action';
import { AppStateInterface } from 'src/app/types/appState.interface';


@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.scss']
})
export class OrganizationProfileComponent implements OnInit {
  stateLGA$ = this.appStore.pipe(select(stateLgaSelector));

 profileForm!: FormGroup
  selectedFile!: null
  allowedFiled = ["image/png", "image/jpeg", "application/pdf"];

  confirmChanges = 'confirmChanges';
  changesConfirmed = 'changesConfirmed';
  userData: any;
  lga: any;

  

  constructor(
    private fb: FormBuilder,
    private appStore: Store<AppStateInterface>,
    private store: Store,
    private actions$: Actions,
  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)
    this.initProfileForm()
    this.store.dispatch(
      invokeGetStateAndLGA()
      );
    this.store.dispatch(organizationProfile({id: this.userData.OrganizationId }))
    this.actions$.pipe(ofType(organizationProfileSuccess)).subscribe((res: any) => {
      console.log(res)
      
      setTimeout(() => {
        this.populateForm(res.payload.payload)
      }, 2000);
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
      address: ['', Validators.required],
      sector: ['', Validators.required],
      establishment: ['', Validators.required],
      regNumber: ['',Validators.required]
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
      state: data.state,
      lga: data.lga,
      address: data.address,
    })
  }

  handleFileUpload(e: any) {
    const file = e.target.files[0];
    //console.log(file)
    if (!this.allowedFiled.includes(file.type)) {
		  alert("Invalid format! Please select only correct file type");

		  return;
		} else {
      this.selectedFile = e.target.files[0].name
    }
  }

  selectLocalGovt(stateId: any) {
    this.stateLGA$.subscribe((x) => {
      const data = x.find((value: any) => value.id == Number(stateId));
      this.profileForm.controls['state'].setValue(data.name)
  
  
      this.lga = data.lgaVMs;
    });
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


}
