import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organization-request',
  templateUrl: './organization-request.component.html',
  styleUrls: ['./organization-request.component.scss']
})
export class OrganizationRequestComponent implements OnInit {
selectedOption: string = 'All Time';
  selectedInstituition: string = 'All';
  selectedSector: string = 'All';
  documentType: string = 'All';
  status: string = 'All';

  filterStatus = { status: 'All' };
  filterOption = { selectedOption: 'All Time' };
  filterSector = { selectedSector: 'All' };
  filterInstituition = { selectedInstituition: 'All' };
  filterDocument = { documentType: 'All' };

  array = [];

  graduateList = [
    {
      id: '1',
      requestID: '#3086',
      date: '12/01/2023',
      name: 'AdeKunle Ciroma',
      number: '080912002',
      docType: 'Certificate(Original)',
      institution: 'University of Lagos',
      reasonForRequest: 'Educational Verification',
      status: 'Successful',
      action: 'view',
    },
    {
      id: '2',
      requestID: '#3086',
      date: '12/01/2023',
      name: 'Phoenix Baker',
      number: '080912002',
      docType: 'Certificate(Original)',
      institution: 'University of Benin',
      reasonForRequest: 'Educational Verification',
      status: 'Failed',
      action: 'view',
    },
    {
      id: '3',
      requestID: '#3086',
      date: '12/01/2023',
      name: 'Lane Ciroma',
      number: '080912002',
      docType: 'Certificate(Original)',
      institution: 'Lagos State University',
      reasonForRequest: 'Educational Verification',
      status: 'Failed',
      action: 'view',
    },
    {
      id: '4',
      requestID: '#3086',
      date: '12/01/2023',
      name: 'Demi Wiki',
      number: '080912002',
      docType: 'Certificate(Original)',
      institution: 'Yaba Technology',
      reasonForRequest: 'Educational Verification',
      status: 'Failed',
      action: 'view',
    },
    {
      id: '5',
      requestID: '#3086',
      date: '12/01/2023',
      name: 'AdeKunle Ciroma',
      number: '080912002',
      docType: 'Certificate(Original)',
      institution: 'University of Lagos',
      reasonForRequest: 'Educational Verification',
      status: 'Successful',
      action: 'view',
    },
    {
      id: '6',
      requestID: '#3086',
      date: '12/01/2023',
      name: 'AdeKunle Ciroma',
      number: '080912002',
      docType: 'Certificate(Original)',
      institution: 'University of Lagos',
      reasonForRequest: 'Educational Verification',
      status: 'Successful',
      action: 'view',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

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
      this.filterInstituition['selectedInstituition'] =
        this.selectedInstituition;
    }
    if (this.documentType !== 'All') {
      this.filterDocument['documentType'] = this.documentType;
    }

    console.log(
      this.filterStatus,
      this.filterOption,
      this.filterSector,
      this.filterInstituition,
      this.filterDocument
    );
  }

  clearFilter() {
    this.status = 'All';
    this.filterStatus = { status: 'All' };
    this.selectedOption = 'All Time';
    this.filterOption = { selectedOption: 'All Time' };
    this.selectedSector = 'All';
    this.filterSector = { selectedSector: 'All' };
    this.selectedInstituition = 'All';
    this.filterInstituition = { selectedInstituition: 'All' };
    this.documentType = 'All';
    this.filterDocument = { documentType: 'All' };
  }

}
