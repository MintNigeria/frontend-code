import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { invokeGetRequestDetails, updateInstitutionRequest, updateInstitutionRequestSuccess } from 'src/app/store/request/action';
import { requestDetailsSelector } from 'src/app/store/request/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-view-more-organization',
  templateUrl: './view-more-organization.component.html',
  styleUrls: ['./view-more-organization.component.scss']
})
export class ViewMoreOrganizationComponent implements OnInit {

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
    requestingOrganization: 'First Bank Of NIgeria'


  }


  requestId: any;
  requestDetails$ = this.appStore.pipe(select(requestDetailsSelector));
  requestDetail: any;
  selectedUpdateType: any;
  deviceModel!: string;
  ipAddress: any;

  requestStatus = [
    { name: 'PENDING',  value: 1},
    { name: 'PROCESSING',  value: 2},
    { name: 'DISPATCHED',  value: 3},
    { name: 'PAUSED',  value: 4},
    { name: 'DELIVERED',  value: 5},
    { name: 'DECLINED',  value: 6},
    { name: 'COMPLETED',  value: 7},
  ]
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

openConfirmation(){
  document.getElementById('confirmationModal')?.click();
}

openChangesConfirmed(){
  document.getElementById('changesConfirmed')?.click();
}

closeConfirmation(){
  document.getElementById('confirmationModal')?.click();
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


}
