import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { invokeGetRequestDetails } from 'src/app/store/request/action';
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

 constructor(
   private route: ActivatedRoute,
   private router: Router,
   private store: Store,
   private appStore: Store<AppStateInterface>,
   private actions$: Actions
 ) {}

 ngOnInit(): void {
   this.requestId = this.route.snapshot.params['id']
   this.store.dispatch(invokeGetRequestDetails({id: this.requestId}))
   this.getRequestDetails()

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

}
