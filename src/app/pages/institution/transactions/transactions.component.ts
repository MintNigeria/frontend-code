import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  selectedOption: string = "All Time";
  selectedInstituition : string = "All";
  selectedSector : string = "All";
  documentType: string = "All";
  transactionType: string = "Graduates";
  status: string = "All";

  filterStatus = { status: 'All'};
  filterOption = {selectedOption : 'All Time'};
  filterSector = { selectedSector: 'All'};
  filterInstituition = {selectedInstituition: 'All'};
  filterDocument = {documentType: 'All'};


  selectedData: any;
  selectedDataId: any;
  
  

  

  transactionData = {
    amount: "2,000",
    transactionID: "1228199FHX",
    date: "12th June , 2022",
    time: "12:01pm",
    type: "Certificate Verification",
    paymentType: "Wallet",
    status: "successful"
  }

  descriptionData = 
    {
      id:1,
      initiator: 'Adekunle Ciroma',
      matric: '12345',
      degree: 'B.Sc Mathematics',
      gradYear: '2019',
      dispatchMethod: 'NIPOST',

    }


  transactionList = [
    {
    id: 1,
    date: 'Jan 6,2022',
    initiator: 'Adekunle Ciroma',
    amount: '2,000',
    action: 'view',
    
  },
  {
    id: 2,
    date: 'Jan 6,2022',
    initiator: 'Adekunle Ciroma',
    amount: '2,000',
    action: 'view',
    
  },
  {
    id: 3,
    date: 'Jan 6,2022',
    initiator: 'Adekunle Ciroma',
    amount: '2,000',
    action: 'view',
    
  },
  {
    id: 4,
    date: 'Jan 6,2022',
    initiator: 'Adekunle Ciroma',
    amount: '2,000',
    action: 'view',
    
  },
  {
    id: 5,
    date: 'Jan 6,2022',
    initiator: 'Adekunle Ciroma',
    amount: '2,000',
    action: 'view',
    
  },
  {
    id: 6,
    date: 'Jan 6,2022',
    initiator: 'Adekunle Ciroma',
    amount: '2,000',
    action: 'view',
    
  },
   {
    id: 7,
    date: 'Jan 6,2022',
    initiator: 'Adekunle Ciroma',
    amount: '2,000',
    action: 'view',
    
  },
   {
    id: 8,
    date: 'Jan 6,2022',
    initiator: 'Adekunle Ciroma',
    amount: '2,000',
    action: 'view',
    
  },
   {
    id: 9,
    date: 'Jan 6,2022',
    initiator: 'Adekunle Ciroma',
    amount: '2,000',
    action: 'view',
    
  },
   {
    id: 10,
    date: 'Jan 6,2022',
    initiator: 'Adekunle Ciroma',
    amount: '2,000',
    action: 'view',
    
  }
  ]
  

  
  


  

  constructor() { }

  ngOnInit(): void {
  }

  showData(id: number) {
    this.selectedData = this.transactionList.find(data => data.id === id);
    this.selectedDataId = this.transactionList.find((transaction) => transaction.id === id);

    console.log(this.selectedData,this.selectedDataId)
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
    
    console.log(this.filterStatus,this.filterOption,this.filterSector,this.filterInstituition,this.filterDocument);
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


}
