import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { createFacultyInInstitution, createFacultyInInstitutionSuccess, updateFacultyInInstitution, updateFacultyInInstitutionSuccess } from 'src/app/store/institution/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-create-faculty',
  templateUrl: './create-faculty.component.html',
  styleUrls: ['./create-faculty.component.scss']
})
export class CreateFacultyComponent implements OnInit {
  newFacultyForm!: FormGroup;
  ipAddress: any;
  deviceModel: string;
  institutionData: any;
  institutionId: any;
  id : any
  facultyName : any

  isEditForm : boolean = false
  isCreateForm : boolean = true

  constructor(
    private readonly formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
    private utilityService: UtilityService,
    private notification : NotificationsService,
    private activatedRoute : ActivatedRoute,
    private location : LocationStrategy

  ) { 
    this.newFacultyForm = this.formBuilder.group({
      facultyName: ['', Validators.required],
    });

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
    this.institutionData = JSON.parse(data)
    this.institutionId = this.institutionData.InstitutionId
    
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    this.facultyName = this.activatedRoute.snapshot.paramMap.get('name')

    if(!this.id && !this.facultyName){
      this.isEditForm = false 
      this.isCreateForm = true;
    }else {
      this.isEditForm = true
      this.isCreateForm = false
    }

    console.log(this.isEditForm)
    this.loadIp()
    if(this.isEditForm){
      this.newFacultyForm.patchValue({
        facultyName : this.facultyName 
      })
    }
  }

  createFaculty() {
    
    const {facultyName} = this.newFacultyForm.value;
    const payload = {
      institutionId: Number(this.institutionId),
      name: facultyName,
      imei: '',
      serialNumber: '',
      device: this.deviceModel,
      ipAddress: this.ipAddress
    }
    this.store.dispatch(createFacultyInInstitution({payload}))
    this.actions$.pipe(ofType(createFacultyInInstitutionSuccess)).subscribe((res: any) => {
      if (res.payload.hasErrors === false) {
        this.notification.publishMessages('success', res.payload.description);
        this.router.navigateByUrl('/institution/configuration/institution-setup/faculty')
        // document.getElementById('changesConfirmed')?.click();
      }
   
     })
  }

  loadIp() {
    this.utilityService.getuserIP().subscribe((res: any) => {
     this.ipAddress = res.ip
    })
  }

  updateFaculty(){
    const {facultyName} = this.newFacultyForm.value;
    const payload = {
      facultyId : Number(this.id),
      name : facultyName,
      institutionId : Number(this.institutionId),
      imei: '',
      serialNumber: '',
      device: this.deviceModel,
      ipAddress: this.ipAddress
    }
    this.store.dispatch(updateFacultyInInstitution({payload}))
    this.actions$.pipe(ofType(updateFacultyInInstitutionSuccess)).subscribe((res: any) => {
      if (res.payload.hasErrors === false) {
        this.notification.publishMessages('success', res.payload.description);
        this.router.navigateByUrl('/institution/configuration/institution-setup/faculty')
        // document.getElementById('changesConfirmed')?.click();
      }
   
     })
  }

  back(){
    this.location.back()
  }
}
