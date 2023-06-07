import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { createDegreeTypeInInstitution, createDegreeTypeInInstitutionSuccess, createGradeInInstitution, createGradeInInstitutionSuccess, updateDegreeTypeInInstitution, updateDegreeTypeInInstitutionSuccess, updateGradeInInstitution, updateGradeInInstitutionSuccess } from 'src/app/store/institution/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-create-grade',
  templateUrl: './create-grade.component.html',
  styleUrls: ['./create-grade.component.scss']
})
export class CreateGradeComponent implements OnInit {
  newDegreeForm!: FormGroup;
  ipAddress: any;
  deviceModel!: string;
  institutionData: any;
  institutionId: any;
  id : any
  degreeName : any
  createDepartmentForm!: FormGroup;
  faculty : any

  isEditForm : boolean = false
  isCreateForm : boolean = true
  facultyList : any
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
    this.newDegreeForm = this.formBuilder.group({
      degree: ['', Validators.required],
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
    this.degreeName = this.activatedRoute.snapshot.paramMap.get('name')

    if(!this.id && !this.degreeName){
      this.isEditForm = false 
      this.isCreateForm = true;
    }else {
      this.isEditForm = true
      this.isCreateForm = false
    }
    
    if(this.isEditForm){
      this.newDegreeForm.patchValue({
        degree : this.degreeName,
      })
    }
    console.log(this.isEditForm)
    this.loadIp()

  }

  loadIp() {
    this.utilityService.getuserIP().subscribe((res: any) => {
     this.ipAddress = res.query
    })
  }

  createDegreeType() {
    const {degree} = this.newDegreeForm.value;
    const payload = {
      institutionId: Number(this.institutionId),
      name: degree,
      imei: '',
      serialNumber: '',
      device: this.deviceModel,
      ipAddress: this.ipAddress
    }
    this.store.dispatch(createGradeInInstitution({payload}))
    this.actions$.pipe(ofType(createGradeInInstitutionSuccess)).subscribe((res: any) => {
      if (res.payload.hasErrors === false) {
        this.notification.publishMessages('success', res.payload.description);
        this.router.navigateByUrl('/institution/configuration/institution-setup/grade')

        // location.reload()
  
        // document.getElementById('changesConfirmed')?.click();
        // this.activatedegreeType()
      }
   
     })
  }

  back(){
    this.location.back()
  }

  updateDegreeType(){
    const {degree} = this.newDegreeForm.value;
    const payload = {
      id : Number(this.id),
      name : degree,
      institutionId : Number(this.institutionId),
      imei: '',
      serialNumber: '',
      device: this.deviceModel,
      ipAddress: this.ipAddress
    }

    this.store.dispatch(updateGradeInInstitution({payload}))
    this.actions$.pipe(ofType(updateGradeInInstitutionSuccess)).subscribe((res: any) => {
      if (res.payload.hasErrors === false) {
        this.notification.publishMessages('success', res.payload.description);
        this.router.navigateByUrl('/institution/configuration/institution-setup/grade')

        // location.reload()
  
        // document.getElementById('changesConfirmed')?.click();
        // this.activatedegreeType()
      }
   
     })
  }

}
