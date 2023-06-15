import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { DateRangeComponent } from 'src/app/shared/date-range/date-range.component';
import { exportTransactionCSV, exportTransactionCSVSuccess, exportTransactionExcel, exportTransactionExcelSuccess, invokeGetTransactions, invokeGetTransactionsSuccess } from 'src/app/store/reporting/action';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { MatDialog } from '@angular/material/dialog';
import { getInstitutionConfiguration, getInstitutionConfigurationSuccess } from 'src/app/store/configuration/action';
import { getInstitutionTransactionTypeFilter, getInstitutionTransactionTypeFilterSuccess } from 'src/app/store/institution/action';

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
  transactionType: string = "All";
  status: string = "All";
  showDate : boolean = false;
  showInitiator : boolean = false;
  showTransaction : boolean = false;
  showStatus : boolean = false;

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


  institutionId: any;
  institutionData: any;
  pageIndex = 1;
filter = {
  keyword: '',
    filter: '',
    pageSize: 10,
    pageIndex: 1,
    // requestor: 1,
    'TimeBoundSearchVm.TimeRange': 0,
    status: '',
    transactionType: '',
}
  transactionDetails: any;
  totalCount: any;
  processingFeeList: any;
  transactionTypeList: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
        private dialog: MatDialog

  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.institutionData = JSON.parse(data)
    this.institutionId = this.institutionData.InstitutionId
    this.store.dispatch(invokeGetTransactions({institutionId: this.institutionId, payload: this.filter}))
    this.actions$.pipe(ofType(invokeGetTransactionsSuccess)).subscribe((res: any) => {
      this.transactionDetails = res.payload.data;
      this.totalCount = res.payload.totalCount
    })
    this.store.dispatch(getInstitutionConfiguration({institutionId: this.institutionId}))
    this.actions$.pipe(ofType(getInstitutionConfigurationSuccess)).subscribe((res: any) => {
      this.processingFeeList = res.payload.processingFeesVM
      // this.processingFees = res.payload
    })
    this.store.dispatch(getInstitutionTransactionTypeFilter())
    this.actions$.pipe(ofType(getInstitutionTransactionTypeFilterSuccess)).subscribe((res: any) => {
      this.transactionTypeList = res.payload
    })
    this.searchForm.controls.searchPhrase.valueChanges
    .pipe(debounceTime(400), distinctUntilChanged())
    .subscribe((term) => {
      this.search(term as string);
    });
    this.store.dispatch(getInstitutionConfiguration({institutionId: this.institutionId}))
    
  }

  showData(id: number) {
    this.selectedData = this.transactionDetails?.minifiedTransactionInfoVMs.find((data: any) => data.id === id);
    this.transactionDetails?.minifiedTransactionInfoVMs.filter((transaction : any) => {
      if (transaction.id === id) {
        this.selectedDataId = transaction.id
      }
    });

  }

  addFilter() {
    this.store.dispatch(invokeGetTransactions({institutionId: this.institutionId, payload: this.filter}))
    
  }

  clearFilter() {
    this.status = 'All';
    this.filterStatus = { status: 'All' };
    this.selectedOption = 'All Time';
    this.filterOption = { selectedOption : 'All Time'};
    this.selectedSector = 'All'
    this.transactionType = 'All'
    this.filterSector = { selectedSector: 'All'};
    this.selectedInstituition = 'All'
    this.filterInstituition = {selectedInstituition: 'All'};
    this.documentType = 'All'
    this.filterDocument = {documentType: 'All'};
   const  filter = {
      keyword: '',
        filter: '',
        pageSize: 10,
        pageIndex: 1,
        requestor: 1,
        'TimeBoundSearchVm.TimeRange': 0,
        status: '',
        transactionType: '',
    }
    this.store.dispatch(invokeGetTransactions({institutionId: this.institutionId, payload: filter}))

  }

  changeInitiator(status: number, name: string) {
    this.showInitiator = true;
    this.transactionType = name
    const filter = {...this.filter, ['requestor'] : status}
    this.filter = filter;
  }

  changeRange(range: number, name: string) {
    this.showDate = true;
    this.selectedOption = name
    if (range === 5) {
      // launch calender
      const dialogRef = this.dialog.open(DateRangeComponent, {
        // width: '600px',
        height: 'auto',
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe((res: any) => {
        if (res) {
              const {start , end} = res; // use this start and end as fromDate and toDate on your filter
              this.selectedOption = `${start} - ${end}`
              const filter = {...this.filter, ['TimeBoundSearchVm.FromDate'] : start, ['TimeBoundSearchVm.ToDate'] : end, 'TimeBoundSearchVm.TimeRange': 5}
              this.filter = filter;
        }
  
      })
    } else {
      const filter = {...this.filter, ['TimeBoundSearchVm.TimeRange'] : range};
      this.filter = filter;
    }
  }

  changeDocumentType(name: string) {
    this.showTransaction = true;
    this.documentType = name;
    const filter = {...this.filter, ['transactionType'] : name}
    this.filter = filter;

  }

  changeStatus(status: number, name: string) {
    this.showStatus = true;
    this.status = name
    const filter = {...this.filter, ['status'] : String(status)};
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

  download(type: string) {
    if (type === 'CSV') {
      this.downloadCSV()
    } else {
      this.downloadExcel()

    }
  }

  downloadCSV() {
    this.store.dispatch(exportTransactionCSV({institutionId: this.institutionId}))
    this.actions$.pipe(ofType(exportTransactionCSVSuccess)).subscribe((res: any) => {
       const link = document.createElement('a');
        link.download = `${res.payload?.fileName}.csv`;
        link.href = 'data:image/png;base64,' + res.payload?.base64String;
        link.click();
    })  
  }

  downloadExcel() {
    this.store.dispatch(exportTransactionExcel({institutionId: this.institutionId}))
    this.actions$.pipe(ofType(exportTransactionExcelSuccess)).subscribe((res: any) => {
       const link = document.createElement('a');
        link.download = `${res.payload?.fileName}.xlsx`;
        link.href = 'data:image/png;base64,' + res.payload?.base64String;
        link.click();
    })
  }


  getPage(currentPage: number) {
    const filter = {...this.filter, ['pageIndex'] : currentPage}
    this.store.dispatch(invokeGetTransactions({institutionId: this.institutionId, payload: filter}))
  }

}
