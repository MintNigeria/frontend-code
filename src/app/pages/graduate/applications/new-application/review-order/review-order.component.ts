import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { getAllGraduateRequestDetailForGradaute, getAllGraduateRequestDetailForGradauteSuccess } from 'src/app/store/graduates/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.component.html',
  styleUrls: ['./review-order.component.scss']
})
export class ReviewOrderComponent implements OnInit {
   data!: any

  graduateId: any;
  institutionData: any;
  institutionId: any;
  record: any;
  id: any;
  requestDetail: any;
  constructor(
    private route: ActivatedRoute,
    private location: LocationStrategy,
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,

  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.store.dispatch(getAllGraduateRequestDetailForGradaute({requestId: this.id}))
    this.actions$.pipe(ofType(getAllGraduateRequestDetailForGradauteSuccess)).subscribe((res: any) => {
      this.data = res.payload.payload
    })

  }


  cancel() {
   
  }
  

goBack() {
  window.history.back();
}



}
