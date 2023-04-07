import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { createDegreeTypeInInstitution, createDegreeTypeInInstitutionSuccess, createDepartmentInInstitution, createDepartmentInInstitutionSuccess, createFacultyInInstitution, createFacultyInInstitutionSuccess, getALlDepartmentInInstitution, getALlDepartmentInInstitutionSuccess, getALlFacultiesInInstitution, getALlFacultiesInInstitutionSuccess, getAllInstitutionDegreeType, getAllInstitutionDegreeTypeSuccess } from 'src/app/store/institution/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-institution-setup',
  templateUrl: './institution-setup.component.html',
  styleUrls: ['./institution-setup.component.scss']
})
export class InstitutionSetupComponent implements OnInit {

  changesConfirmed = "changesConfirmed";

  selectedOption: string = "All";
  selectedInstitution : string = "All";
  gradYear : string = "All";
  facultyFilter: string = "All";
  status: string = "All";

  filterStatus = { status: 'All'};
  filterOption = {selectedOption : 'All'};
  filterSector = { gradYear: 'All'};
  filterInstituition = {selectedInstituition: 'All'};
  filterDocument = {facultyFilter: 'All'};


  editForm: FormGroup;
  newFacultyForm!: FormGroup;
  createDepartmentForm!: FormGroup;
  newDegreeForm!: FormGroup;

  faculty: boolean = true ;
  degreeType: boolean = false;
  department: boolean = false;
  institutionName: boolean = false;

  facultyEdit: boolean = false;
  setupToggle:boolean = true;
  editToggle:boolean = false;
  editToggleType:boolean = false;
  editToggleName: boolean = false;
  editToggleSector: boolean = false;
  
  institutionNameList = [
    {
      type: 'University',
      body: 'Academic Institution',
      name: 'University of Lagos'
    },
    {
      type: 'Polytechnic',
      body: 'Academic Institution',
      name: 'Yaba College of Technology'
    },
    {
      type: 'Others',
      body: 'Professional Institution',
      name: 'Adeniran Ogunsanya College of Education'
    },
  ]


  institutionData: any;
  institutionId: any;
  facultyList: any;
  departmentList: any;
  degreeTypeList: any;

  degreeFilter = {
    institutionId: '',
    IMEI: '',
    SerialNumber: '',
    Device: '',
    IpAddress: '',

  }
  degreeTypeTotalCount: any;
  ipAddress: any;
  deviceModel: string;

  constructor(
    private readonly formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
    private utilityService: UtilityService,
    private notification : NotificationsService

    ) {
    this.editForm = this.formBuilder.group({
      facultyName: ['', Validators.required],
      departmentName: [''],
      email: [false],
      fileUpload: [false],
      hardCopy: [false]
    });
    this.newFacultyForm = this.formBuilder.group({
      facultyName: ['', Validators.required],
    });
    this.newDegreeForm = this.formBuilder.group({
      degree: ['', Validators.required],
    });
    this.createDepartmentForm = this.formBuilder.group({
      departmentName: ['', Validators.required],
      faculty: ['', Validators.required],
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
    
    this.store.dispatch(getALlDepartmentInInstitution({id: this.institutionId}))
    this.actions$.pipe(ofType(getALlDepartmentInInstitutionSuccess)).subscribe((res: any) => {
      this.departmentList = res.payload;
    })
    this.store.dispatch(getALlFacultiesInInstitution({id: this.institutionId}))
    this.actions$.pipe(ofType(getALlFacultiesInInstitutionSuccess)).subscribe((res: any) => {
      this.facultyList = res.payload;
    })
    this.store.dispatch(getAllInstitutionDegreeType({payload: {...this.degreeFilter, institutionId: this.institutionId}}))
    this.actions$.pipe(ofType(getAllInstitutionDegreeTypeSuccess)).subscribe((res: any) => {
      this.degreeTypeList = res.payload.data;
      this.degreeTypeTotalCount = res.payload.totalCount;
    })
    this.loadIp();

  }

  loadIp() {
    this.utilityService.getuserIP().subscribe((res: any) => {
     this.ipAddress = res.ip
    })
  }

  activateFaculty(){
    this.faculty = true;
    this.institutionName = false;
    this.degreeType = false;
    this.department = false;

  }

  activatedegreeType(){
    this.faculty = false;
    this.institutionName = false;
    this.degreeType = true;
    this.department = false;

  }

  activateDepartment(){
    this.faculty = false;
    this.institutionName = false;
    this.degreeType = false;
    this.department = true;

  }

  activateinstitutionName(){
    this.faculty = false;
    this.institutionName = true;
    this.degreeType = false;
    this.department = false;

  }

  activateEditFaculty(){
    // this.router.navigateByUrl('/institution/configuration/institution-setup/create-degree-type')
    this.editToggle= true;
    this.setupToggle=false
  }

  activateEditDepartment(){
    this.editToggle= false;
    this.setupToggle=false;
    this.editToggleType = true;
    this.editToggleName = false;
    this.editToggleSector = false;
  }

  activateEditInstName(){
    this.editToggle= false;
    this.setupToggle=false;
    this.editToggleType = false;
    this.editToggleName = true;
    this.editToggleSector = false;
  }

  activateEditInstSector(){
    this.editToggle= false;
    this.setupToggle=false;
    this.editToggleType = false;
    this.editToggleName = false;
    this.editToggleSector = true;
  }

  goBack() {
  window.history.back();
}

  addFilter() {
    if (this.status !== 'All') {
      this.filterStatus['status'] = this.status;
    }
    if (this.selectedOption !== 'All Time') {
      this.filterOption['selectedOption'] = this.selectedOption;
    }
    if (this.gradYear !== 'All') {
      this.filterSector['gradYear'] = this.gradYear;
    }
    if (this.selectedInstitution !== 'All') {
      this.filterInstituition['selectedInstituition'] = this.selectedInstitution;
    }
    if (this.facultyFilter !== 'All') {
      this.filterDocument['facultyFilter'] = this.facultyFilter;
    }
    
    ////console.log(this.filterStatus,this.filterOption,this.filterSector,this.filterInstituition,this.filterDocument);
  }

  openChangesConfirmed(){
  document.getElementById('changesConfirmed')?.click();
}

createFaculty() {
  const {facultyName} = this.newFacultyForm.value;
  const payload = {
    institutionId: Number(this.institutionId),
    name: facultyName,
    imei: '',
    serialNumber: '',
    device: this.deviceModel,
    ipAddress: this.ipAddress
  }
  this.store.dispatch(createFacultyInInstitution({payload}))
  this.actions$.pipe(ofType(createFacultyInInstitutionSuccess)).subscribe((res: any) => {
    if (res.payload.hasErrors === false) {
      this.notification.publishMessages('success', res.payload.description);
      location.reload()
      // document.getElementById('changesConfirmed')?.click();
    }
 
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
      location.reload()
      // document.getElementById('changesConfirmed')?.click();
      this.activateDepartment()
    }
 
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
  this.store.dispatch(createDegreeTypeInInstitution({payload}))
  this.actions$.pipe(ofType(createDegreeTypeInInstitutionSuccess)).subscribe((res: any) => {
    if (res.payload.hasErrors === false) {
      this.notification.publishMessages('success', res.payload.description);
      location.reload()

      // document.getElementById('changesConfirmed')?.click();
      this.activatedegreeType()
    }
 
   })
}

editDegreeType(data: any) {
  this.newDegreeForm.patchValue({
    degree: data.name
  })
  
}

editDepartment(data: any) {
  this.activateEditDepartment()
  this.createDepartmentForm.patchValue({
    departmentName: data.departmentName
  })
}

}
