import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verifications',
  templateUrl: './verifications.component.html',
  styleUrls: ['./verifications.component.scss']
})
export class VerificationsComponent implements OnInit {

  selectedOption: string = "All Time";
  selectedType : string = "All";
  selectedSector : string = "All";
  documentType: string = "All";
  status: string = "All";

  filterStatus = { status: 'All'};
  filterOption = {selectedOption : 'All Time'};
  filterSector = { selectedSector: 'All'};
  filterInstituition = {selectedInstituition: 'All'};
  filterDocument = {documentType: 'All'};

  


  verificationList = [
  {
    id: '1',
    date: '12/01/2023',
    verificationID: '#3066',
    documentType:'Certificate Verification',
    code: '123456789XYZ',
    status: 'completed',
    action: 'View'
  },
  {
    id: '2',
    date: '12/01/2023',
    verificationID: '#3066',
    documentType:'Certificate Verification',
    code: '------',
    status: 'declined',
    action: 'View'
  },
  {
    id: '3',
    date: '12/01/2023',
    verificationID: '#3066',
    documentType:'Certificate Verification',
    code: '------',
    status: 'pending',
    action: 'View'
  },
  {
    id: '4',
    date: '12/01/2023',
    verificationID: '#3066',
    documentType:'Certificate Verification',
    code: '------',
    status: 'declined',
    action: 'View'
  },
  {
    id: '5',
    date: '12/01/2023',
    verificationID: '#3066',
    documentType:'Certificate Verification',
    code: '------',
    status: 'declined',
    action: 'View'
  },
  {
    id: '6',
    date: '12/01/2023',
    verificationID: '#3066',
    documentType:'Certificate Verification',
    code: '123456789XYZ',
    status: 'completed',
    action: 'View'
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
    if (this.selectedType !== 'All') {
      this.filterInstituition['selectedInstituition'] = this.selectedType;
    }
    if (this.documentType !== 'All') {
      this.filterDocument['documentType'] = this.documentType;
    }
    
    console.log(this.filterStatus,this.filterOption,this.filterSector,this.filterInstituition,this.filterDocument);
  }

  clearFilter() {
    this.status = 'All';
    this.filterStatus = { status: 'All' };
    this.selectedOption = 'All Time';
    this.filterOption = { selectedOption : 'All Time'};
    this.selectedSector = 'All'
    this.filterSector = { selectedSector: 'All'};
    this.selectedType = 'All'
    this.filterInstituition = {selectedInstituition: 'All'};
    this.documentType = 'All'
    this.filterDocument = {documentType: 'All'};
  }

}
