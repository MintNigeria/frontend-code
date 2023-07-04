import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { getGraduateInstitutions, getGraduateInstitutionsSuccess, searchGraduateRecords, searchGraduateRecordsSuccess } from 'src/app/store/graduates/action';
import { getAllInstitutionDegreeType, getAllInstitutionDegreeTypeSuccess, getDegreeTypeWithInstitutionName, getDegreeTypeWithInstitutionNameSuccess, getFacultyAndDepartmentByInstitutionName, getFacultyAndDepartmentByInstitutionNameSuccess } from 'src/app/store/institution/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-graduate-talent-search',
  templateUrl: './graduate-talent-search.component.html',
  styleUrls: ['./graduate-talent-search.component.scss']
})
export class GraduateTalentSearchComponent implements OnInit {
  years: Array<any> = [];
  degreeType: any;
  graduateData: any;
  graduateId: any;
  institutionList: any;
  institutionInput$ = new Subject<string>();
  prefessionalQualifications = ['MBA', 'LLM', 'MEng', 'GDL', 'PGDE', 'CIPM', 'CIM', 'CPIN', 'ICAN']
talentForm!: FormGroup
selectedSkillSetFile: any;
allowedFiled = ["image/png", "image/jpeg", "application/pdf"];

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
      // this.years.reverse()


    }
    this.initForm()
  }

  initForm() {
    this.talentForm = this.fb.group({
      institutionBody: [null, Validators.required],
      course: ['', Validators.required]
    })
  }

  selectInstitutionName(event: any) {
    this.store.dispatch(getFacultyAndDepartmentByInstitutionName({ payload: { institutionName: event.institutionName } }))
    this.actions$.pipe(ofType(getFacultyAndDepartmentByInstitutionNameSuccess)).subscribe((res: any) => {
      // this.facultyList = res.payload.payload;
      //console.log(res)
    })
    this.store.dispatch(getDegreeTypeWithInstitutionName({ name: event.institutionName } ))
    this.actions$.pipe(ofType(getDegreeTypeWithInstitutionNameSuccess)).subscribe((res: any) => {
      this.degreeType = res.payload;

      // console.log(res.payload)
    })
   
    // this.academicDetailsForm.controls['institutionName'].setValue(event.institutionName)
    // this.academicDetailsForm.controls['institutionId'].setValue(event.id)
  }

  additem(e: any) {
    if (typeof(e) === 'object') {
      console.log(e)
      
    } 
  }
  addProfessionalitem(e: any) {
    if (typeof(e) === 'object') {
      console.log(e)
      
    } 
  }

  getFile(event: any) {

  }

  handleSkillSetFileUpload(e: any) {
    const file = e.target.files[0];
    ////console.log(file)
    if (!this.allowedFiled.includes(file.type)) {
		  alert("Invalid format! Please select only correct file type");

		  return;
		} else {
      if (file.size <= 5 * 1024 * 1024) { // 5MB in bytes
        this.selectedSkillSetFile = e.target.files[0].name
        // this.profileForm.controls['profileImage'].setValue(file)
      } else {
        this.notification.publishMessages('danger', 'Total size of uploaded files exceeds the maximum allowed size of 5MB.')
      }

    }
  }

}
