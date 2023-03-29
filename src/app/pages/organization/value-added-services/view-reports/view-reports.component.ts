import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-reports',
  templateUrl: './view-reports.component.html',
  styleUrls: ['./view-reports.component.scss']
})
export class ViewReportsComponent implements OnInit {

  selectedOption: string = "All Time";
  selectedInstitution : string = "All";
  selectedSector : string = "All";
  documentType: string = "All";
  status: string = "All";

  filterStatus = { status: 'All'};
  filterOption = {selectedOption : 'All Time'};
  filterSector = { selectedSector: 'All'};
  filterInstituition = {selectedInstituition: 'All'};
  filterDocument = {documentType: 'All'};

  


  generatedList = [
  {
    id: '1',
    name:'Adekunle Ciroma',
    faculty: 'Management Science',
    department: 'History',
    gradYear: '2019',
    institution: 'University of Lagos',
    grade: '2:2'
  },
  {
    id: '2',
    name:'Adekunle Ciroma',
    faculty: 'Social Sciences',
    department: 'History',
    gradYear: '2019',
    institution: 'University of Lagos',
    grade: '2:2'
  },
  {
    id: '3',
    name:'Adekunle Ciroma',
    faculty: 'Sciences',
    department: 'History',
    gradYear: '2019',
    institution: 'University of Lagos',
    grade: '2:2'
  },
  {
    id: '4',
    name:'Adekunle Ciroma',
    faculty: 'Art',
    department: 'History',
    gradYear: '2019',
    institution: 'University of Lagos',
    grade: '2:2'
  },
  {
    id: '5',
    name:'Adekunle Ciroma',
    faculty: 'Social Sciences',
    department: 'History',
    gradYear: '2019',
    institution: 'University of Lagos',
    grade: '2:2'
  },
  {
    id: '6',
    name:'Adekunle Ciroma',
    faculty: 'Social Sciences',
    department: 'History',
    gradYear: '2019',
    institution: 'University of Lagos',
    grade: '2:2'
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
    if (this.selectedSector !== 'All') {
      this.filterSector['selectedSector'] = this.selectedSector;
    }
    if (this.selectedInstitution !== 'All') {
      this.filterInstituition['selectedInstituition'] = this.selectedInstitution;
    }
    if (this.documentType !== 'All') {
      this.filterDocument['documentType'] = this.documentType;
    }
    
    ////console.log(this.filterStatus,this.filterOption,this.filterSector,this.filterInstituition,this.filterDocument);
  }

  clearFilter() {
    this.status = 'All';
    this.filterStatus = { status: 'All' };
    this.selectedOption = 'All Time';
    this.filterOption = { selectedOption : 'All Time'};
    this.selectedSector = 'All'
    this.filterSector = { selectedSector: 'All'};
    this.selectedInstitution = 'All'
    this.filterInstituition = {selectedInstituition: 'All'};
    this.documentType = 'All'
    this.filterDocument = {documentType: 'All'};
  }


}
