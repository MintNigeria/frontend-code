import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { getGraduateInstitutions, getGraduateInstitutionsSuccess, searchGraduateRecords, searchGraduateRecordsSuccess } from 'src/app/store/graduates/action';
import { getAllInstitutionDegreeType, getAllInstitutionDegreeTypeSuccess, getDegreeTypeWithInstitutionName, getDegreeTypeWithInstitutionNameSuccess, getFacultyAndDepartmentByInstitutionName, getFacultyAndDepartmentByInstitutionNameSuccess } from 'src/app/store/institution/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-institution-details',
  templateUrl: './institution-details.component.html',
  styleUrls: ['./institution-details.component.scss']
})
export class InstitutionDetailsComponent implements OnInit {
  institutionDetailsForm!: FormGroup
  graduateData: any;
  graduateId: any;
  institutionList: any;
  facultyList: any;
  departmentList: any;
  years: Array<any> = [];
  degreeType: any;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
    private utilityService: UtilityService,
    private notification: NotificationsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm()
    const data: any = localStorage.getItem('userData')
    this.graduateData = JSON.parse(data)
    this.graduateId = this.graduateData.GraduateId
    this.store.dispatch(getGraduateInstitutions({ id: this.graduateId }))
    this.actions$.pipe(ofType(getGraduateInstitutionsSuccess)).subscribe((res: any) => {
      this.institutionList = res.payload.payload
    })
    let currentYear = new Date().getFullYear();
    for (let index = 1990; index <= currentYear; ++index) {
      this.years.push(index)

    }


  }

  // this.store.dispatch(getFacultyAndDepartmentByInstitutionName({payload: {institutionName: name}}))
  //       this.actions$.pipe(ofType(getFacultyAndDepartmentByInstitutionNameSuccess)).subscribe((res: any) => {
  //         this.facultyList = res.payload.payload;
  //         //console.log(res)
  //       })

  initForm() {
    this.institutionDetailsForm = this.fb.group({
      institutionName: ['', Validators.required],
      institutionId: ['', Validators.required],
      faculty: ['', Validators.required],
      department: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      matricNo: [''],
      degreeType: ['', Validators.required],
      yearOfEntry: ['', Validators.required],
      yearOfGraduation: ['', Validators.required],
      consent: [false, Validators.requiredTrue],
    })
  }

  selectInstitutionName(event: any) {
    this.store.dispatch(getFacultyAndDepartmentByInstitutionName({ payload: { institutionName: event.institutionName } }))
    this.actions$.pipe(ofType(getFacultyAndDepartmentByInstitutionNameSuccess)).subscribe((res: any) => {
      this.facultyList = res.payload.payload;
      //console.log(res)
    })
    this.store.dispatch(getDegreeTypeWithInstitutionName({ name: event.institutionName } ))
    this.actions$.pipe(ofType(getDegreeTypeWithInstitutionNameSuccess)).subscribe((res: any) => {
      this.degreeType = res.payload;

      // console.log(res.payload)
    })
   
    this.institutionDetailsForm.controls['institutionName'].setValue(event.institutionName)
    this.institutionDetailsForm.controls['institutionId'].setValue(event.id)
  }

  getDepartmentInFaculty(event: any) {
    const data = this.facultyList.find((value: any) => value.id == Number(event.id));
    this.departmentList = data.departmentVMs;
    this.institutionDetailsForm.controls['faculty'].setValue(event.name)

  }

  changeGender(event: any) {

  }

  cancel() {

  }

  searchRecord() {
    const { consent,
      degreeType,
      department,
      faculty,
      firstName,
      gender,
      institutionId,
      institutionName,
      lastName,
      matricNo,
      middleName, yearOfEntry, yearOfGraduation } = this.institutionDetailsForm.value;
      const payload = {
        degreeType: 'Bsc',
        department,
      faculty,
      firstName,
      gender,
      institutionId,
      institutionName,
      lastName,
      MatriculationNumber: matricNo,
      middleName, yearOfEntry, yearOfGraduation

      }
    this.store.dispatch(searchGraduateRecords({payload}))
    this.actions$.pipe(ofType(searchGraduateRecordsSuccess)).subscribe((res: any) => {
      // console.log(res)
      if (res.payload.hasErrors === false  && res.payload?.payload.length  > 0) {
        sessionStorage.setItem('ver_Ys', JSON.stringify(res.payload.payload))
        this.router.navigateByUrl('/graduate/my-verifications/new/search-table')
      } else {

        this.notification.publishMessages('warning', 'No record(s) found')
      }
    })
  }
}

