import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { getAllGraduateRequestDetailForGradaute, getAllGraduateRequestDetailForGradauteSuccess } from 'src/app/store/graduates/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {
  requestId: any;
  requestDetail: any;
  id!: string;


 

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: LocationStrategy,
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
  ) { }

  ngOnInit(): void {
    const data: any = sessionStorage.getItem('sel_Ver')
    this.requestDetail = JSON.parse(data)

    // this.id = this.activatedRoute.snapshot.params['id'];
    // this.store.dispatch(getAllGraduateRequestDetailForGradaute({requestId: this.id}))
    // this.actions$.pipe(ofType(getAllGraduateRequestDetailForGradauteSuccess)).subscribe((res: any) => {
    //   this.requestDetail = res.payload.payload
    // })
  }

  goBack() {
  window.history.back();
  }

}
