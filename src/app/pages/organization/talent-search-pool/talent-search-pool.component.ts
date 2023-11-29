import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { DateRangeComponent } from 'src/app/shared/date-range/date-range.component';
import { getAllInstitutionDegreeType, getAllInstitutionDegreeTypeSuccess, getAllInstitutionsDropdown, getAllInstitutionsDropdownSuccess, getFacultyAndDepartmentByInstitutionName, getFacultyAndDepartmentByInstitutionNameSuccess } from 'src/app/store/institution/action';
import { getAlltalentSearchPool, getAlltalentSearchPoolSuccess, getOrganizationVerificationHistory, verifyHistoryInstitutionDropdown, verifyHistoryInstitutionDropdownSuccess } from 'src/app/store/organization/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-talent-search-pool',
  templateUrl: './talent-search-pool.component.html',
  styleUrls: ['./talent-search-pool.component.scss']
})
export class TalentSearchPoolComponent implements OnInit {

  selectedOption: string = "All Time";
  selectedInstitution : string = "All";
  selectedSector : string = "All";
  documentType: string = "All";
  status: string = "All";
  selectedFaculty: string = 'All';
  showDate : boolean = false;

  filterStatus = { status: 'All'};
  filterOption = {selectedOption : 'All Time'};
  filterSector = { selectedSector: 'All'};
  filterInstituition = {selectedInstituition: 'All'};
  filterDocument = {documentType: 'All'};

 
 filter= {
  'TimeBoundSearchVM.TimeRange': 0,
  keyword: '',
    filter: '',
    pageSize: 10,
    pageIndex: 1,
 }
 total: any;
//  pageIndex: a

pageIndex = 1
pageSize: number = 10;
 searchForm = new FormGroup({
   searchPhrase: new FormControl(''),
 });
  userData: any;
  institutionList: any;
  poolList: any;
  facultyList: any;
  degreeType: any;

  constructor(
    private appStore: Store<AppStateInterface>,
    private store: Store,
    private actions$: Actions,
    private dialog : MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)
    this.store.dispatch(getAlltalentSearchPool({payload: {...this.filter, organizationId: this.userData.OrganizationId}}))
    this.actions$.pipe(ofType(getAlltalentSearchPoolSuccess)).subscribe((res: any) => {
      this.poolList = res.payload.payload
      this.total = res.payload.totalCount
      // this.balance = res.payload;
    })
    this.store.dispatch(getAllInstitutionsDropdown({payload: {institutionStatus:2}}))
    this.actions$.pipe(ofType(getAllInstitutionsDropdownSuccess)).subscribe((res: any) => {
      this.institutionList = res.payload;
    })
    
  

 this.searchForm.controls.searchPhrase.valueChanges
    .pipe(debounceTime(400), distinctUntilChanged())
    .subscribe((term) => {
      this.search(term as string);
    });
  }

  addFilter() {
    
    this.store.dispatch(getAlltalentSearchPool({payload: {...this.filter, OrganizationId: this.userData.OrganizationId}}))
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
    const filter = {
      'TimeBoundSearchVm.TimeRange': 0,
      keyword: '',
        filter: '',
        pageSize: 10,
        pageIndex: 1,
     }
    this.store.dispatch(getAlltalentSearchPool({payload: {...filter, OrganizationId: this.userData.OrganizationId}}))

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
              const filter = {...this.filter, ['TimeBoundSearchVM.FromDate'] : start, ['TimeBoundSearchVM.ToDate'] : end, 'TimeBoundSearchVM.TimeRange': 5}
              this.filter = filter;
        }
  
      })
    } else {
      const filter = {...this.filter, ['TimeBoundSearchVM.TimeRange'] : range};
      this.filter = filter;
    }
  }
  

  changeFaculty( name: string) {
    this.selectedFaculty = name
    const filter = {...this.filter, ['Faculty'] : name};
    this.filter = filter;
  }

  changeDegree( name: string) {
    this.selectedSector = name
    const filter = {...this.filter, ['Degree'] : name};
    this.filter = filter;
  }
  changeInstitution(data: any) {
    console.log(data)
    this.selectedInstitution = data.institutionName
    const filter = {...this.filter, ['InstitutionName'] : data.institutionName};
    this.filter = filter;
    this.store.dispatch(getFacultyAndDepartmentByInstitutionName({payload: {institutionName: data.institutionName}}))
    this.actions$.pipe(ofType(getFacultyAndDepartmentByInstitutionNameSuccess)).subscribe((res: any) => {
      this.facultyList = res.payload.payload;

    })

    this.store.dispatch(getAllInstitutionDegreeType({payload: {institutionId: data.id}}))
    this.actions$.pipe(ofType(getAllInstitutionDegreeTypeSuccess)).subscribe((res: any) => {
      this.degreeType = res.payload.data;
    })
  }

  

  

  search(event: any) {
    if (event) {
      const filter = {...this.filter, ['keyword'] : event}
      this.store.dispatch(getAlltalentSearchPool({payload: {...filter, OrganizationId: this.userData.OrganizationId}}))
    } else {
        const filter = {...this.filter, ['keyword'] : ''}
        this.store.dispatch(getAlltalentSearchPool({payload: {...this.filter, OrganizationId: this.userData.OrganizationId}}))
      }
  }

  getPage(currentPage: number) {
    const filter = {...this.filter, ['pageIndex'] : currentPage}

    this.filter = filter
    this.store.dispatch(getAlltalentSearchPool({payload: {...filter, OrganizationId: this.userData.OrganizationId}}))
  }
  
  
  selectRecordCount(event: any) {
    this.pageSize = event.value
    const filter = {...this.filter, ['pageSize'] : event.value}
    this.filter = filter
    this.store.dispatch(getAlltalentSearchPool({payload: {...filter, OrganizationId: this.userData.OrganizationId}}))

  }




}
