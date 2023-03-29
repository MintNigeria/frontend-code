import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { downloadCSV, downloadCSVSuccess, downloadExcel, downloadExcelSuccess, invokeGetAllGraduates, invokeGetAllGraduatesSuccess } from 'src/app/store/graduates/action';
import { getALlDepartmentInInstitution, getALlFacultiesInInstitution, getALlFacultiesInInstitutionSuccess } from 'src/app/store/institution/action';
import { departmentSelector } from 'src/app/store/institution/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  departments$ = this.appStore.pipe(select(departmentSelector));

  selectedOption: string = "All";
  selectedInstitution : string = "All";
  gradYear : string = "All";
  department: string = "All";
  status: string = "All";

  filterStatus = { status: 'All'};
  filterOption = {selectedOption : 'All'};
  filterSector = { gradYear: 'All'};
  filterInstituition = {selectedInstituition: 'All'};
  filterDocument = {department: 'All'};

  

  searchForm = new FormGroup({
    searchPhrase: new FormControl(''),
  });
  


  institutionData: any;
  institutionId: any;
  pageIndex = 1;
filter = {
  keyword: '',
    filter: '',
    pageSize: 10,
    pageIndex: 1,
    facultyId: '',
    departmentId: '',
    yearOFGraduation: ''
    
}
  transactionDetails: any;
  totalCount: any;
  recordList: any;
  facultyList: any;
  departmentList: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions
  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.institutionData = JSON.parse(data)
    this.institutionId = this.institutionData.InstitutionId
    this.store.dispatch(invokeGetAllGraduates({institutionId: this.institutionId, payload: this.filter}))
    this.actions$.pipe(ofType(invokeGetAllGraduatesSuccess)).subscribe((res: any) => {
      this.recordList = res.payload.data;
      this.totalCount = res.payload.totalCount
    })
    this.store.dispatch(getALlDepartmentInInstitution({id: this.institutionId}))
    this.store.dispatch(getALlFacultiesInInstitution({id: this.institutionId}))
    this.actions$.pipe(ofType(getALlFacultiesInInstitutionSuccess)).subscribe((res: any) => {
      this.facultyList = res.payload;
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
    // if (this.gradYear !== 'All') {
    //   this.filterSector['gradYear'] = this.gradYear;
    // }
    // if (this.selectedInstitution !== 'All') {
    //   this.filterInstituition['selectedInstituition'] = this.selectedInstitution;
    // }
    // if (this.department !== 'All') {
    //   this.filterDocument['department'] = this.department;
    // }
    this.store.dispatch(invokeGetAllGraduates({institutionId: this.institutionId, payload: this.filter}))

    // ////console.log(this.filterStatus,this.filterOption,this.filterSector,this.filterInstituition,this.filterDocument);
  }

  clearFilter() {
    this.status = 'All';
    this.filterStatus = { status: 'All' };
    this.selectedOption = 'All';
    this.filterOption = { selectedOption : 'All'};
    this.gradYear = 'All'
    this.filterSector = { gradYear: 'All'};
    this.filterInstituition = {selectedInstituition: 'All'};
    this.department = 'All'
    this.filterDocument = {department: 'All'};
  }

  changeFaculty(id: any, name: string) {
    this.selectedOption = name
    const filter = {...this.filter, ['facultyId'] : id}
    const data = this.facultyList.find((value: any) => value.id == Number(id));

    this.departmentList = data.departmentVMs;
    this.filter = filter;
  }

  changeDepartment(id: any, name: string) {
    const filter = {...this.filter, ['departmentId'] : id}
    this.department = name
    this.filter = filter;
  }

  search(event: any) {
    if (event) {
      const filter = {...this.filter, ['keyword'] : event}
      this.store.dispatch(invokeGetAllGraduates({institutionId: this.institutionId, payload: filter}))
      } else {
        const filter = {...this.filter, ['keyword'] : ''}
        this.store.dispatch(invokeGetAllGraduates({institutionId: this.institutionId, payload: filter}))
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
    this.store.dispatch(downloadCSV({payload: {institutionId: this.institutionId}}))
    this.actions$.pipe(ofType(downloadCSVSuccess)).subscribe((res: any) => {
      ////console.log(res) 
      const link = document.createElement('a');
        link.download = `${res.payload?.fileName}.csv`;
        link.href = 'data:image/png;base64,' + res.payload?.base64;
        link.click();
    })  
  }

  downloadExcel() {
    this.store.dispatch(downloadExcel({payload: {institutionId: this.institutionId}}))
    this.actions$.pipe(ofType(downloadExcelSuccess)).subscribe((res: any) => {
       const link = document.createElement('a');
        link.download = `${res.payload?.fileName}.xlsx`;
        link.href = 'data:image/png;base64,' + res.payload?.base64;
        link.click();
    })
  }

  getPage(currentPage: number) {
    const filter = {...this.filter, ['pageIndex'] : currentPage}
    this.store.dispatch(invokeGetAllGraduates({institutionId: this.institutionId, payload: filter}))
  }

}
