import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { InstitutionService } from 'src/app/core/services/institution/institution.service';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { getALlFacultiesInInstitution, getALlFacultiesInInstitutionSuccess, getAllInstitutionDegreeType, getAllInstitutionDegreeTypeSuccess, getAllInstitutionGrade, getAllInstitutionGradeSuccess, getAllInstitutionsDropdown, getAllInstitutionsDropdownSuccess, getFacultyAndDepartmentByInstitutionName, getFacultyAndDepartmentByInstitutionNameSuccess } from 'src/app/store/institution/action';
import { getDepartmentGrades, getDepartmentGradesSuccess, newTalentPoolSearch, newTalentPoolSearchSuccess, verifyHistoryInstitutionDropdown } from 'src/app/store/organization/action';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { stateLgaSelector } from 'src/app/store/institution copy/selector';
import { invokeGetStateAndLGA } from 'src/app/store/institution copy/action';
import { OrganizationService } from 'src/app/core/services/organization/organization.service';

@Component({
  selector: 'app-new-search-talent',
  templateUrl: './new-search-talent.component.html',
  styleUrls: ['./new-search-talent.component.scss']
})
export class NewSearchTalentComponent implements OnInit {
  stateLGA$ = this.appStore.pipe(select(stateLgaSelector));

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
  ageRange: Array<any> = [];
  userData: any;
  use: any;
  listCount: any;
  transactionId: any;
  gradeList: any;
  disableForm: boolean = false;
  constructor(
    private appStore: Store<AppStateInterface>,
    private store: Store,
    private actions$: Actions,
    private utilityService: UtilityService,
    private fb:FormBuilder,
    private router: Router,
    private notification: NotificationsService,
    private gradeService: InstitutionService,
    private organizationService: OrganizationService


  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)
    this.store.dispatch(getAllInstitutionsDropdown({payload: {institutionStatus:2}}))
    this.actions$.pipe(ofType(getAllInstitutionsDropdownSuccess)).subscribe((res: any) => {
      this.institutionList = res.payload;
    })
    this.initForm()
    let currentYear = new Date().getFullYear();   
    for (let index = 1990; index <= currentYear; ++index) {
      this.years.push(index)
      
    }
for (let i = 18; i <= 65; i++) {
  this.ageRange.push(i);
}
    this.getAllGrades()
    this.store.dispatch(
      invokeGetStateAndLGA()
    );

