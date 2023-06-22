import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { getAllGraduateRequestDetailForGradaute, getAllGraduateRequestDetailForGradauteSuccess } from 'src/app/store/graduates/action';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { MatDialog } from '@angular/material/dialog';

import { FilePreviewComponent } from 'src/app/shared/components/file-preview/file-preview.component';
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
    private route: ActivatedRoute,
      private  dialog: MatDialog,
      private router: Router

  ) { }

  ngOnInit(): void {
    this.requestId = this.route.snapshot.params['id']
    this.store.dispatch(getAllGraduateRequestDetailForGradaute({requestId: this.requestId}))
    this.actions$.pipe(ofType(getAllGraduateRequestDetailForGradauteSuccess)).subscribe((res: any) => {
      this.requestDetail = res.payload.payload
    })
  }

  download(data: any) {
    if (data.contentType === 'application/pdf') {
      const link = document.createElement('a');
      link.download = `${data.fileUploadVM.name}`;
      link.href = 'data:application/pdf;base64,' + data.fileUploadVM.path;
      link.click();
    } else {
      const link = document.createElement('a');
      link.download = `${data.fileUploadVM.name}`;
      link.href = 'data:image/png;base64,' + data.fileUploadVM.path;
      link.click();

    }
  }


  previewFile(data: any) {
  // console.log(data)
  this.dialog.open(FilePreviewComponent, {
    width: '800px',
    height: '800px',
    data
  })
}

retryPayment() {
  this.router.navigateByUrl(`/graduate/my-applications/new/retry-payment/${this.requestId}`)
}

}
