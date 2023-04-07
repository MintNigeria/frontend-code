import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

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
  constructor() { }

  ngOnInit(): void {
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

  activateEditDepartment(){
    
  }

}
