import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { getAllInstitutionUpload, getAllInstitutionUploadSuccess } from 'src/app/store/graduates/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-failed-uploads',
  templateUrl: './failed-uploads.component.html',
  styleUrls: ['./failed-uploads.component.scss']
})
export class FailedUploadsComponent implements OnInit {

  selectedData: any;
  selectedDataId: any;

  


  institutionId: any;
  institutionData: any;
  pageIndex = 1;
  filter = {
  institutionId: '',
  keyword: '',
    filter: '',
    pageSize: 10,
    pageIndex: 1,
    status: 2,
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
      ////console.log(res)
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
      ////console.log(this.selectedData,this.selectedDataId)

  }

  getPage(currentPage: number) {
    const filter = {...this.filter, ['pageIndex'] : currentPage}
    this.store.dispatch(getAllInstitutionUpload({payload: {...filter, institutionId: this.institutionId}}))
  }


}
