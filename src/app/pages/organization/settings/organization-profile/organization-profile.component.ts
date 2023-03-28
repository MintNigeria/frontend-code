import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { organizationProfile, organizationProfileSuccess } from 'src/app/store/organization/action';
import { AppStateInterface } from 'src/app/types/appState.interface';


@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.scss']
})
export class OrganizationProfileComponent implements OnInit {

 profileForm!: FormGroup
  selectedFile!: null
  allowedFiled = ["image/png", "image/jpeg", "application/pdf"];

  confirmChanges = 'confirmChanges';
  changesConfirmed = 'changesConfirmed';
  userData: any;

  

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
    this.store.dispatch(organizationProfile({id: this.userData.OrganizationId }))
    this.actions$.pipe(ofType(organizationProfileSuccess)).subscribe((res: any) => {
      console.log(res)
    })
    setTimeout(() => {
      this.populateForm()
    }, 2000);
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

  populateForm() {
    this.profileForm.patchValue({
      name: 'First Bank',
      sector: 'Financial Institution',
      establishment: '02-02-1967',
      type: 'CAC',
      regNumber: 'RC2345678',
      email: 'admin@unilag.edu.ng',
      phone: '070894994954',
      state: 'Lagos',
      lga: 'VI',
      address: '14, Karimu Kotun Road',
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
