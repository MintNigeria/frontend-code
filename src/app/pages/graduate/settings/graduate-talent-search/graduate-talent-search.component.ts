import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { GraduatesService } from 'src/app/core/services/graduates/graduates.service';
import { InstitutionService } from 'src/app/core/services/institution/institution.service';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { getAllInstitutionDegreeType, getAllInstitutionDegreeTypeSuccess, getAllInstitutionsRecordsAllNames, getAllInstitutionsRecordsAllNamesSuccess, getDegreeTypeWithInstitutionName, getDegreeTypeWithInstitutionNameSuccess, getFacultyAndDepartmentByInstitutionName, getFacultyAndDepartmentByInstitutionNameSuccess } from 'src/app/store/institution/action';
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
allowedFiled = ["application/pdf"];
eduForm = this.fb.group({
  institutionName: new FormControl('', [Validators.required]),
  course: new FormControl('', [Validators.required]),
  degree: new FormControl('', [Validators.required]),
  yearOfGraduation: new FormControl('', [Validators.required]),
  classOfDegree: new FormControl('', [Validators.required]),
  certificate: null,
  id: null,
});
workHistory = this.fb.group({
  companyName: new FormControl(''),
  companyAddress: new FormControl(''),
  profession: new FormControl(''),
  title: new FormControl(''),
  dateOfEmployment: new FormControl(''),
  endOfEmployment: new FormControl(''),
  isCurrent: new FormControl(''),
  yearsOfExperience: new FormControl(false),
  id: new FormControl(''),
});
skillSet = this.fb.group({
  title: new FormControl(''),
  description: new FormControl(''),
  year: new FormControl(''),
  document: new FormControl(null),
  id: new FormControl(null),
});
  gradeList: any;
  isCurrent: boolean = false;
  skill_sets = [
    "Web development",
    "Data science",
    "Machine learning",
    "Cloud computing",
    "Cybersecurity",
    "UI/UX design",
    "Product management",
    "Business analysis",
    "Marketing",
    "Sales",
    "Software engineering",
    "Computer science",
    "Information technology",
    "Electrical engineering",
    "Mechanical engineering",
    "Civil engineering",
    "Chemical engineering",
    "Bioengineering",
    "Medical science",
    "Finance",
    "Accounting",
    "Law",
    "Education",
    "Human resources",
    "Project management",
    "Customer service",
    "Sales",
    "Marketing",
    "Communication",
    "Leadership",
    "Problem solving",
    "Critical thinking",
    "Creativity",
    "Teamwork",
    "Time management",
    "Organization",
    "Stress management",
    "Adaptability",
    "Empathy",
    "Resilience",
    "Ethics",
    "Professionalism"
]
editProfile: boolean = false;
editMode: boolean = false;
  profileDetails: any;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
    private utilityService: UtilityService,
    private notification: NotificationsService,
    private router: Router,
    private gradeService: InstitutionService,
    private graduateService: GraduatesService,
    private notify: NotificationsService
  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.graduateData = JSON.parse(data)
    this.graduateId = this.graduateData.GraduateId
    this.store.dispatch(getAllInstitutionsRecordsAllNames())
    this.actions$.pipe(ofType(getAllInstitutionsRecordsAllNamesSuccess)).subscribe((res: any) => {
      this.institutionList = res.payload.data
    })

    let currentYear = new Date().getFullYear();
    for (let index = 1990; index <= currentYear; ++index) {
      this.years.push(index)
      // this.years.reverse()


    }
    this.initForm()
    this.getAllGrades()
    this.getAllDegree()
    this.getTalentProfile()
  }

  getTalentProfile() {
    this.graduateService.getTalentSearchProfile(this.graduateId).subscribe((res: any) => {
      if (res.payload.hasStartedUpdtingTalentSearchProfile === true) {
        this.populateForm(res.payload)
        this.editProfile = true;
        this.profileDetails = res.payload
      } else {
        this.editProfile = false;

      }
    })
  }


  printDocument() {
    window.print()
  }

  switchProfileView() {
    this.editMode = true;
  }

  downloadFile(id: string) {
    this.graduateService.downloadTalentSearchDocuments(id).subscribe((res: any) => {
      const link = document.createElement('a');
        link.download = `${res.payload?.name}.pdf`;
        link.href = 'data:image/png;base64,' + res.payload?.path;
        link.click();
    })
  }
 


  populateForm(data: any) {
    this.talentForm.patchValue({
      id: data.professionalQualificationVM[0].id,
      qualifications: data.professionalQualificationVM[0].professionalQualificationsVM.map((item: any) => item.name),
      linkedInProfile: data.professionalQualificationVM[0].linkedInProfile,
      porfolioUrl: data.professionalQualificationVM[0].portfolioUrl ,
    })
    this.talentForm.setControl('educationalQualificationVM', this.setExistingEducationData(data?.educationalQualificationVM));
    this.talentForm.setControl('workHistoryVM', this.setExistingWorkHistoryData(data.workHistoryVM));
    this.talentForm.setControl('skillSetVM', this.setExistingSkillSetData(data.skillSetVM));

  }

  initForm() {
    this.talentForm = this.fb.group({
      qualifications: [null, Validators.required],
      linkedInProfile: ['', Validators.required],
      porfolioUrl: ['', Validators.required],
      resume: [null, Validators.required],
      id: [null],
      educationalQualificationVM: this.fb.array([]),
      workHistoryVM: this.fb.array([]),
      skillSetVM: this.fb.array([])
    })
    this.addMoreEducation()
    this.addWorkHistory()
    this.addSkillSet()
  }

  getAllGrades() {
    this.gradeService.getAllGradesConfig().subscribe((res: any) => {
      this.gradeList = res.payload;
    })
  }
  getAllDegree() {
    this.gradeService.getAllDegreeConfig().subscribe((res: any) => {
      this.degreeType = res.payload;
    })
  }

 

  get educationalQualificationVM() {
    return this.talentForm.controls["educationalQualificationVM"] as FormArray;
  }

  get workHistoryVM() {
    return this.talentForm.controls["workHistoryVM"] as FormArray;
  }
  get skillSetVM() {
    return this.talentForm.controls["skillSetVM"] as FormArray;
  }

  addMoreEducation() {
    this.educationalQualificationVM.push(this.eduForm)
  }
  removeEducation(index: number) {
    this.educationalQualificationVM.removeAt(index)
  }
  addWorkHistory() {
    this.workHistoryVM.push(this.workHistory)
  }
  
    removeWork(index: number) {
      this.workHistoryVM.removeAt(index)
    }
  addSkillSet() {
    this.skillSetVM.push(this.skillSet)
  }

  removeSkill(index: number) {
    this.skillSetVM.removeAt(index)
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
      this.eduForm.controls['institutionName'].setValue(e.label)
      console.log(e)
      
    }  else {
      this.eduForm.controls['institutionName'].setValue(e)

    }
  }
  addProfessionalitem(e: any) {
    if (typeof(e) === 'object') {
      console.log(e)
      
    } 
  }

  setExistingEducationData(data: any) {
    const formArray: any = new FormArray([]);
    for (const x of data) {
      // // (x);
      const formGroup: any = this.fb.group({
        institutionName: x.institutionName,
        course: x.courseOfStudy,
        degree: x.degreeObtained,
        yearOfGraduation: x.yearOfGraduation,
        classOfDegree: x.classOfDegree,
        id: x.id,
     
     });
     formArray.push(formGroup)
   }
       return formArray;

  }
  setExistingWorkHistoryData(data: any) {
    const formArray: any = new FormArray([]);
    for (const x of data) {
      const formGroup: any = this.fb.group({
        companyName: x.companyName,
        companyAddress: x.companyAddress,
        profession: x.profession,
        title: x.title,
        dateOfEmployment: moment(x?.dateOfEmployment).format('YYYY-MM-DD'),
        endOfEmployment: moment(x?.endOfEmployment).format('YYYY-MM-DD'),
        isCurrent: x.isCurrentPlaceOfEmployment,
        yearsOfExperience: x.yearsOfExperience,
        id: x.id,
     
     });
     formArray.push(formGroup)
   }

    return formArray;
  }
  setExistingSkillSetData(data: any) {
    const formArray: any = new FormArray([]);
    for (const x of data) {
      // // (x);
      const formGroup: any = this.fb.group({
        title: x.qualificationName,
        description: x.description,
        year: x.yearOfCertification,
        id: x.id,
     });
     formArray.push(formGroup)
   }

    return formArray;
  }

  handleEducationFileUpload(e: any) {
    const file = e.target.files[0];
    ////console.log(file)
    if (!this.allowedFiled.includes(file.type)) {
		  alert("Invalid format! Please select only correct file type");

		  return;
		} else {
      if (file.size <= 5 * 1024 * 1024) { // 5MB in bytes
        this.eduForm.controls['certificate'].setValue(file)
      } else {
        this.notification.publishMessages('danger', 'Total size of uploaded files exceeds the maximum allowed size of 5MB.')
      }

    }
  }
  handleResumeFileUpload(e: any) {
    const file = e.target.files[0];
    ////console.log(file)
    if (!this.allowedFiled.includes(file.type)) {
		  alert("Invalid format! Please select only correct file type");

		  return;
		} else {
      if (file.size <= 5 * 1024 * 1024) { // 5MB in bytes
        this.talentForm.controls['resume'].setValue(file)
      } else {
        this.notification.publishMessages('danger', 'Total size of uploaded files exceeds the maximum allowed size of 5MB.')
      }

    }
  }
  handleSkillSetFileUpload(e: any) {
    const file = e.target.files[0];
    ////console.log(file)
    if (!this.allowedFiled.includes(file.type)) {
		  alert("Invalid format! Please select only correct file type");

		  return;
		} else {
      if (file.size <= 5 * 1024 * 1024) { // 5MB in bytes
        this.skillSet.controls['document'].setValue(file)

        // this.profileForm.controls['profileImage'].setValue(file)
      } else {
        this.notification.publishMessages('danger', 'Total size of uploaded files exceeds the maximum allowed size of 5MB.')
      }

    }
  }

  isworkCurrent(event: any) {
    this.isCurrent = event.target.checked

  }
  addRecord() {
    const payload = {
      graduateId: this.graduateId,
      ...this.talentForm.value
    }
    this.graduateService.completeGraduateTalentSearchProfile(payload).subscribe((res: any) => {
      this.notification.publishMessages('success', res.description)
      this.talentForm.reset();
      this.getTalentProfile()
      
    })
  }
  updateRecord() {
    const payload = {
      graduateId: this.graduateId,
      ...this.talentForm.value
    }
    console.log(payload)
    this.graduateService.updateGraduateTalentSearchProfile(payload).subscribe((res: any) => {
      this.notification.publishMessages('success', res.description)
      this.talentForm.reset();
      this.getTalentProfile()
      // location.reload();
    })
  }

}
