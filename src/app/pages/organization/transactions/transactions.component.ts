import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { DateRangeComponent } from 'src/app/shared/date-range/date-range.component';
import { getOrganizationSubscriptionHistory, getOrganizationSubscriptionHistorySuccess, getOrganizationWalletId, getOrganizationWalletIdSuccess } from 'src/app/store/organization/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

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
  showDate : boolean = false;
  showStatus : boolean = false;
  showType : boolean = false;


  filterStatus = { status: 'All'};
  filterOption = {selectedOption : 'All Time'};
  filterSector = { selectedSector: 'All'};
  filterInstituition = {selectedInstituition: 'All'};
  filterDocument = {documentType: 'All'};

  

 filter= {
  'TimeBoundSearchVm.TimeRange': 0,
  keyword: '',
    filter: '',
    pageSize: 10,
    pageIndex: 1,
    status: 5,
 }
 userData: any;
  balance: any;
  history: any;
  total: any;
pageIndex = 1
pageSize = 10
searchForm = new FormGroup({
  searchPhrase: new FormControl(''),
});

  constructor(
    private appStore: Store<AppStateInterface>,
    private store: Store,
    private actions$: Actions,
    private utilityService: UtilityService,
    private dialog: MatDialog

  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)
    this.store.dispatch(getOrganizationWalletId({id: this.userData.OrganizationId}))
    this.actions$.pipe(ofType(getOrganizationWalletIdSuccess)).subscribe((res: any) => {
      ////console.log(res)
      this.balance = res.payload.balance;
    })
    this.store.dispatch(getOrganizationSubscriptionHistory({payload: {...this.filter, OrganizationId: this.userData.OrganizationId}}))
    this.actions$.pipe(ofType(getOrganizationSubscriptionHistorySuccess)).subscribe((res: any) => {
      ////console.log(res)
      this.history = res.payload.payload;
      this.total = res.payload.totalCount
      // this.balance = res.payload;
    })
    this.searchForm.controls.searchPhrase.valueChanges
    .pipe(debounceTime(400), distinctUntilChanged())
    .subscribe((term) => {
      this.search(term as string);
    });
  }

  addFilter() {
    
    this.store.dispatch(getOrganizationSubscriptionHistory({payload: {...this.filter, OrganizationId: this.userData.OrganizationId}}))
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
    const filter= {
      'TimeBoundSearchVm.TimeRange': 0,
      keyword: '',
        filter: '',
        pageSize: 10,
        pageIndex: 1,
     }
    this.store.dispatch(getOrganizationSubscriptionHistory({payload: {...filter, OrganizationId: this.userData.OrganizationId}}))
  }

  changeRange(range: number, name: string) {
    this.selectedOption = name
    this.showDate = true;

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
  

  changeStatus(status: any, name: string) {
    this.status = name
    this.showStatus = true
    const filter = {...this.filter, ['status'] : status};
    this.filter = filter;
  }
  changeType(name: string) {
    this.showType = true
    this.selectedType = name
    const filter = {...this.filter, ['TransactionType'] : name};
    this.filter = filter;
  }

  search(event: any) {
    if (event) {
      const filter = {...this.filter, ['keyword'] : event}
      this.store.dispatch(getOrganizationSubscriptionHistory({payload: {...filter, OrganizationId: this.userData.OrganizationId}}))
    } else {
        const filter = {...this.filter, ['keyword'] : ''}
        this.store.dispatch(getOrganizationSubscriptionHistory({payload: {...this.filter, OrganizationId: this.userData.OrganizationId}}))
      }
  }

  // download(type: string) {
  //   // if (type === 'CSV') {
  //   //   this.downloadCSV()
  //   // } else {
  //   //   this.downloadExcel()  

  //   // }
  // }

  getPage(currentPage: number) {
    const filter = {...this.filter, ['pageIndex'] : currentPage}
    this.filter = filter
    this.store.dispatch(getOrganizationSubscriptionHistory({payload: {...filter, OrganizationId: this.userData.OrganizationId}}))
  }
  
  selectRecordCount(event: any) {
    this.pageSize = event.value
    const filter = {...this.filter, ['pageSize'] : event.value}
    this.filter = filter
    this.store.dispatch(getOrganizationSubscriptionHistory({payload: {...filter, OrganizationId: this.userData.OrganizationId}}))

  }


}
