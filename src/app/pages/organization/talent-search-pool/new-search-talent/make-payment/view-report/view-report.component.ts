import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { InstitutionService } from 'src/app/core/services/institution/institution.service';
import { DateRangeComponent } from 'src/app/shared/date-range/date-range.component';
import { downloadTalentSearchReportCSV, downloadTalentSearchReportCSVSuccess, downloadTalentSearchReportExcel, downloadTalentSearchReportExcelSuccess } from 'src/app/store/graduates/action';
import { getAlltalentSearchPoolResult, getAlltalentSearchPoolResultSuccess } from 'src/app/store/organization/action';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss']
})
export class ViewReportComponent implements OnInit {

  selectedOption: string = "All Time";
  selectedInstitution : string = "All";
  selectedSector : string = "All";
  documentType: string = "All";
  status: string = "All";
  showClassOfDegree: boolean = false;
  filterStatus = { status: 'All'};
  filterOption = {selectedOption : 'All Time'};
  filterSector = { selectedSector: 'All'};
  filterInstituition = {selectedInstituition: 'All'};
  filterDocument = {documentType: 'All'};

  searchForm = new FormGroup({
    searchPhrase: new FormControl(''),
  });
  filter= {
    keyword: '',
      filter: '',
      pageSize: 10,
      pageIndex: 1,
      ClassOfDegree: '',
      Gender: ''
   }
   userData: any;
   poolId: any;
  poolList: any;
  total: any;
  pageIndex = 1
  years: Array<any> = [];
  degreeType: any;

  
  constructor(
    private store: Store,
    private actions$: Actions,
    private dialog : MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private gradeService: InstitutionService,

  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)

    let currentYear = new Date().getFullYear();   
    for (let index = 1990; index <= currentYear; ++index) {
      this.years.push(index)
      
    }
    this.poolId = this.route.snapshot.params['id']
    this.store.dispatch(getAlltalentSearchPoolResult({payload: {...this.filter, id: this.poolId}}))
    this.actions$.pipe(ofType(getAlltalentSearchPoolResultSuccess)).subscribe((res: any) => {
      //console.log(res)
      this.poolList = res.payload.payload
      this.total = res.payload.totalCount
      // this.balance = res.payload;
    })
    this.searchForm.controls.searchPhrase.valueChanges
    .pipe(debounceTime(400), distinctUntilChanged())
    .subscribe((term) => {
      this.search(term as string);
    });
    this.getAllDegree()

  }

  getAllDegree() {
    this.gradeService.getAllGradesConfig().subscribe((res: any) => {
      this.degreeType = res.payload;
    })
  }

  addFilter() {
    this.store.dispatch(getAlltalentSearchPoolResult({payload: {...this.filter, id: this.poolId}}))
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
    const filter= {
      keyword: '',
        filter: '',
        pageSize: 10,
        pageIndex: 1,
     }
     this.store.dispatch(getAlltalentSearchPoolResult({payload: {...filter, id: this.poolId}}))

  }

  search(event: any) {
    if (event) {
      const filter = {...this.filter, ['keyword'] : event}
      this.store.dispatch(getAlltalentSearchPoolResult({payload:{...filter, id: this.poolId}}))
    } else {
        const filter = {...this.filter, ['keyword'] : ''}
        this.store.dispatch(getAlltalentSearchPoolResult({payload:{...this.filter, id: this.poolId}}))
      }
  }

  goBack() {
  window.history.back();
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
  
  changeGender(gender: number, name: string) {
    this.selectedInstitution = name
    const filter = {...this.filter, ['Gender'] : name}
    this.filter = filter;

  }
  changeYear(degree: string) {
    this.selectedSector = degree
    const filter = {...this.filter, ['ClassOfDegree'] : degree}
    this.filter = filter;

  }

  getPage(currentPage: number) {
    const filter = {...this.filter, ['pageIndex'] : currentPage}

    this.store.dispatch(getAlltalentSearchPoolResult({payload: {...filter, id: this.poolId}}))
  }

 
  exportCSV() {
    this.store.dispatch(downloadTalentSearchReportCSV({payload: {...this.filter, id: this.poolId}}))
    this.actions$.pipe(ofType(downloadTalentSearchReportCSVSuccess)).subscribe((res: any) => {
      const link = document.createElement('a');
        link.download = `${res.payload?.fileName}.csv`;
        link.href = 'data:image/png;base64,' + res.payload?.base64;
        link.click();
    })
  }
  exportExcel() {
    this.store.dispatch(downloadTalentSearchReportExcel({payload: {...this.filter, id: this.poolId}}))
    this.actions$.pipe(ofType(downloadTalentSearchReportExcelSuccess)).subscribe((res: any) => {
      const link = document.createElement('a');
        link.download = `${res.payload?.fileName}.xlsx`;
        link.href = 'data:image/png;base64,' + res.payload?.base64;
        link.click();
    })
  }

  viewDetails(id: number) {
    this.router.navigateByUrl(`/organization/talent-search-pool/view-graduate-record/${id}`)
  }


}
