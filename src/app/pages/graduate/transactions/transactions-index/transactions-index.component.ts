import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { DateRangeComponent } from 'src/app/shared/date-range/date-range.component';
import { exportGraduateTransactionAsCSV, exportGraduateTransactionAsCSVSuccess, exportGraduateTransactionAsExcel, exportGraduateTransactionAsExcelSuccess, getGraduateTransactionHistory, getGraduateTransactionHistorySuccess, getGraduateWalletId, getGraduateWalletIdSuccess, graduateTransactionTypeFilter, graduateTransactionTypeFilterSuccess } from 'src/app/store/graduates/action';
import { getOrganizationSubscriptionHistory } from 'src/app/store/organization/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-transactions-index',
  templateUrl: './transactions-index.component.html',
  styleUrls: ['./transactions-index.component.scss']
})
export class TransactionsIndexComponent implements OnInit {
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

  transactionHistory: any
  userData: any;
  transactionDetails: any;
  total: any;
  walletData: any;
  filter= {
    'TimeBoundSearchVm.TimeRange': 0,
    keyword: '',
      filter: '',
      pageSize: 10,
      pageIndex: 1,
   }
   searchForm = new FormGroup({
    searchPhrase: new FormControl(''),
  });
  pageIndex = 1
  transactionType: any;

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
    this.userData = JSON.parse(data)
    this.store.dispatch(getGraduateWalletId())
    this.actions$.pipe(ofType(getGraduateWalletIdSuccess)).subscribe((res: any) => {
      this.walletData = res.payload.payload;
    })
    this.store.dispatch(getGraduateTransactionHistory({payload:{...this.filter, GraduateId: this.userData.GraduateId}}))
    this.actions$.pipe(ofType(getGraduateTransactionHistorySuccess)).subscribe((res: any) => {
      this.transactionHistory = res.payload.payload;
      this.total = res.payload.totalCount
    })
    this.store.dispatch(graduateTransactionTypeFilter())
    this.actions$.pipe(ofType(graduateTransactionTypeFilterSuccess)).subscribe((res: any) => {
      console.log(res)
      this.transactionType = res.payload
    })
    this.searchForm.controls.searchPhrase.valueChanges
    .pipe(debounceTime(400), distinctUntilChanged())
    .subscribe((term) => {
      this.search(term as string);
    });
  }

  addFilter() {
   
    this.store.dispatch(getGraduateTransactionHistory({payload:{...this.filter, GraduateId: this.userData.GraduateId}}))

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
    const filter= {
      'TimeBoundSearchVm.TimeRange': 0,
      keyword: '',
        filter: '',
        pageSize: 10,
        pageIndex: 1,
     }
    this.store.dispatch(getGraduateTransactionHistory({payload:{...filter, GraduateId: this.userData.GraduateId}}))

  }

  
  changeRange(range: number, name: string) {
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
      const filter = {...this.filter, ['range'] : range};
      this.filter = filter;
    }
  }
  

  changeStatus(status: number, name: string) {
    this.status = name
    const filter = {...this.filter, ['status'] : status};
    this.filter = filter;
  }
  changeType(name: string) {
    this.documentType = name
    const filter = {...this.filter, ['TransactionType'] : name};
    this.filter = filter;
  }

  search(event: any) {
    if (event) {
      const filter = {...this.filter, ['keyword'] : event}
      this.store.dispatch(getGraduateTransactionHistory({payload:{...filter, GraduateId: this.userData.GraduateId}}))
    } else {
        const filter = {...this.filter, ['keyword'] : ''}
        this.store.dispatch(getGraduateTransactionHistory({payload:{...this.filter, GraduateId: this.userData.GraduateId}}))
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
    this.store.dispatch(exportGraduateTransactionAsCSV({payload: {...this.filter, GraduateId: this.userData.GraduateId}}))
    this.actions$.pipe(ofType(exportGraduateTransactionAsCSVSuccess)).subscribe((res: any) => {
       const link = document.createElement('a');
        link.download = `${res.payload?.fileName}.csv`;
        link.href = 'data:image/png;base64,' + res.payload?.base64;
        link.click();
    })  
  }

  downloadExcel() {
    this.store.dispatch(exportGraduateTransactionAsExcel({payload: {...this.filter, GraduateId: this.userData.GraduateId}}))
    this.actions$.pipe(ofType(exportGraduateTransactionAsExcelSuccess)).subscribe((res: any) => {
       const link = document.createElement('a');
        link.download = `${res.payload?.fileName}.xlsx`;
        link.href = 'data:image/png;base64,' + res.payload?.base64;
        link.click();
    })
  }

  getPage(currentPage: number) {
    this.pageIndex = currentPage
    const filter = {...this.filter, ['pageIndex'] : currentPage}
    this.store.dispatch(getGraduateTransactionHistory({payload:{...filter, GraduateId: this.userData.GraduateId}}))
  }

}
