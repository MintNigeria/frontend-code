import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { getALlDepartmentInInstitution, getALlDepartmentInInstitutionSuccess } from 'src/app/store/institution/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  changesConfirmed = "changesConfirmed";
  createDepartmentForm!: FormGroup;

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
  institutionData: any;
  institutionId: any;
  departmentList: any;


  facultyList = [
    {
      faculty: 'Art',
      departmentCount: '1',
      department: 'Accounting'
    },
    {
      faculty: 'Education',
      departmentCount: '0',
      department: 'Banking and Finance '
    },
    {
      faculty: 'Management Sciences',
      departmentCount: '2',
      department: 'History and International Study'
    }

  ]
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
  constructor(
    private readonly formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
    private utilityService: UtilityService,
    private notification : NotificationsService
  ) { 
    this.createDepartmentForm = this.formBuilder.group({
      departmentName: ['', Validators.required],
      faculty: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.institutionData = JSON.parse(data)
    this.institutionId = this.institutionData.InstitutionId
    
    this.store.dispatch(getALlDepartmentInInstitution({id: this.institutionId}))
    this.actions$.pipe(ofType(getALlDepartmentInInstitutionSuccess)).subscribe((res: any) => {
      this.departmentList = res.payload;
    })
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
    
    console.log(this.filterStatus,this.filterOption,this.filterSector,this.filterInstituition,this.filterDocument);
  }

  addDepartment(){
    this.router.navigateByUrl('/institution/configuration/institution-setup/create-department')
  }

  editDepartment(data: any) {
    console.log(data)
    this.router.navigateByUrl(`/institution/configuration/institution-setup/edit-department/${data.id}/${data.departmentName}/${data.facultyName}`)

  }

}
