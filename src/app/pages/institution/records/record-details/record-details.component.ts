import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { invokeGetGraduateDetails, invokeGetGraduateDetailsSuccess } from 'src/app/store/graduates/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-record-details',
  templateUrl: './record-details.component.html',
  styleUrls: ['./record-details.component.scss']
})
export class RecordDetailsComponent implements OnInit {

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
    dob: '12/07/1989',
    docType: 'Certificate(Original)',
    deliveryOption: 'Email',
    number: '080912002',
    reasonForRequest: 'Educational Purpose',
    state: 'Lagos',
    payment: 'Sucess',
    grade:'second class upper'


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
  graduateId: any;
  institutionData: any;
  institutionId: any;
  record: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.institutionData = JSON.parse(data)
    this.institutionId = this.institutionData.InstitutionId

    this.graduateId = this.route.snapshot.params['id']
    this.store.dispatch(invokeGetGraduateDetails({graduateId: this.graduateId, institutionId: this.institutionId}))
    this.actions$.pipe(ofType(invokeGetGraduateDetailsSuccess)).subscribe((res: any) => {
      //console.log(res)
      this.record = res.payload;
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
