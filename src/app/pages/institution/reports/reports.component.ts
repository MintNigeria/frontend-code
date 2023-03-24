import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { DateRangeComponent } from 'src/app/shared/date-range/date-range.component';
import { exportReportCSV, exportReportCSVSuccess, exportReportExcel, exportReportExcelSuccess, invokeGetAllReport, invokeGetAllReportSuccess, invokeGetTransactions, invokeGetTransactionsSuccess } from 'src/app/store/reporting/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

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

 filterParams = {
  institutionId: '',
  InstitutionType: '',
  DocumentType: '',
  Sector: '',
  keyword: '',
    filter: '',
    pageSize: 10,
    pageIndex: 1,
    range: '',
    fromDate: '',
    toDate: '',
}
  institutionData: any;
  institutionId: any;
  pageIndex = 1;

  transactionDetails: any;
  totalCount: any;
  
  searchForm = new FormGroup({
    searchPhrase: new FormControl(''),
  });
  reportDetails: any;
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
    this.store.dispatch(invokeGetAllReport({payload: {...this.filterParams, institutionId: 13}}))
    this.actions$.pipe(ofType(invokeGetAllReportSuccess)).subscribe((res: any) => {
      this.reportDetails = res.payload.data;
      this.totalCount = res.payload.totalCount
    })
    this.searchForm.controls.searchPhrase.valueChanges
    .pipe(debounceTime(400), distinctUntilChanged())
    .subscribe((term) => {
      this.search(term as string);
    });

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
    
    this.store.dispatch(invokeGetAllReport({payload: {...this.filterParams, institutionId: 13}}))
  }

  changeRange(range: number, name: string) {
    this.selectedOption = name
    if (range === 5) {
      const dialogRef = this.dialog.open(DateRangeComponent, {
        height: 'auto',
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe((res: any) => {
        if (res) {
              console.log(res)
              const {start , end} = res; // use this start and end as fromDate and toDate on your filter
              this.selectedOption = `${start} - ${end}`
              const filter = {...this.filterParams, ['fromDate'] : start, ['toDate'] : end}
              this.filterParams = filter;
        }
  
      })
    } else {
      const filter = {...this.filterParams, ['range'] : String(range)};
      this.filterParams = filter;
    }
  }
  
  search(event: any) {
    if (event) {
      const filter = {...this.filterParams, ['keyword'] : event}
      this.store.dispatch(invokeGetAllReport({payload: {...filter, institutionId: 13}}))
    } else {
        const filter = {...this.filterParams, ['keyword'] : ''}
        this.store.dispatch(invokeGetAllReport({payload: {...filter, institutionId: 13}}))
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
    this.store.dispatch(exportReportCSV({institutionId: this.institutionId}))
    this.actions$.pipe(ofType(exportReportCSVSuccess)).subscribe((res: any) => {
       const link = document.createElement('a');
        link.download = `${res.payload?.fileName}.csv`;
        link.href = 'data:image/png;base64,' + res.payload?.base64String;
        link.click();
    })  
  }

  downloadExcel() {
    this.store.dispatch(exportReportExcel({institutionId: this.institutionId}))
    this.actions$.pipe(ofType(exportReportExcelSuccess)).subscribe((res: any) => {
       const link = document.createElement('a');
        link.download = `${res.payload?.fileName}.xlsx`;
        link.href = 'data:image/png;base64,' + res.payload?.base64String;
        link.click();
    })
  }

  
  getPage(currentPage: number) {
    const filter = {...this.filterParams, ['pageIndex'] : currentPage}
    this.store.dispatch(invokeGetAllReport({payload: {...filter, institutionId: this.institutionId}}))
  }


}