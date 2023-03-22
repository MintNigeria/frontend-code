import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { invokeGetTransactions, invokeGetTransactionsSuccess } from 'src/app/store/reporting/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

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
  
  searchForm = new FormGroup({
    searchPhrase: new FormControl(''),
  });
  

  

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
  institutionId: any;
  institutionData: any;
  pageIndex = 1;
filter = {
  keyword: '',
    filter: '',
    pageSize: 10,
    pageIndex: 1,
    requestor: 1,
    range: '',
    fromDate: '',
    toDate: '',
    status: '',
}
  transactionDetails: any;
  totalCount: any;
  
  


  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions
  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.institutionData = JSON.parse(data)
    this.institutionId = this.institutionData.InstitutionId
    this.store.dispatch(invokeGetTransactions({institutionId: this.institutionId, payload: this.filter}))
    this.actions$.pipe(ofType(invokeGetTransactionsSuccess)).subscribe((res: any) => {
      console.log(res)
      this.transactionDetails = res.payload.data;
      this.totalCount = res.payload.totalCount
    })
    this.searchForm.controls.searchPhrase.valueChanges
    .pipe(debounceTime(400), distinctUntilChanged())
    .subscribe((term) => {
      this.search(term as string);
    });
    
  }

  showData(id: number) {
    this.selectedData = this.transactionDetails?.minifiedTransactionInfoVMs.find((data: any) => data.id === id);
    this.transactionDetails?.minifiedTransactionInfoVMs.filter((transaction : any) => {
      if (transaction.id === id) {
        this. selectedDataId = transaction.id
      }
    });

    console.log(this.selectedData,this.selectedDataId)
  }

  addFilter() {
    // if (this.status !== 'All') {
    //   this.filterStatus['status'] = this.status;
    // }
    // if (this.selectedOption !== 'All Time') {
    //   this.filterOption['selectedOption'] = this.selectedOption;
    // }
    // if (this.selectedSector !== 'All') {
    //   this.filterSector['selectedSector'] = this.selectedSector;
    // }
    // if (this.selectedInstituition !== 'All') {
    //   this.filterInstituition['selectedInstituition'] = this.selectedInstituition;
    // }
    // if (this.documentType !== 'All') {
    //   this.filterDocument['documentType'] = this.documentType;
    // }

    this.store.dispatch(invokeGetTransactions({institutionId: this.institutionId, payload: this.filter}))

    
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

  changeInitiator(status: number, name: string) {
    this.transactionType = name
    const filter = {...this.filter, ['requestor'] : status}
    this.filter = filter;
  }

  search(event: any) {
    if (event) {
      const filter = {...this.filter, ['keyword'] : event}
      this.store.dispatch(invokeGetTransactions({institutionId: this.institutionId, payload: filter}))
      } else {
        const filter = {...this.filter, ['keyword'] : ''}
        this.store.dispatch(invokeGetTransactions({institutionId: this.institutionId, payload: filter}))
    }
  }


  getPage(currentPage: number) {
    const filter = {...this.filter, ['pageIndex'] : currentPage}
    this.store.dispatch(invokeGetTransactions({institutionId: this.institutionId, payload: filter}))

    
  
  }

}
