import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { DateRangeComponent } from 'src/app/shared/date-range/date-range.component';
import { getFacultyAndDepartmentByInstitutionName, getFacultyAndDepartmentByInstitutionNameSuccess } from 'src/app/store/institution/action';
import { getOrganizationWalletId, getOrganizationWalletIdSuccess, getOrganizationSubscriptionHistory, getOrganizationSubscriptionHistorySuccess, getOrganizationVerificationHistory, getOrganizationVerificationHistorySuccess, verifyHistoryInstitutionDropdown, verifyHistoryInstitutionDropdownSuccess } from 'src/app/store/organization/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

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

  filter= {
    'TimeBoundSearchVm.TimeRange': 0,
    keyword: '',
      filter: '',
      pageSize: 10,
      pageIndex: 1,
   }
   userData: any;
    history: any;
    total: any;
  pageIndex = 1
  searchForm = new FormGroup({
    searchPhrase: new FormControl(''),
  });
  institutionList: any;



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
    this.store.dispatch(verifyHistoryInstitutionDropdown({id: this.userData.OrganizationId}))
    this.actions$.pipe(ofType(verifyHistoryInstitutionDropdownSuccess)).subscribe((res: any) => {
      console.log(res)
      this.institutionList = res.payload.payload
      // this.balance = res.payload;
    })
    this.store.dispatch(getOrganizationVerificationHistory({payload: {...this.filter, OrganizationId: this.userData.OrganizationId}}))
    this.actions$.pipe(ofType(getOrganizationVerificationHistorySuccess)).subscribe((res: any) => {
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
    // if (this.status !== 'All') {
    //   this.filterStatus['status'] = this.status;
    // }
    // if (this.selectedOption !== 'All Time') {
    //   this.filterOption['selectedOption'] = this.selectedOption;
    // }
    // if (this.selectedSector !== 'All') {
    //   this.filterSector['selectedSector'] = this.selectedSector;
    // }
    // if (this.selectedInstitution !== 'All') {
    //   this.filterInstituition['selectedInstituition'] = this.selectedInstitution;
    // }
    // if (this.documentType !== 'All') {
    //   this.filterDocument['documentType'] = this.documentType;
    // }
    
    this.store.dispatch(getOrganizationVerificationHistory({payload: {...this.filter, OrganizationId: this.userData.OrganizationId}}))
  }

  clearFilter() {
    this.status = 'All';
    this.filterStatus = { status: 'All' };
    this.selectedOption = 'All Time';
    this.filterOption = { selectedOption : 'All Time'};
    this.selectedSector = 'All'
    this.filterSector = { selectedSector: 'All'};
    this.selectedInstitution = 'All'
    this.filterInstituition = {selectedInstituition: 'All'};
    this.documentType = 'All'
    this.filterDocument = {documentType: 'All'};
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
  

  // changeStatus(status: number, name: string) {
  //   this.status = name
  //   const filter = {...this.filter, ['status'] : status};
  //   this.filter = filter;
  // }
  changeInstitution(name: string) {
    this.selectedInstitution = name
    const filter = {...this.filter, ['InstitutionName'] : status};
    this.filter = filter;
    this.store.dispatch(getFacultyAndDepartmentByInstitutionName({payload: {institutionName: name}}))
    this.actions$.pipe(ofType(getFacultyAndDepartmentByInstitutionNameSuccess)).subscribe((res: any) => {
      console.log(res)
    })
  }

  search(event: any) {
    if (event) {
      const filter = {...this.filter, ['keyword'] : event}
      this.store.dispatch(getOrganizationVerificationHistory({payload: {...filter, OrganizationId: this.userData.OrganizationId}}))
    } else {
        const filter = {...this.filter, ['keyword'] : ''}
        this.store.dispatch(getOrganizationVerificationHistory({payload: {...this.filter, OrganizationId: this.userData.OrganizationId}}))
      }
  }

  getPage(currentPage: number) {
    const filter = {...this.filter, ['pageIndex'] : currentPage}
    this.store.dispatch(getOrganizationVerificationHistory({payload: {...filter, OrganizationId: this.userData.OrganizationId}}))
  }


}
