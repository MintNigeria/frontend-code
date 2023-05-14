import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { DateRangeComponent } from 'src/app/shared/date-range/date-range.component';
import { exportGraduateApplicationAsExcel, exportGraduateApplicationAsExcelSuccess, exportGraduateApplicationCSV, exportGraduateApplicationCSVSuccess, getAllGraduateRequestForGradaute, getAllGraduateRequestForGradauteSuccess, graduateDocumentTypeFilter, graduateDocumentTypeFilterSuccess } from 'src/app/store/graduates/action';
import { getOrganizationSubscriptionHistory } from 'src/app/store/organization/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  selectedOption: string = "All Time";
  selectedInstituition : string = "All";
  selectedSector : string = "All";
  documentType: string = "All";
  status: string = "All";
  showDocType : boolean = false;
  showDate : boolean = false;
  showStatus : boolean = false;

  filterStatus = { status: 'All'};
  filterOption = {selectedOption : 'All Time'};
  filterSector = { selectedSector: 'All'};
  filterInstituition = {selectedInstituition: 'All'};
  filterDocument = {documentType: 'All'};

  array = []
  graduateList: any;

  filter= {
    'TimeBoundSearchVm.TimeRange': 0,
    keyword: '',
      filter: '',
      pageSize: 10,
      pageIndex: 1,
      documentType: ''
   }
   userData: any;
    applicationList: any;
    total: any;
  pageIndex = 1
  searchForm = new FormGroup({
    searchPhrase: new FormControl(''),
  });

  requestStatus = [
    { name: 'PENDING',  value: 1},
    { name: 'PROCESSING',  value: 2},
    { name: 'DISPATCHED',  value: 3},
    { name: 'PAUSED',  value: 4},
    { name: 'DELIVERED',  value: 5},
    { name: 'DECLINED',  value: 6},
    { name: 'COMPLETED',  value: 7},
  ]
  documentTypeList: any;
  
  constructor(
    private appStore: Store<AppStateInterface>,
    private store: Store,
    private actions$: Actions,
    private utilityService: UtilityService,
    private dialog: MatDialog

  ) { }

  ngOnInit(): void {
    // getAllGraduateRequestForGradaute
    const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)
    this.store.dispatch(getAllGraduateRequestForGradaute({payload: {...this.filter, GraduateId: this.userData.GraduateId}}))
    this.actions$.pipe(ofType(getAllGraduateRequestForGradauteSuccess)).subscribe((res: any) => {
      this.graduateList = res.payload.payload
      this.total = res.payload.totalCount
      // this.balance = res.payload;
    })
    this.store.dispatch(graduateDocumentTypeFilter({id: this.userData.GraduateId}))
    this.actions$.pipe(ofType(graduateDocumentTypeFilterSuccess)).subscribe((res: any) => {
      this.documentTypeList = res.payload
    })
    this.searchForm.controls.searchPhrase.valueChanges
    .pipe(debounceTime(400), distinctUntilChanged())
    .subscribe((term) => {
      this.search(term as string);
    });

  }
  
  addFilter() {
    this.store.dispatch(getAllGraduateRequestForGradaute({payload: {...this.filter, GraduateId: this.userData.GraduateId}}))
    
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
        documentType: ''
     }
    this.store.dispatch(getAllGraduateRequestForGradaute({payload: {...filter, GraduateId: this.userData.GraduateId}}))
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
      const filter = {...this.filter, ['range'] : range};
      this.filter = filter;
    }
  }

  search(event: any) {
    if (event) {
      const filter = {...this.filter, ['keyword'] : event}
      this.store.dispatch(getAllGraduateRequestForGradaute({payload: {...filter, GraduateId: this.userData.GraduateId}}))
      
    } else {
      const filter = {...this.filter, ['keyword'] : ''}
      this.store.dispatch(getAllGraduateRequestForGradaute({payload: {...this.filter, GraduateId: this.userData.GraduateId}}))
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
    this.store.dispatch(exportGraduateApplicationCSV({payload: {...this.filter, GraduateId: this.userData.GraduateId}}))
    this.actions$.pipe(ofType(exportGraduateApplicationCSVSuccess)).subscribe((res: any) => {
       const link = document.createElement('a');
        link.download = `${res.payload?.fileName}.csv`;
        link.href = 'data:image/png;base64,' + res.payload?.base64;
        link.click();
    })  
  }

  downloadExcel() {
    this.store.dispatch(exportGraduateApplicationAsExcel({payload: {...this.filter, GraduateId: this.userData.GraduateId}}))
    this.actions$.pipe(ofType(exportGraduateApplicationAsExcelSuccess)).subscribe((res: any) => {
       const link = document.createElement('a');

        link.download = `${res.payload?.fileName}.xlsx`;
        link.href = 'data:image/png;base64,' + res.payload?.base64;
        link.click();
    })
  }

  
  changeDocumentType(name: string, type: any) {
    this.documentType = type
    this.showDocType = true;
    const filter = {...this.filter, ['documentType'] : type};
    this.filter = filter;
  }

  
  changeStatus(status: number, name: string) {
    this.status = name
    this.showStatus = true;
    const filter = {...this.filter, ['status'] : status};
    this.filter = filter;
  }

  getPage(currentPage: number) {
    const filter = {...this.filter, ['pageIndex'] : currentPage}
    this.store.dispatch(getAllGraduateRequestForGradaute({payload: {...filter, GraduateId: this.userData.GraduateId}}))
  }
}
