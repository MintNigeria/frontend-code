import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { DateRangeComponent } from 'src/app/shared/date-range/date-range.component';
import { exportInstitutionGraduateRequestCSV, exportInstitutionGraduateRequestExcel, getAllInstitutionGraduateRequest } from 'src/app/store/request/action';
import { requestSelector } from 'src/app/store/request/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { getInstitutionConfiguration, getInstitutionConfigurationSuccess } from 'src/app/store/configuration/action';

@Component({
  selector: 'app-graduate-request',
  templateUrl: './graduate-request.component.html',
  styleUrls: ['./graduate-request.component.scss']
})
export class GraduateRequestComponent implements OnInit {

  graduatesRequest$ = this.appStore.pipe(select(requestSelector))

  selectedOption: string = "All Time";
  selectedInstituition : string = "All";
  selectedSector : string = "All";
  documentType: string = "All";
  status: string = "All";
  showDocType : boolean = false;
  filterStatus = { status: 'All'};
  filterOption = {selectedOption : 'All Time'};
  filterSector = { selectedSector: 'All'};
  filterInstituition = {selectedInstituition: 'All'};
  filterDocument = {documentType: 'All'};
  array = []
  showStatus : boolean = false;
  showDate : boolean = false;

 
 searchForm = new FormGroup({
  searchPhrase: new FormControl(''),
});
 institutionId: any = '';
 institutionData: any;
 pageIndex = 1;

  filterParams = {
  institutionId: '',
  DocumentType: '',
  status: '',
  keyword: '',
    filter: '',
    pageSize: 10,
    pageIndex: 1,
    range: '',
    fromDate: '',
    toDate: '',
}

exportFilterParam = {
  InstitutionId: '',
  DocumentType: '',
  status: '',
  keyword: '',
    filter: '',
    range: '',
    fromDate: '',
    toDate: '',
}
  processingFeeList: any;


 constructor(
  private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
    private dialog: MatDialog
 ) {}

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.institutionData = JSON.parse(data)
    this.institutionId = this.institutionData.InstitutionId
    this.store.dispatch(getAllInstitutionGraduateRequest({payload: {...this.filterParams, institutionId: this.institutionId}}))
    this.searchForm.controls.searchPhrase.valueChanges
    .pipe(debounceTime(400), distinctUntilChanged())
    .subscribe((term) => {
      this.search(term as string);
    });
    this.store.dispatch(getInstitutionConfiguration({institutionId: this.institutionId}))
    this.actions$.pipe(ofType(getInstitutionConfigurationSuccess)).subscribe((res: any) => {
      this.processingFeeList = res.payload.processingFeesVM
      // this.processingFees = res.payload
    })
  }

  
  viewRequest(id: any) {
    this.router.navigateByUrl(`/institution/requests/graduate/${id}`)
  }

  



  addFilter() {
    this.store.dispatch(getAllInstitutionGraduateRequest({payload: {...this.filterParams, institutionId: this.institutionId}}))
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
   const filterParams = {
      institutionId: '',
      DocumentType: '',
      status: '',
      keyword: '',
        filter: '',
        pageSize: 10,
        pageIndex: 1,
        range: '',
        fromDate: '',
        toDate: '',
    }
    this.store.dispatch(getAllInstitutionGraduateRequest({payload: {...filterParams, institutionId: this.institutionId}}))

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
              ////console.log(res)
              const {start , end} = res; // use this start and end as fromDate and toDate on your filter
              this.selectedOption = `${start} - ${end}`
              const filter = {...this.filterParams, ['fromDate'] : start, ['toDate'] : end}
              this.filterParams = filter;
              const filterExport = {...this.exportFilterParam, ['fromDate'] : start, ['toDate'] : end}

              this.exportFilterParam = filterExport
        }
  
      })
    } else {
      const filter = {...this.filterParams, ['range'] : String(range)};
      const filterExport = {...this.exportFilterParam, ['range'] : String(range)};
      this.filterParams = filter;
      this.exportFilterParam = filterExport
    }
  }

  changeDocumentType(name: string) {
    this.documentType = name;
    const filter = {...this.filterParams, ['DocumentType'] : name}
    this.filterParams = filter;
    const filterExport = {...this.exportFilterParam, ['DocumentType'] : name}
    this.exportFilterParam = filterExport
    this.showDocType = true;

  }
  changeStatus(status: number, name: string) {
    this.status = name
    const filter = {...this.filterParams, ['status'] : String(status)};
    this.filterParams = filter;
    const filterExport = {...this.exportFilterParam, ['status'] : String(status)};

    this.showStatus = true;
    this.exportFilterParam = filterExport
  }

  search(event: any) {
    if (event) {
      const filter = {...this.filterParams, ['keyword'] : event}
      this.store.dispatch(getAllInstitutionGraduateRequest({payload: {...filter, institutionId: this.institutionId}}))
    } else {
        const filter = {...this.filterParams, ['keyword'] : ''}
        this.store.dispatch(getAllInstitutionGraduateRequest({payload: {...filter, institutionId: this.institutionId}}))
      }
  }

  // download(type: string) {
  //   if (type === 'CSV') {
  //     this.downloadCSV()
  //   } else {
  //     this.downloadExcel()

  //   }
  // }


  downloadCSV() {

   this.store.dispatch(exportInstitutionGraduateRequestCSV({payload : { ...this.exportFilterParam, InstitutionId: this.institutionId}}))
  }

  downloadExcel() {
    // this.store.dispatch(exportTransactionExcel({institutionId: this.institutionId}))
    // this.actions$.pipe(ofType(exportTransactionExcelSuccess)).subscribe((res: any) => {
    //    const link = document.createElement('a');
    //     link.download = `${res.payload?.fileName}.xlsx`;
    //     link.href = 'data:image/png;base64,' + res.payload?.base64String;
    //     link.click();
    // })
    this.store.dispatch(exportInstitutionGraduateRequestExcel({payload : { InstitutionId : this.institutionId}}))

  }

  getPage(currentPage: number) {
    const filter = {...this.filterParams, ['pageIndex'] : currentPage}
    this.store.dispatch(getAllInstitutionGraduateRequest({payload: {...this.filterParams, institutionId: this.institutionId}}))
  }


}
