import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { getGraduateInstitutions, getGraduateInstitutionsSuccess, searchGraduateRecords, searchGraduateRecordsSuccess } from 'src/app/store/graduates/action';
import { getAllInstitutionDegreeType, getAllInstitutionDegreeTypeSuccess, getFacultyAndDepartmentByInstitutionName, getFacultyAndDepartmentByInstitutionNameSuccess } from 'src/app/store/institution/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-academic-details',
  templateUrl: './academic-details.component.html',
  styleUrls: ['./academic-details.component.scss']
})
export class AcademicDetailsComponent implements OnInit {
  academicDetailsForm!: FormGroup
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
    for (let index = 1920; index <= currentYear; ++index) {
      this.years.push(index)

    }


  }

  // this.store.dispatch(getFacultyAndDepartmentByInstitutionName({payload: {institutionName: name}}))
  //       this.actions$.pipe(ofType(getFacultyAndDepartmentByInstitutionNameSuccess)).subscribe((res: any) => {
  //         this.facultyList = res.payload.payload;
  //         //console.log(res)
  //       })

  initForm() {
    this.academicDetailsForm = this.fb.group({
      institutionName: ['', Validators.required],
      institutionId: ['', Validators.required],
      faculty: ['', Validators.required],
      department: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      matricNo: ['', Validators.required],
      degreeType: ['', Validators.required],
      yearOfEntry: ['', Validators.required],
      yearOfGraduation: ['', Validators.required],
      consent: ['', Validators.required],
    })
  }

  selectInstitutionName(event: any) {
    this.store.dispatch(getFacultyAndDepartmentByInstitutionName({ payload: { institutionName: event.institutionName } }))
    this.actions$.pipe(ofType(getFacultyAndDepartmentByInstitutionNameSuccess)).subscribe((res: any) => {
      this.facultyList = res.payload.payload;
      //console.log(res)
    })
    this.store.dispatch(getAllInstitutionDegreeType({ payload: { institutionId: event.id } }))
    this.actions$.pipe(ofType(getAllInstitutionDegreeTypeSuccess)).subscribe((res: any) => {
      this.degreeType = res.payload.data;
    })
    this.academicDetailsForm.controls['institutionName'].setValue(event.institutionName)
    this.academicDetailsForm.controls['institutionId'].setValue(event.id)
  }

  getDepartmentInFaculty(event: any) {
    console.log(event)
    const data = this.facultyList.find((value: any) => value.id == Number(event.id));
    this.departmentList = data.departmentVMs;
    this.academicDetailsForm.controls['faculty'].setValue(event.name)

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
      middleName, yearOfEntry, yearOfGraduation } = this.academicDetailsForm.value;
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
    console.log(payload)
    this.store.dispatch(searchGraduateRecords({payload}))
    this.actions$.pipe(ofType(searchGraduateRecordsSuccess)).subscribe((res: any) => {
      if (res.payload.hasErrors === false) {
        sessionStorage.setItem('ver_Ys', JSON.stringify(res.payload.payload))
        this.router.navigateByUrl('/graduate/my-applications/new/search-table')
      }
    })
  }
}
