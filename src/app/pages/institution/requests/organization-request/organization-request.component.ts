import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { DateRangeComponent } from 'src/app/shared/date-range/date-range.component';
import { exportInstitutionOrganizationRequestCSV, exportInstitutionOrganizationRequestExcel, getAllInstitutionOrganizationRequest } from 'src/app/store/request/action';
import { organisationRequestSelector } from 'src/app/store/request/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { getInstitutionConfiguration, getInstitutionConfigurationSuccess, getOrganisationIndustry, getOrganisationIndustrySuccess, getOrganisationSector, getOrganisationSectorSuccess } from 'src/app/store/configuration/action';

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
    OrganisationIndustry: '',
    OrganisationSector: '',
    status: '',
    keyword: '',
      filter: '',
      pageSize: 10,
      pageIndex: 1,
      range: '',
      fromDate: '',
      toDate: '',
  }
  processingFeeList: any;
  industrtList: any;
  sectorList: any;
  showDate : boolean = false;
  showOrganizationIndustry : boolean = false;
  showOrganizationSector : boolean = false;
  showStatus : boolean = false;
  showDocType : boolean = false;

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
    this.store.dispatch(getInstitutionConfiguration({institutionId: this.institutionId}))
    this.actions$.pipe(ofType(getInstitutionConfigurationSuccess)).subscribe((res: any) => {
      this.processingFeeList = res.payload.processingFeesVM
    })
    this.store.dispatch(getOrganisationIndustry())
    this.actions$.pipe(ofType(getOrganisationIndustrySuccess)).subscribe((res: any) => {
      this.industrtList = res.payload
    })
    this.store.dispatch(getOrganisationSector())
    this.actions$.pipe(ofType(getOrganisationSectorSuccess)).subscribe((res: any) => {
      this.sectorList = res.payload
    })

  }

  viewRequest(id: any) {
    this.router.navigateByUrl(`/institution/requests/organization/${id}`)
  }

  addFilter() {
   
    this.store.dispatch(getAllInstitutionOrganizationRequest({payload: {...this.filterParams, institutionId: this.institutionId}}))
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
    const filterParams = {
      institutionId: '',
      DocumentType: '',
      OrganisationIndustry: '',
      OrganisationSector: '',
      status: '',
      keyword: '',
        filter: '',
        pageSize: 10,
        pageIndex: 1,
        range: '',
        fromDate: '',
        toDate: '',
    }
    this.store.dispatch(getAllInstitutionOrganizationRequest({payload: {...filterParams, institutionId: this.institutionId}}))

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
              ////console.log(res)
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

  changeDocumentType(name: string) {
    this.documentType = name;
    const filter = {...this.filterParams, ['DocumentType'] : name}
    this.filterParams = filter;
    this.showDocType = true;
  }
  changeIndustryType(name: string) {
    this.selectedInstituition = name;
    const filter = {...this.filterParams, ['OrganisationIndustry'] : name}
    this.filterParams = filter;
    this.showOrganizationIndustry = true;

  }
  changeSectorType(name: string) {
    this.selectedSector = name;
    const filter = {...this.filterParams, ['OrganisationSector'] : name}
    this.filterParams = filter;
    this.showOrganizationSector = true;
  }
  changeStatus(status: number, name: string) {
    this.status = name
    const filter = {...this.filterParams, ['status'] : String(status)};
    this.filterParams = filter;
    this.showStatus = true;
  }

  search(event: any) {
    if (event) {
      const filter = {...this.filterParams, ['keyword'] : event}
      ////console.log(filter)
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
   this.store.dispatch(exportInstitutionOrganizationRequestCSV({payload : {...this.filterParams, institutionId : this.institutionId}}))
  }

  downloadExcel() {

    
    this.store.dispatch(exportInstitutionOrganizationRequestExcel({payload : {...this.filterParams, institutionId : this.institutionId}}))

  }

  getPage(currentPage: number) {
    const filter = {...this.filterParams, ['pageIndex'] : currentPage}
    this.store.dispatch(getAllInstitutionOrganizationRequest({payload: {...this.filterParams, institutionId: this.institutionId}}))
  }

}
