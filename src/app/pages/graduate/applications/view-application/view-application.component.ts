import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { getAllGraduateRequestDetailForGradaute, getAllGraduateRequestDetailForGradauteSuccess } from 'src/app/store/graduates/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.scss']
})
export class ViewApplicationComponent implements OnInit {
  requestId: any;
  requestDetail: any;

  constructor(
    private appStore: Store<AppStateInterface>,
    private store: Store,
    private actions$: Actions,
    private utilityService: UtilityService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.requestId = this.route.snapshot.params['id']
    this.store.dispatch(getAllGraduateRequestDetailForGradaute({requestId: this.requestId}))
    this.actions$.pipe(ofType(getAllGraduateRequestDetailForGradauteSuccess)).subscribe((res: any) => {
      console.log(res)
      this.requestDetail = res.payload.payload
    })
  }

  download(file: any) {
    console.log(file)
       const link = document.createElement('a');
        link.download = `${file.fileUploadVM.name}`;
        link.href = 'data:image/png;base64,' + file.fileUploadVM.path;
        link.click();
  }

}
