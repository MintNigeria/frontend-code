import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { DateRangeComponent } from 'src/app/shared/date-range/date-range.component';
import { getAllInstitutionOrganizationRequest } from 'src/app/store/request/action';
import { organisationRequestSelector } from 'src/app/store/request/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-organization-request',
  templateUrl: './organization-request.component.html',
  styleUrls: ['./organization-request.component.scss']
})
export class OrganizationRequestComponent implements OnInit {
  organizationRequest$ = this.appStore.pipe(select(organisationRequestSelector))

selectedOption: string = 'All Time';
  selectedInstituition: string = 'All';
  selectedSector: string = 'All';
  documentType: string = 'All';
  status: string = 'All';

  filterStatus = { status: 'All' };
  filterOption = { selectedOption: 'All Time' };
  filterSector = { selectedSector: 'All' };
  filterInstituition = { selectedInstituition: 'All' };
  filterDocument = { documentType: 'All' };

  array = [];
 
  searchForm = new FormGroup({
    searchPhrase: new FormControl(''),
  });
   institutionId: any;
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
    this.store.dispatch(getAllInstitutionOrganizationRequest({payload: {...this.filterParams, institutionId: this.institutionId}}))
    this.searchForm.controls.searchPhrase.valueChanges
    .pipe(debounceTime(400), distinctUntilChanged())
    .subscribe((term) => {
      this.search(term as string);
    });
  }

  viewRequest(id: any) {
    this.router.navigateByUrl(`/institution/requests/organization/${id}`)
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
      this.filterInstituition['selectedInstituition'] =
        this.selectedInstituition;
    }
    if (this.documentType !== 'All') {
      this.filterDocument['documentType'] = this.documentType;
    }

    console.log(
      this.filterStatus,
      this.filterOption,
      this.filterSector,
      this.filterInstituition,
      this.filterDocument
    );
  }

  clearFilter() {
    this.status = 'All';
    this.filterStatus = { status: 'All' };
    this.selectedOption = 'All Time';
    this.filterOption = { selectedOption: 'All Time' };
    this.selectedSector = 'All';
    this.filterSector = { selectedSector: 'All' };
    this.selectedInstituition = 'All';
    this.filterInstituition = { selectedInstituition: 'All' };
    this.documentType = 'All';
    this.filterDocument = { documentType: 'All' };
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
  changeStatus(status: number, name: string) {
    this.status = name
    const filter = {...this.filterParams, ['status'] : String(status)};
    this.filterParams = filter;
  }

  search(event: any) {
    if (event) {
      const filter = {...this.filterParams, ['keyword'] : event}
      console.log(filter)
      this.store.dispatch(getAllInstitutionOrganizationRequest({payload: {...filter, institutionId: this.institutionId}}))
    } else {
        const filter = {...this.filterParams, ['keyword'] : ''}
        this.store.dispatch(getAllInstitutionOrganizationRequest({payload: {...filter, institutionId: this.institutionId}}))
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
    // this.store.dispatch(exportTransactionCSV({institutionId: this.institutionId}))
    // this.actions$.pipe(ofType(exportTransactionCSVSuccess)).subscribe((res: any) => {
    //    const link = document.createElement('a');
    //     link.download = `${res.payload?.fileName}.csv`;
    //     link.href = 'data:image/png;base64,' + res.payload?.base64String;
    //     link.click();
    // })  
  }

  downloadExcel() {
    // this.store.dispatch(exportTransactionExcel({institutionId: this.institutionId}))
    // this.actions$.pipe(ofType(exportTransactionExcelSuccess)).subscribe((res: any) => {
    //    const link = document.createElement('a');
    //     link.download = `${res.payload?.fileName}.xlsx`;
    //     link.href = 'data:image/png;base64,' + res.payload?.base64String;
    //     link.click();
    // })
  }

  getPage(currentPage: number) {
    const filter = {...this.filterParams, ['pageIndex'] : currentPage}
    this.store.dispatch(getAllInstitutionOrganizationRequest({payload: {...this.filterParams, institutionId: this.institutionId}}))
  }

}
