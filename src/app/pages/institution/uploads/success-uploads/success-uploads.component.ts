import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { getAllInstitutionUpload, getAllInstitutionUploadSuccess } from 'src/app/store/graduates/action';
import { AppStateInterface } from 'src/app/types/appState.interface';
@Component({
  selector: 'app-success-uploads',
  templateUrl: './success-uploads.component.html',
  styleUrls: ['./success-uploads.component.scss']
})
export class SuccessUploadsComponent implements OnInit {

  selectedData: any;
  selectedDataId: any;
  


  institutionId: any;
  institutionData: any;
  pageIndex = 1;
  pageSize = 10;
  filter = {
  institutionId: '',
  keyword: '',
    filter: '',
    pageSize: 10,
    pageIndex: 1,
    status: 1,
}

searchForm = new FormGroup({
  searchPhrase: new FormControl(''),
});
  totalCount: any;
  uploads: any;

  constructor(
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.institutionData = JSON.parse(data)
    this.institutionId = this.institutionData.InstitutionId
    this.store.dispatch(getAllInstitutionUpload({payload: {...this.filter, institutionId: this.institutionId}}))
    this.actions$.pipe(ofType(getAllInstitutionUploadSuccess)).subscribe((res: any) => {
      this.uploads = res.payload.data;
      this.totalCount = res.payload.totalCount;

    })
    this.searchForm.controls.searchPhrase.valueChanges
    .pipe(debounceTime(400), distinctUntilChanged())
    .subscribe((term) => {
      this.search(term as string);
    });

  }

  search(event: any) {
    if (event) {
      const filter = {...this.filter, ['keyword'] : event}
      this.store.dispatch(getAllInstitutionUpload({payload: {...filter, institutionId: this.institutionId}}))
    } else {
        const filter = {...this.filter, ['keyword'] : ''}
        this.store.dispatch(getAllInstitutionUpload({payload: {...this.filter, institutionId: this.institutionId}}))
      }
  }

  showData(id: number) {
    this.selectedData = this.uploads.find((data: any) => data.batchId === id);
    this.uploads.filter((x: any) => {
      if (x.batchId === id) {
        ////console.log(x.batchId )
        this.selectedDataId = x.batchId
      }});
      // console.log(id, this.selectedDataId)
      ////console.log(this.selectedData,this.selectedDataId)

      
  }

  

  getPage(currentPage: number) {
    const filter = {...this.filter, ['pageIndex'] : currentPage}
    this.filter = filter
    this.store.dispatch(getAllInstitutionUpload({payload: {...filter, institutionId: this.institutionId}}))
  }
  
  selectRecordCount(event: any) {
    this.pageSize = event.value
    const filter = {...this.filter, ['pageSize'] : event.value}
    this.filter = filter
    this.store.dispatch(getAllInstitutionUpload({payload: {...filter, institutionId: this.institutionId}}))

  }

  


}
