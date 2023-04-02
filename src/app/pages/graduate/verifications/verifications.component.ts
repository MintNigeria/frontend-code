import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { DateRangeComponent } from 'src/app/shared/date-range/date-range.component';
import { exportGraduateVerificationAsExcel, exportGraduateVerificationAsExcelSuccess, exportGraduateVerificationCSV, exportGraduateVerificationCSVSuccess, getGraduateCertificateVerifications, getGraduateCertificateVerificationsSuccess } from 'src/app/store/graduates/action';
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

  verificationList: any

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
  graduateData: any;
  graduateId: any;

  constructor(
  
    private dialog: MatDialog,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
    private utilityService: UtilityService,
    private notification: NotificationsService
  ){}

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.graduateData = JSON.parse(data)
    this.graduateId = this.graduateData.GraduateId
    this.store.dispatch(getGraduateCertificateVerifications({payload: {...this.filter, GraduateId: this.graduateId}}))
    this.actions$.pipe(ofType(getGraduateCertificateVerificationsSuccess)).subscribe((res: any) => {
      this.verificationList= res.payload.payload
      this.total= res.payload.totalCount
    })
    this.searchForm.controls.searchPhrase.valueChanges
    .pipe(debounceTime(400), distinctUntilChanged())
    .subscribe((term) => {
      this.search(term as string);
    });
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
    this.store.dispatch(getGraduateCertificateVerifications({payload: {...filter, GraduateId: this.graduateId}}))

  }

  addFilter() {
   
    
    this.store.dispatch(getGraduateCertificateVerifications({payload: {...this.filter, GraduateId: this.graduateId}}))
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
              const filter = {...this.filter, ['TimeBoundSearchVm.FromDate'] : start, ['TimeBoundSearchVm.ToDate'] : end}
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
      this.store.dispatch(getGraduateCertificateVerifications({payload: {...filter, GraduateId: this.graduateId}}))
    } else {
        const filter = {...this.filter, ['keyword'] : ''}
        this.store.dispatch(getGraduateCertificateVerifications({payload: {...this.filter, GraduateId: this.graduateId}}))
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
    this.store.dispatch(exportGraduateVerificationCSV({payload: {...this.filter, GraduateId: this.graduateId}}))
    this.actions$.pipe(ofType(exportGraduateVerificationCSVSuccess)).subscribe((res: any) => {
       const link = document.createElement('a');
       console.log(res)
        link.download = `${res.payload?.fileName}.csv`;
        link.href = 'data:image/png;base64,' + res.payload?.base64;
        link.click();
    })  
  }

  downloadExcel() {
    this.store.dispatch(exportGraduateVerificationAsExcel({payload: {...this.filter, GraduateId: this.graduateId}}))
    this.actions$.pipe(ofType(exportGraduateVerificationAsExcelSuccess)).subscribe((res: any) => {
       const link = document.createElement('a');

        link.download = `${res.payload?.fileName}.xlsx`;
        link.href = 'data:image/png;base64,' + res.payload?.base64;
        link.click();
    })
  }

  getPage(currentPage: number) {
    const filter = {...this.filter, ['pageIndex'] : currentPage}
    this.store.dispatch(getGraduateCertificateVerifications({payload: {...filter, GraduateId: this.graduateId}}))
  }


}

