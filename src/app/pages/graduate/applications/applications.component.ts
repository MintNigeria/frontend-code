import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { getAllGraduateRequestForGradaute, getAllGraduateRequestForGradauteSuccess } from 'src/app/store/graduates/action';
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
   }
   userData: any;
    applicationList: any;
    total: any;
  pageIndex = 1
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
    // getAllGraduateRequestForGradaute
    const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)
    this.store.dispatch(getAllGraduateRequestForGradaute({payload: {...this.filter, GraduateId: this.userData.GraduateId}}))
    this.actions$.pipe(ofType(getAllGraduateRequestForGradauteSuccess)).subscribe((res: any) => {
      console.log(res)
      this.graduateList = res.payload.payload
      // this.balance = res.payload;
    })

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
      this.filterInstituition['selectedInstituition'] = this.selectedInstituition;
    }
    if (this.documentType !== 'All') {
      this.filterDocument['documentType'] = this.documentType;
    }
    
    ////console.log(this.filterStatus,this.filterOption,this.filterSector,this.filterInstituition,this.filterDocument);
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
  }

  getPage(currentPage: number) {
    const filter = {...this.filter, ['pageIndex'] : currentPage}
    this.store.dispatch(getAllGraduateRequestForGradaute({payload: {...filter, GraduateId: this.userData.GraduateId}}))
  }
}
