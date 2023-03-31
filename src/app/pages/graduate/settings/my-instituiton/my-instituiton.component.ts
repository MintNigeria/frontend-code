import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { invokeGetInstitution, invokeGetInstitutionSuccess, updatedInstitution, updatedInstitutionSuccess } from 'src/app/store/institution/action';
import { getGraduateInstitutions, getGraduateInstitutionsSuccess } from 'src/app/store/graduates/action';


@Component({
  selector: 'app-my-instituiton',
  templateUrl: './my-instituiton.component.html',
  styleUrls: ['./my-instituiton.component.scss']
})
export class MyInstituitonComponent implements OnInit {

  years: Array<any> = [];

  profileForm!: FormGroup
  confirmChanges = 'confirmChanges';
  changesConfirmed = 'changesConfirmed';

  graduateData: any;
  graduateId: any;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
    private utilityService: UtilityService,
    private notification: NotificationsService
  ) { }

  ngOnInit(): void {
    this.initProfileForm()
    const data: any = localStorage.getItem('userData')
    this.graduateData = JSON.parse(data)
    this.graduateId = this.graduateData.GraduateId
    this.store.dispatch(getGraduateInstitutions({id: this.graduateId}))
    this.actions$.pipe(ofType(getGraduateInstitutionsSuccess)).subscribe((res: any) => {
      this.populateForm(res.payload.payload[0])
    })
    let currentYear = new Date().getFullYear();   
    for (let index = 1920; index <= currentYear; ++index) {
      this.years.push(index)
      
    }
  }

  initProfileForm() {
    this.profileForm = this.fb.group({
      body: ['', Validators.required],
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
      body: data.institutionBody,
      sector: data.institutionSector,
      establishment: '02-02-1967',
      type: data.institutionType,
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
    
  }


}
