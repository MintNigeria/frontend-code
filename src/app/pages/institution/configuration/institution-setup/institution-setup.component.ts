import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

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

  constructor(private readonly formBuilder: FormBuilder) {
    this.editForm = this.formBuilder.group({
      facultyName: ['', Validators.required],
      departmentName: [''],
      email: [false],
      fileUpload: [false],
      hardCopy: [false]
    });
  }

  ngOnInit(): void {
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
    
    console.log(this.filterStatus,this.filterOption,this.filterSector,this.filterInstituition,this.filterDocument);
  }

  openChangesConfirmed(){
  document.getElementById('changesConfirmed')?.click();
}

}
