import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { createDepartmentInInstitution, createDepartmentInInstitutionSuccess, getALlFacultiesInInstitution, getALlFacultiesInInstitutionSuccess, updateDepartmentInInstitution, updateDepartmentInInstitutionSuccess } from 'src/app/store/institution/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.scss']
})
export class CreateDepartmentComponent implements OnInit {
  newFacultyForm!: FormGroup;
  ipAddress: any;
  deviceModel!: string;
  institutionData: any;
  institutionId: any;
  id : any
  departmentName : any
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

    this.createDepartmentForm = this.formBuilder.group({
      departmentName: ['', Validators.required],
      faculty: ['', Validators.required],
      facultyId: [''],
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
 }}

  ngOnInit(): void {
    
   const data: any = localStorage.getItem('userData')
    this.institutionData = JSON.parse(data)
    this.institutionId = this.institutionData.InstitutionId
    
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    this.departmentName = this.activatedRoute.snapshot.paramMap.get('name')
    this.faculty = this.activatedRoute.snapshot.paramMap.get('faculty')

    if(!this.id && !this.departmentName){
      this.isEditForm = false 
      this.isCreateForm = true;
    }else {
      this.isEditForm = true
      this.isCreateForm = false
    }
    
    if(this.isEditForm){
      this.createDepartmentForm.patchValue({
        departmentName : this.departmentName,
        faculty : this.faculty
      })
    }
    console.log(this.isEditForm)
    this.loadIp()

    this.store.dispatch(getALlFacultiesInInstitution({id: this.institutionId}))
    this.actions$.pipe(ofType(getALlFacultiesInInstitutionSuccess)).subscribe((res: any) => {
      this.facultyList = res.payload;
    })
  }

  

  loadIp() {
    this.utilityService.getuserIP().subscribe((res: any) => {
      console.log(res)
     this.ipAddress = res.query
    })
  }

  createDepartment() {
    const {faculty, departmentName} = this.createDepartmentForm.value;
    const payload = {
      institutionId: Number(this.institutionId),
      name: departmentName,
      facultyId: faculty,
      imei: '',
      serialNumber: '',
      device: this.deviceModel,
      ipAddress: this.ipAddress
    }
    this.store.dispatch(createDepartmentInInstitution({payload}))
    this.actions$.pipe(ofType(createDepartmentInInstitutionSuccess)).subscribe((res: any) => {
      if (res.payload.hasErrors === false) {
        this.notification.publishMessages('success', res.payload.description);
        this.router.navigateByUrl('/institution/configuration/institution-setup/department')

        // location.reload()
        // document.getElementById('changesConfirmed')?.click();
        // this.activateDepartment()
      }
   
     })
  }

  back(){
    this.location.back()
  }

  updateDepartmentAction(){
    const {faculty, departmentName} = this.createDepartmentForm.value;
    const payload = {
      departmentId: Number(this.id),
      institutionId: Number(this.institutionId),
      name: departmentName,
      facultyId: faculty,
      imei: '',
      serialNumber: '',
      device: this.deviceModel,
      ipAddress: this.ipAddress
    }
    this.store.dispatch(updateDepartmentInInstitution({payload}))
    this.actions$.pipe(ofType(updateDepartmentInInstitutionSuccess)).subscribe((res: any) => {
      if (res.payload.hasErrors === false) {
        this.notification.publishMessages('success', res.payload.description);
        this.router.navigateByUrl('/institution/configuration/institution-setup/department')

        // location.reload()
        // document.getElementById('changesConfirmed')?.click();
        // this.activateDepartment()
      }
   
     })
  }
 
}
