import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {

  selectedOption: string = "All";
  selectedInstitution : string = "All";
  gradYear : string = "All";
  department: string = "All";
  status: string = "All";

  filterStatus = { status: 'All'};
  filterOption = {selectedOption : 'All'};
  filterSector = { gradYear: 'All'};
  filterInstituition = {selectedInstituition: 'All'};
  filterDocument = {department: 'All'};

  


  recordsList = [
  {
    id: '1',
    name: 'Adekunle Ciroma',
    faculty: 'Management Science',
    department: 'Banking and Finance',
    matNumber: '090922039',
    gradYear: '2019'
  },
  {
    id: '2',
    name: 'Adekunle Ciroma',
    faculty: 'Management Science',
    department: 'Banking and Finance',
    matNumber: '090922039',
    gradYear: '2019'
  },
  {
    id: '3',
    name: 'Adekunle Ciroma',
    faculty: 'Management Science',
    department: 'Banking and Finance',
    matNumber: '090922039',
    gradYear: '2019'
  },
  {
    id: '4',
    name: 'Adekunle Ciroma',
    faculty: 'Management Science',
    department: 'Banking and Finance',
    matNumber: '090922039',
    gradYear: '2019'
  },
  {
    id: '5',
    name: 'Adekunle Ciroma',
    faculty: 'Management Science',
    department: 'Banking and Finance',
    matNumber: '090922039',
    gradYear: '2019'
  },
  {
    id: '6',
    name: 'Adekunle Ciroma',
    faculty: 'Management Science',
    department: 'Banking and Finance',
    matNumber: '090922039',
    gradYear: '2019'
  }
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
    if (this.department !== 'All') {
      this.filterDocument['department'] = this.department;
    }
    
    console.log(this.filterStatus,this.filterOption,this.filterSector,this.filterInstituition,this.filterDocument);
  }

  clearFilter() {
    this.status = 'All';
    this.filterStatus = { status: 'All' };
    this.selectedOption = 'All';
    this.filterOption = { selectedOption : 'All'};
    this.gradYear = 'All'
    this.filterSector = { gradYear: 'All'};
    this.filterInstituition = {selectedInstituition: 'All'};
    this.department = 'All'
    this.filterDocument = {department: 'All'};
  }

}
