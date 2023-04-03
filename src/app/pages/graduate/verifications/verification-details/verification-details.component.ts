import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { getAllGraduateRequestDetailForGradaute, getAllGraduateRequestDetailForGradauteSuccess, getGraduateCertificateVerificationDetail } from 'src/app/store/graduates/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-verification-details',
  templateUrl: './verification-details.component.html',
  styleUrls: ['./verification-details.component.scss']
})
export class VerificationDetailsComponent implements OnInit {
  requestId: any;
  requestDetail: any;
  verificationDetails: boolean = false;
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
    this.id = this.activatedRoute.snapshot.params['id'];
    this.store.dispatch(getAllGraduateRequestDetailForGradaute({requestId: this.id}))
    this.actions$.pipe(ofType(getAllGraduateRequestDetailForGradauteSuccess)).subscribe((res: any) => {
      this.requestDetail = res.payload.payload
    })
    if (this.id !== undefined){
      this.verificationDetails = true;
    }
  }

  download(file: any) {
    console.log(file)
       const link = document.createElement('a');
        link.download = `${file.fileUploadVM.name}`;
        link.href = 'data:image/png;base64,' + file.fileUploadVM.path;
        link.click();
  }

  back() {
    this.location.back();
  }


}
