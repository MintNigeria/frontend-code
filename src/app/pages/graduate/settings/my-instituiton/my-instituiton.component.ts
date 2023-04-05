import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { getAllInstitutionRecords, getAllInstitutionRecordsSuccess, getFacultyAndDepartmentByInstitutionName, getFacultyAndDepartmentByInstitutionNameSuccess, getInstitutionBody, getInstitutionSector, getInstitutionTypes, invokeGetInstitution, invokeGetInstitutionSuccess, updatedInstitution, updatedInstitutionSuccess } from 'src/app/store/institution/action';
import { getGraduateInstitutions, getGraduateInstitutionsSuccess, updateGraduateInstitutions, updateGraduateInstitutionsSuccess } from 'src/app/store/graduates/action';
import { institutionTypeSelector, institutionSectorSelector, institutionBodySelector, institutionRecordSelector } from 'src/app/store/institution/selector';


@Component({
  selector: 'app-my-instituiton',
  templateUrl: './my-instituiton.component.html',
  styleUrls: ['./my-instituiton.component.scss']
})
export class MyInstituitonComponent implements OnInit {

  years: Array<any> = [];

  profileForm!: FormGroup
  newInstitution!: FormGroup
  confirmChanges = 'confirmChanges';
  changesConfirmed = 'changesConfirmed';

