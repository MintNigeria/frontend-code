import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { FilePreviewComponent } from 'src/app/shared/components/file-preview/file-preview.component';
import { invokeGetRequestDetails, updateInstitutionRequest, updateInstitutionRequestSuccess } from 'src/app/store/request/action';
import { requestDetailsSelector } from 'src/app/store/request/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-view-more-graduate',
  templateUrl: './view-more-graduate.component.html',
  styleUrls: ['./view-more-graduate.component.scss']
})
export class ViewMoreGraduateComponent implements OnInit {

  confirmationModal = "confirmationModal";
  changesConfirmed = "changesConfirmed";



 requestId: any;
 requestDetails$ = this.appStore.pipe(select(requestDetailsSelector));
 requestDetail: any;
  deviceModel: string;
  requestStatus = [
    { name: 'PENDING',  value: 1},
    { name: 'PROCESSING',  value: 2},
    { name: 'DISPATCHED',  value: 3},
    { name: 'PAUSED',  value: 4},
    { name: 'DELIVERED',  value: 5},
    // { name: 'DECLINED',  value: 6},
    { name: 'COMPLETED',  value: 7},
  ]
  ipAddress: any;
  selectedUpdateType: any;

 constructor(
   private route: ActivatedRoute,
   private router: Router,
   private store: Store,
   private appStore: Store<AppStateInterface>,
   private actions$: Actions,
   private utilityService: UtilityService,
   private notification: NotificationsService,
   private  dialog: MatDialog

 ) {
  const userAgent = navigator.userAgent;

    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
      this.deviceModel = 'iPad or iPhone';
    } else if (userAgent.match(/Android/i)) {
      this.deviceModel = 'Android';
    } else if (userAgent.match(/Window/i)) {
      this.deviceModel = 'Window';
    } else {
      this.deviceModel = 'Other';
    }
 }

 ngOnInit(): void {
   this.requestId = this.route.snapshot.params['id']
   this.store.dispatch(invokeGetRequestDetails({id: this.requestId}))
   this.getRequestDetails()
   this.loadIp();


 }

 loadIp() {
  this.utilityService.getuserIP().subscribe((res: any) => {
   this.ipAddress = res.query
  })
}

 getRequestDetails() {
   this.requestDetails$.subscribe((res: any) => {
     this.requestDetail = res
   })
 }

  goBack() {
  window.history.back();
}


selectOption(event: any) {
  this.selectedUpdateType = this.requestStatus[event.value];
}

actionRequest() {
  const payload = {
    requestId: Number(this.requestId),
    status: Number(this.selectedUpdateType.value),
    comment: this.selectedUpdateType.name,
    imei: '',
    serialNumber: '',
    device: this.deviceModel,
    ipAddress: this.ipAddress

  }
  this.store.dispatch(updateInstitutionRequest({payload}))
  this.actions$.pipe(ofType(updateInstitutionRequestSuccess)).subscribe((res: any) => {
    document.getElementById('confirmationModal')?.click();
    this.notification.publishMessages('success', res.payload)
    this.store.dispatch(invokeGetRequestDetails({id: this.requestId}))

  })
  
}

openConfirmation(){
  document.getElementById('confirmationModal')?.click();
}

openChangesConfirmed(){
  document.getElementById('changesConfirmed')?.click();
}

closeConfirmation(){
  document.getElementById('confirmationModal')?.click();
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

}