    this.newTalentsearchForm.valueChanges.subscribe((res: any) => {
      const ctrl = this.newTalentsearchForm.get('Institutions');
      if ((res.endYearOfExperience.length !== 0 && (Number(res.startYearOfExperience) > Number(res.endYearOfExperience)) || res.EndAgeRange.length !== 0 && (Number(res.StartAgeRange) > Number(res.EndAgeRange)))) {
        this.disableForm = true;
      } else {
        this.disableForm = false;

      }
      if (res.endYearOfExperience.length !== 0 && (Number(res.startYearOfExperience) > Number(res.endYearOfExperience))) {
        this.notification.publishMessages('warning', 'Start year of experience cant be greater than End year of Experience')
      } 
      if (res.EndAgeRange.length !== 0 && (Number(res.StartAgeRange) > Number(res.EndAgeRange))) {
        this.notification.publishMessages('warning', 'Start age range cant be greater than End age range')
      } 

    })


  }




  getAllGrades() {
    this.gradeService.getAllGradesConfig().subscribe((res: any) => {
      this.gradeList = res.payload;
    })
  }

  initForm () {
    this.newTalentsearchForm = this.fb.group({
      Institutions : ['', Validators.required],
      ClassesOfDegree : ['', Validators.required],
      StateOfOrigin : [''],
      StateOfLocation : [''],
      YearOfGraduation : [''],
      FromYearOfGraduation : [''],
      ToYearOfGraduation : [''],
      YearOfExperience : [0],
      startYearOfExperience : [''],
      endYearOfExperience : [''],
      Profession : [''],
      Age : [''], // range of 15 - 65
      StartAgeRange : [''],
      EndAgeRange : [''],
    })
    // this.newTalentsearchForm = this.fb.group({
    //   InstitutionName : ['', Validators.required],
    //   Faculty  : ['', Validators.required],
    //   Department   : ['', Validators.required],
    //   Degree: [null, Validators.required],
    //   Grade : [null, Validators.required],
    //   Gender : ['', Validators.required],
    //   FromYearOfGraduation : [null, Validators.required],
    //   ToYearOfGraduation : [null, Validators.required],
    //   YearOfGraduation : [''],
    // })
  }


  onSelectAll() {
    const selected = this.institutionList.map((item: any) => item.institutionName);
    this.newTalentsearchForm.controls['Institutions'].patchValue(selected);
  }

  onClearAll() {
    this.newTalentsearchForm.controls['Institutions'].patchValue(null);
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
    // this.generateReport()
    this.store.dispatch(getAllInstitutionGrade({payload: {institutionId: this.institutionId}}))
    this.actions$.pipe(ofType(getAllInstitutionGradeSuccess)).subscribe((res: any) => {
      this.grades = res.payload.data;
    })
  }
  
  getDepartmentInFaculty(event: any) {
    //console.log(event)
    const data = this.facultyList.find((value: any) => value.id == Number(event.id));
    this.departmentList = data.departmentVMs;
    this.newTalentsearchForm.controls['Faculty'].setValue(event.name)
    
  }
  
  getDegree(event: any) {
   
    this.newTalentsearchForm.controls['Department'].setValue(event.departmentName)
  }

  searchTalents() {
    console.log(this.newTalentsearchForm)
    const {Institutions,ClassesOfDegree,StateOfOrigin, StateOfLocation, YearOfGraduation, FromYearOfGraduation, ToYearOfGraduation, YearOfExperience, Profession, Age, StartAgeRange, EndAgeRange, startYearOfExperience, endYearOfExperience } = this.newTalentsearchForm.value;

    const payload = {
      Institutions: Institutions || null,
      ClassesOfDegree : ClassesOfDegree || null,
      StateOfOrigin : StateOfOrigin || null, 
      StateOfLocation : StateOfLocation || null,
      YearOfGraduation: YearOfGraduation || null,
      FromYearOfGraduation: FromYearOfGraduation || null,
      ToYearOfGraduation: ToYearOfGraduation || null,
      Profession: Profession || null,
      Age: Number(Age) || null,
      StartAgeRange: Number(StartAgeRange) || null,
      EndAgeRange: Number(EndAgeRange) || null,
      YearOfExperience : Number(YearOfExperience) || null,
      startYearOfExperience: Number(startYearOfExperience) || null,
      endYearOfExperience: Number(endYearOfExperience) || null
    };
    console.log(payload)
    // const formData = new FormData(this.newTalentsearchForm.value);
    this.organizationService.searchCompletedGraduateProfileForTalentSearch(payload).subscribe((res: any) => {
      console.log(res)
      if (res.hasErrors === false && res.payload?.graduateIds?.length  !== 0) {
        document.getElementById('confirmChanges')?.click();
        //console.log(res)
          this.transactionId = res.payload?.payload?.transactionId
          sessionStorage.setItem('telx_pl', JSON.stringify(res.payload))
          this.listCount = res.payload?.graduateIds?.length
          //console.log(this.listCount)
      } else {
        this.notification.publishMessages('warning', 'No record(s) found')
      }
    })
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
      if (res.payload.hasErrors === false && res.payload?.payload  !== null) {
        document.getElementById('confirmChanges')?.click();
        //console.log(res)
          this.transactionId = res.payload?.payload?.transactionId
          sessionStorage.setItem('telx_pl', JSON.stringify(res.payload.payload))
          this.listCount = res.payload?.payload?.institutionGraduateIds?.length
          //console.log(this.listCount)
        } else {
          this.notification.publishMessages('warning', 'No record(s) found')
        }
      })
    }
    
    makePayment() {
      const payload = {
        organizationId: Number(this.userData.OrganizationId),
        recordCount: Number(this.listCount)
      }
      this.organizationService.getTalentSearchTransactionId(payload).subscribe((res: any) => {
        console.log(res)
        sessionStorage.setItem('tal_trx', JSON.stringify(res.payload))
      this.router.navigateByUrl(`/organization/talent-search-pool/make-payment/${res.payload.transactionId}`)
    })
    // [routerLink]="'/organization/talent-search-pool/make-payment/2'"
  }

  cancelConfirmChanges() {
    document.getElementById('confirmChanges')?.click();
  }

}