  isNewInstitution: boolean = false;
  graduateData: any;
  graduateId: any;
  facultyList: any;
  newFacultyList: any;
  departmentList: any;
  newTalentsearchForm: any;
  institutionType$ = this.appStore.pipe(select(institutionTypeSelector));
  institutionSectors$ = this.appStore.pipe(select(institutionSectorSelector));
  institutionBody$ = this.appStore.pipe(select(institutionBodySelector));
  institutionName$ = this.appStore.pipe(select(institutionRecordSelector));
  filter: any = {
    InstitutionBodyId: '',
    InstitutionTypeId: '',
    SectorId: '',
  }
  institutionList: any;
  updatedList: any;
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
    this.initNewInstitutionForm()
    const data: any = localStorage.getItem('userData')
    this.graduateData = JSON.parse(data)
    this.graduateId = this.graduateData.GraduateId
    this.store.dispatch(getGraduateInstitutions({id: this.graduateId}))
    this.actions$.pipe(ofType(getGraduateInstitutionsSuccess)).subscribe((res: any) => {
      this.populateForm(res.payload.payload[0])
      // res.payload.payload.forEach((data: any, index: number) => {
      //   (<FormArray>this.profileForm.get('institutionVms')).push(this.fb.group({
      //     name: [data.institutionName, Validators.required],
      // body: [data.institutionBody, Validators.required],
      // sector: [data.institutionSector, Validators.required],
      // email: [data.institutionType, Validators.required],
      // faculty: [data.faculty, Validators.required],
      // department: [data.department, Validators.required],
      // yearOfEntry: [data.yearOfEntry, Validators.required],
      // yearOfGraduation: [data.yearOfGraduation, Validators.required],
      //   }))
      // });
      this.updatedList = res.payload.payload
      res.payload.payload.forEach((data: any, index: number) => {

        const name = res.payload.payload[0].institutionName
        this.store.dispatch(getFacultyAndDepartmentByInstitutionName({payload: {institutionName: name}}))
        this.actions$.pipe(ofType(getFacultyAndDepartmentByInstitutionNameSuccess)).subscribe((res: any) => {
          this.facultyList = res.payload.payload;
          //console.log(res)
        })
      })
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
      faculty: ['', Validators.required],
      department: ['', Validators.required],
      yearOfEntry: ['', Validators.required],
      yearOfGraduation: ['', Validators.required],
      sector: ['', Validators.required],
      // institutionVms: this.fb.array([])
    })
  }

  featureControl(id: number) {
    let control = this.institutions.controls[id] as FormGroup
    return control
  }

  get institutions () {
    return this.profileForm.get('institutionVms') as FormArray
  }

  createItem(): FormGroup {
    return this.fb.group({
      body: '',
      name: '',
      type: '',
      sector: '',
      email: '',
      faculty: '',
      department: '',
      yearOfEntry: '',
      yearOfGraduation: '',
    });
  }

  initNewInstitutionForm() {
    this.newInstitution = this.fb.group({
      body: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      email: ['', Validators.required],
      faculty: ['', Validators.required],
      department: ['', Validators.required],
      yearOfEntry: ['', Validators.required],
      yearOfGraduation: ['', Validators.required],
      sector: ['', Validators.required],
    })
  }

  addNewInstitution( ) {
    const newInstitutionForm = this.fb.group({
      body: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      email: ['', Validators.required],
      faculty: ['', Validators.required],
      department: ['', Validators.required],
      yearOfEntry: ['', Validators.required],
      yearOfGraduation: ['', Validators.required],
      sector: ['', Validators.required],
    })
    // this.institutions.push(newInstitutionForm)
    this.isNewInstitution = true 
    this.store.dispatch(
      getInstitutionSector()
    );
    this.store.dispatch(
      getInstitutionTypes()
    );
    this.store.dispatch(
      getInstitutionBody()
    );
  }

  selectInstitutionBody(event: any) {
    const filter = {...this.filter, ['InstitutionBodyId'] : event.id}
    this.filter = filter;
    this.newInstitution.controls['body'].setValue(event.name)
  }
  selectInstitutionType(event: any) {
    const filter = {...this.filter, ['InstitutionTypeId'] : event.id}
    this.filter = filter;
    this.newInstitution.controls['type'].setValue(event.name)
  }
  selectInstitutionSector(event: any) {
    const filter = {...this.filter, ['SectorId'] : event.id}
    this.filter = filter;
    this.store.dispatch(getAllInstitutionRecords({payload: this.filter}))
    this.actions$.pipe(ofType(getAllInstitutionRecordsSuccess)).subscribe((res: any) => {
      ////console.log(res);
      this.institutionList = res.payload.data
    })
    this.newInstitution.controls['sector'].setValue(event.name)
  }

  selectInstitutionName(event: any) {
    this.store.dispatch(getFacultyAndDepartmentByInstitutionName({payload: {institutionName: event}}))
      this.actions$.pipe(ofType(getFacultyAndDepartmentByInstitutionNameSuccess)).subscribe((res: any) => {
        this.facultyList = res.payload.payload;
        //console.log(res)
      })
  }

  getDepartmentInFaculty(event: any) {
    console.log(event)
    const data = this.facultyList.find((value: any) => value.id == Number(event.id));
    this.departmentList = data.departmentVMs;
    console.log(this.departmentList)
    this.newInstitution.controls['faculty'].setValue(event.name)

  }

  populateForm(data: any) {
    this.profileForm.patchValue({
      name: data.institutionName,
      body: data.institutionBody,
      sector: data.institutionSector,
      type: data.institutionType,
      faculty: data.faculty,
      department: data.department,
      yearOfEntry: data.yearOfEntry,
      yearOfGraduation: data.yearOfGraduation,
      
      
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
    if (this.isNewInstitution === true) {
      // use this for new institution submission 
      const {name, body, type, sector, faculty, department, yearOfEntry, yearOfGraduation} = this.newInstitution.value;
      const payload = {
        isRemoved: false,
        name, body, type, sector, faculty, department, yearOfEntry: String(yearOfEntry), yearOfGraduation: String(yearOfGraduation)

      }
      // console.log(payload, this.upd)
      const data = [payload, ...this.updatedList]
      console.log(data)
      this.store.dispatch(updateGraduateInstitutions({payload: data, id: this.graduateId}))
      this.actions$.pipe(ofType(updateGraduateInstitutionsSuccess)).subscribe((res: any) => {
        // console.log(res)
        if (res.payload.hasErrors === false) {
          this.notification.publishMessages('success', res.payload.description)
          document.getElementById('confirmChanges')?.click();
          this.store.dispatch(getGraduateInstitutions({id: this.graduateId}))

        }
      })
    }
    // console.log(this.profileForm.value)
    
  }


}
