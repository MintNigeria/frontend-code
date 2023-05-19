import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
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

  data = {
    fullName: 'Adekunle Ciroma',
    institution: 'University of Lagos',
    faculty: 'Social Science',
    department: 'Sociology',
    degree: 'Bsc',
    matNumber: '12344',
    yearOfEntry: '2019',
    yearOfgrad: '2023',
    gender: "male",
    docType: 'Certificate(Original)',
    deliveryOption: 'Email',
    number: '080912002',
    reasonForRequest: 'Educational Purpose',
    destination: 'Lagos',
    payment: 'Sucess',


  }

  graduateList  = [
  {
    id: '1',
    requestID: '#3086',
    date: '12/01/2023',
    name: 'AdeKunle Ciroma',
    number: '080912002',
    docType: 'Certificate(Original)',
    institution: 'University of Lagos',
    status: 'Completed',
    action: 'view'
  },
  {
    id: '2',
    requestID: '#3086',
    date: '12/01/2023',
    name: 'Phoenix Baker',
    number: '080912002',
    docType: 'Certificate(Original)',
    institution: 'University of Benin',
    status: 'Pending',
    action: 'view'
  },
  {
    id: '3',
    requestID: '#3086',
    date: '12/01/2023',
    name: 'Lane Ciroma',
    number: '080912002',
    docType: 'Certificate(Original)',
    institution: 'Lagos State University',
    status: 'Processing',
    action: 'view'
  },
  {
    id: '4',
    requestID: '#3086',
    date: '12/01/2023',
    name: 'Demi Wiki',
    number: '080912002',
    docType: 'Certificate(Original)',
    institution: 'Yaba Technology',
    status: 'Paused',
    action: 'view'
  },
  {
    id: '5',
    requestID: '#3086',
    date: '12/01/2023',
    name: 'AdeKunle Ciroma',
    number: '080912002',
    docType: 'Certificate(Original)',
    institution: 'University of Lagos',
    status: 'Completed',
    action: 'view'
  },
  {
    id: '6',
    requestID: '#3086',
    date: '12/01/2023',
    name: 'AdeKunle Ciroma',
    number: '080912002',
    docType: 'Certificate(Original)',
    institution: 'University of Lagos',
    status: 'Completed',
    action: 'view'
  }
 ]

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
    { name: 'DECLINED',  value: 6},
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
   this.ipAddress = res.ip
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

}
