import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { invokeGetInstitution, invokeGetInstitutionSuccess, updatedInstitution, updatedInstitutionSuccess } from 'src/app/store/institution/action';


@Component({
  selector: 'app-my-instituiton',
  templateUrl: './my-instituiton.component.html',
  styleUrls: ['./my-instituiton.component.scss']
})
export class MyInstituitonComponent implements OnInit {


  profileForm!: FormGroup
  confirmChanges = 'confirmChanges';
  changesConfirmed = 'changesConfirmed';

  institutionData: any;
  institutionId: any;

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
    this.institutionData = JSON.parse(data)
    this.institutionId = this.institutionData.InstitutionId
    this.store.dispatch(invokeGetInstitution({id: this.institutionId}))
    this.actions$.pipe(ofType(invokeGetInstitutionSuccess)).subscribe((res: any) => {
      ////console.log(res)
      this.populateForm(res.payload)
     

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
