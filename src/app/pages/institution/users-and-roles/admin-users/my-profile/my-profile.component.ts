import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { invokeGetStateAndLGA } from 'src/app/store/institution copy/action';
import { stateLgaSelector } from 'src/app/store/institution copy/selector';
import { invokeGetInstitution, invokeGetInstitutionSuccess } from 'src/app/store/institution/action';
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

  

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
  ) { }

  ngOnInit(): void {
    this.initProfileForm()
    const data: any = localStorage.getItem('userData')
    this.institutionData = JSON.parse(data)
    //console.log(this.institutionData)
    this.institutionId = this.institutionData.InstitutionId
    this.store.dispatch(invokeGetInstitution({id: '13'}))
    this.actions$.pipe(ofType(invokeGetInstitutionSuccess)).subscribe((res: any) => {
      //console.log(res)
      this.populateForm(res.payload)
    })
    this.store.dispatch(
      invokeGetStateAndLGA()
      );
    // setTimeout(() => {
    //   this.populateForm()
    // }, 2000);
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

  selectLocalGovt(stateId: any) {
    this.stateLGA$.subscribe((x) => {
      const data = x.find((value: any) => value.id == Number(stateId));
      this.profileForm.controls['state'].setValue(data.name)
  
  
      this.lga = data.lgaVMs;
    });
  }


}
