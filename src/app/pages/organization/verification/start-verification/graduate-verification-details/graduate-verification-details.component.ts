import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { getGraduateInstitutions, getGraduateInstitutionsSuccess, searchGraduateRecords, searchGraduateRecordsSuccess } from 'src/app/store/graduates/action';
import { getAllInstitutionDegreeType, getAllInstitutionDegreeTypeSuccess, getAllInstitutionGrade, getAllInstitutionGradeSuccess, getAllInstitutionsDropdown, getAllInstitutionsDropdownSuccess, getDegreeTypeWithInstitutionName, getDegreeTypeWithInstitutionNameSuccess, getFacultyAndDepartmentByInstitutionName, getFacultyAndDepartmentByInstitutionNameSuccess } from 'src/app/store/institution/action';
import { getOrganizationWalletId, getOrganizationWalletIdSuccess } from 'src/app/store/organization/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-graduate-verification-details',
  templateUrl: './graduate-verification-details.component.html',
  styleUrls: ['./graduate-verification-details.component.scss']
})
export class GraduateVerificationDetailsComponent implements OnInit {

  institutionDetailsForm!: FormGroup
  graduateData: any;
  graduateId: any;
  institutionList: any;
  facultyList: any;
  departmentList: any;
  years: Array<any> = [];
  degreeType: any;
  balance: any;
  userData: any;
  degreeTypeList: any;


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
    this.userData = JSON.parse(data)
    this.store.dispatch(getOrganizationWalletId({id: this.userData.OrganizationId}))
    this.actions$.pipe(ofType(getOrganizationWalletIdSuccess)).subscribe((res: any) => {
      this.balance = res.payload.balance;
    })
    this.store.dispatch(getAllInstitutionsDropdown())
    this.actions$.pipe(ofType(getAllInstitutionsDropdownSuccess)).subscribe((res: any) => {
      this.institutionList = res.payload;
    })
    
    let currentYear = new Date().getFullYear();
    for (let index = 1920; index <= currentYear; ++index) {
      this.years.push(index)
      this.years.reverse()

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
      grade: [''],
      degreeType: ['', Validators.required],
      yearOfEntry: [''],
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
    this.store.dispatch(getDegreeTypeWithInstitutionName({ name: event.institutionName } ))
    this.actions$.pipe(ofType(getDegreeTypeWithInstitutionNameSuccess)).subscribe((res: any) => {
      this.degreeType = res.payload;

    })
    this.store.dispatch(getAllInstitutionGrade({payload: {institutionId: event.id}}))
    this.actions$.pipe(ofType(getAllInstitutionGradeSuccess)).subscribe((res: any) => {
      this.degreeTypeList = res.payload.data;
      // this.degreeTypeTotalCount = res.payload.totalCount;
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
      matricNo, grade,
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
      grade,
      MatriculationNumber: matricNo,
      middleName, yearOfEntry, yearOfGraduation

      }
    this.store.dispatch(searchGraduateRecords({payload}))
    this.actions$.pipe(ofType(searchGraduateRecordsSuccess)).subscribe((res: any) => {
      if (res.payload.hasErrors === false && res.payload.payload.length !== 0) {
        sessionStorage.setItem('ver_Ys', JSON.stringify(res.payload.payload))
        this.router.navigateByUrl('/organization/verifications/graduate-details-search-result')
      }
    })
  }

  

  goBack() {
    window.history.back();
    }

}
