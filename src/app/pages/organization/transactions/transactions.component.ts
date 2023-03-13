import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
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

  


  transactionHistory = [
  {
    id: '1',
    date: 'Jun 8, 2022',
    transactionID: '544666787654',
    transactionType:'Payment Plan',
    amount: 'N2500',
    status: 'successful',
    department: 'Banking and Finance',
    reasonForRequest: 'Educational Verification',
    action: 'View'
  },
  {
    id: '2',
    date: 'Jun 8, 2022',
    transactionID: '544666787654',
    transactionType:'Payment Plan',
    amount: 'N2500',
    status: 'failed',
    department: 'Banking and Finance',
    reasonForRequest: 'Educational Verification',
    action: 'View'
  },
  {
    id: '3',
    date: 'Jun 8, 2022',
    transactionID: '544666787654',
    transactionType:'Payment Plan',
    amount: 'N2500',
    status: 'failed',
    department: 'Banking and Finance',
    reasonForRequest: 'Educational Verification',
    action: 'View'
  },
  {
    id: '4',
    date: 'Jun 8, 2022',
    transactionID: '544666787654',
    transactionType:'Payment Plan',
    amount: 'N2500',
    status: 'successful',
    department: 'Banking and Finance',
    reasonForRequest: 'Educational Verification',
    action: 'View'
  },
  {
    id: '5',
    date: 'Jun 8, 2022',
    transactionID: '544666787654',
    transactionType:'Payment Plan',
    amount: 'N2500',
    status: 'successful',
    department: 'Banking and Finance',
    reasonForRequest: 'Educational Verification',
    action: 'View'
  },
  {
    id: '6',
    date: 'Jun 8, 2022',
    transactionID: '544666787654',
    transactionType:'Payment Plan',
    amount: 'N2500',
    status: 'successful',
    department: 'Banking and Finance',
    reasonForRequest: 'Educational Verification',
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
