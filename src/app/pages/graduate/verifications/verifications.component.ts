import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-verifications',
  templateUrl: './verifications.component.html',
  styleUrls: ['./verifications.component.scss']
})
export class VerificationsComponent implements OnInit {
  selectedOption: string = "All Time";
  selectedInstituition : string = "All";
  selectedSector : string = "All";
  documentType: string = "All";
  status: string = "All";

  filterStatus = { status: 'All'};
  filterOption = {selectedOption : 'All Time'};
  filterSector = { selectedSector: 'All'};
  filterInstituition = {selectedInstituition: 'All'};
  filterDocument = {documentType: 'All'};

  array = []
  graduateList: any;

  verificationList = [
    {
      applicationNumber: '#3066',
      createdOn: '12/01/2023',
      documentType: 'Certificate Verification',
      gradVerificationCode: '123456789XYZ',
      status: 'Completed',
      data: 4,
    
    },
    {
     applicationNumber: '#3066',
      createdOn: '12/01/2023',
      documentType: 'Certificate Verification',
      gradVerificationCode: '123456789XYZ',
      status: 'Declined',
      id: 2,
    
    },
    {
     applicationNumber: '#3066',
      createdOn: '12/01/2023',
      documentType: 'Certificate Verification',
      gradVerificationCode: '123456789XYZ',
      status: 'Pending',
      id: 1,
    
    },
    {
     applicationNumber: '#3066',
      createdOn: '12/01/2023',
      documentType: 'Certificate Verification',
      gradVerificationCode: '123456789XYZ',
      status: 'Declined',
      data: 3
    
    }
  ]

  filter= {
    'TimeBoundSearchVm.TimeRange': 0,
    keyword: '',
      filter: '',
      pageSize: 10,
      pageIndex: 1,
   }
   userData: any;
    applicationList: any;
    total: any;
  pageIndex = 1
  searchForm = new FormGroup({
    searchPhrase: new FormControl(''),
  });
  
  constructor(
  
    private utilityService: UtilityService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
  }


  getPage(currentPage: number) {
    const filter = {...this.filter, ['pageIndex'] : currentPage}
    
  }

  clearFilter() {
    this.status = 'All';
    this.filterStatus = { status: 'All' };
    this.selectedOption = 'All Time';
    this.filterOption = { selectedOption : 'All Time'};
    this.selectedSector = 'All'
    this.filterSector = { selectedSector: 'All'};
    this.selectedInstituition = 'All'
    this.filterInstituition = {selectedInstituition: 'All'};
    this.documentType = 'All'
    this.filterDocument = {documentType: 'All'};
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
    if (this.selectedInstituition !== 'All') {
      this.filterInstituition['selectedInstituition'] = this.selectedInstituition;
    }
    if (this.documentType !== 'All') {
      this.filterDocument['documentType'] = this.documentType;
    }
    
    ////console.log(this.filterStatus,this.filterOption,this.filterSector,this.filterInstituition,this.filterDocument);
  }
}

