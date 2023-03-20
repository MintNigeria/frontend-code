import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

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

  


  institutionList = [
  {
    id: '1',
    date: '12/01/2023',
    initiator: 'Adekunle Ciroma',
    docType: 'Certificate (Template)',
    reason: 'Educational Purpose',
    time: '12:24am'
  },
  {
    id: '2',
    date: '12/01/2023',
    initiator: 'Adekunle Ciroma',
    docType: 'Certificate (Template)',
    reason: 'Educational Purpose',
    time: '12:24am'
  },
  {
    id: '3',
    date: '12/01/2023',
    initiator: 'Adekunle Ciroma',
    docType: 'Certificate (Template)',
    reason: 'Educational Purpose',
    time: '12:24am'
  },
  {
    id: '4',
    date: '12/01/2023',
    initiator: 'Adekunle Ciroma',
    docType: 'Certificate (Template)',
    reason: 'Educational Purpose',
    time: '12:24am'
  },
  {
    id: '5',
    date: '12/01/2023',
    initiator: 'Adekunle Ciroma',
    docType: 'Certificate (Template)',
    reason: 'Educational Purpose',
    time: '12:24am'
  },
  {
    id: '6',
    date: '12/01/2023',
    initiator: 'Adekunle Ciroma',
    docType: 'Certificate (Template)',
    reason: 'Educational Purpose',
    time: '12:24am'
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
    
    console.log(this.filterStatus,this.filterOption,this.filterSector,this.filterInstituition,this.filterDocument);
  }


}
