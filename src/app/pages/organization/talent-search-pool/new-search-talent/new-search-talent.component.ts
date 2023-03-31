import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { getALlFacultiesInInstitution, getALlFacultiesInInstitutionSuccess, getAllInstitutionDegreeType, getAllInstitutionDegreeTypeSuccess, getAllInstitutionsDropdown, getAllInstitutionsDropdownSuccess, getFacultyAndDepartmentByInstitutionName, getFacultyAndDepartmentByInstitutionNameSuccess } from 'src/app/store/institution/action';
import { getDepartmentGrades, getDepartmentGradesSuccess, newTalentPoolSearch, newTalentPoolSearchSuccess, verifyHistoryInstitutionDropdown } from 'src/app/store/organization/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-new-search-talent',
  templateUrl: './new-search-talent.component.html',
  styleUrls: ['./new-search-talent.component.scss']
})
export class NewSearchTalentComponent implements OnInit {

  selectedOption: string = "Academic Report";

  confirmChanges = 'confirmChanges';
  changesConfirmed = 'changesConfirmed';
  newTalentsearchForm!: FormGroup
  institutionList: any;
  facultyList: any;
  departmentList: any;
  institutionId: any;
  grades: any;
  degreeType: any;
  years: Array<any> = [];
  userData: any;
  use: any;
  listCount: any;
  transactionId: any;
  constructor(
    private appStore: Store<AppStateInterface>,
    private store: Store,
    private actions$: Actions,
    private utilityService: UtilityService,
    private fb:FormBuilder,
    private router: Router

  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)

    this.store.dispatch(getAllInstitutionsDropdown())
    this.actions$.pipe(ofType(getAllInstitutionsDropdownSuccess)).subscribe((res: any) => {
      this.institutionList = res.payload.payload;
    })
    this.initForm()
    let currentYear = new Date().getFullYear();   
    for (let index = 1920; index <= currentYear; ++index) {
      this.years.push(index)
      
    }
  }

  initForm () {
    this.newTalentsearchForm = this.fb.group({
      InstitutionName : ['', Validators.required],
      Faculty  : ['', Validators.required],
      Department   : ['', Validators.required],
      Degree: ['', Validators.required],
      Grade : ['', Validators.required],
      Gender : [''],
      FromYearOfGraduation : [''],
      ToYearOfGraduation : [''],
      YearOfGraduation : [''],
    })
  }

  getInstitutionFaculty(event: any) {
    //console.log(event)
    this.institutionId = event.id
    this.store.dispatch(getFacultyAndDepartmentByInstitutionName({payload: {institutionName: event.institutionName}}))
    this.actions$.pipe(ofType(getFacultyAndDepartmentByInstitutionNameSuccess)).subscribe((res: any) => {
      this.facultyList = res.payload.payload;
      //console.log(res)
    })
    this.newTalentsearchForm.controls['InstitutionName'].setValue(event.institutionName)
    this.store.dispatch(getAllInstitutionDegreeType({payload: {institutionId: this.institutionId}}))
    this.actions$.pipe(ofType(getAllInstitutionDegreeTypeSuccess)).subscribe((res: any) => {
      this.degreeType = res.payload.data;
    })
  }
  
  getDepartmentInFaculty(event: any) {
    //console.log(event)
    const data = this.facultyList.find((value: any) => value.id == Number(event.id));
    this.departmentList = data.departmentVMs;
    this.newTalentsearchForm.controls['Faculty'].setValue(event.name)
    
  }
  
  getDegree(event: any) {
    this.store.dispatch(getDepartmentGrades({institutionId: this.institutionId, departmentId: event.departmentName}))
    this.actions$.pipe(ofType(getDepartmentGradesSuccess)).subscribe((res: any) => {
      this.grades = res.payload.payload;
      //console.log(res)
    })
    this.newTalentsearchForm.controls['Department'].setValue(event.departmentName)
  }

  generateReport() {
    //console.log(this.newTalentsearchForm.value)
    const payload = {
      ...this.newTalentsearchForm.value,
      institutionId: Number(this.institutionId),
      organizationId: Number(this.userData.OrganizationId),

    }
    this.store.dispatch(newTalentPoolSearch({payload}))
    this.actions$.pipe(ofType(newTalentPoolSearchSuccess)).subscribe((res: any) => {
      //console.log(res)
      if (res.payload.hasErrors === false) {
        document.getElementById('confirmChanges')?.click();
        //console.log(res)
          this.transactionId = res.payload?.payload?.transactionId
          sessionStorage.setItem('telx_pl', JSON.stringify(res.payload.payload))
          this.listCount = res.payload?.payload?.institutionGraduateIds?.length
          //console.log(this.listCount)
      }
    })
  }

  makePayment() {
    this.router.navigateByUrl(`/organization/talent-search-pool/make-payment/${this.transactionId}`)
    // [routerLink]="'/organization/talent-search-pool/make-payment/2'"
  }

  cancelConfirmChanges() {
    document.getElementById('confirmChanges')?.click();
  }

}
