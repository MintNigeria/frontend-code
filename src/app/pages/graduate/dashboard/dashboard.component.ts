import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { getGraduateDashboardTopData } from 'src/app/store/dashboard/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  filter = {
    range: 0,
  }
  userData: any;
  constructor(
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
    private fb: FormBuilder,
    private utilityService: UtilityService,
    private notification: NotificationsService,
  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)
    this.store.dispatch(getGraduateDashboardTopData({payload: {...this.filter, GraduateId: this.userData.GraduateId}}))
  }
  graduateList = [
    {
      id: '1',
      requestID: '#3086',
      date: '12/01/2023',
      deliveryOption: 'Email',
      number: '080912002',
      docType: 'Certificate(Original)',
      destination: 'ameerkenny@yopmail.com',
      status: 'Completed',
      action: 'view'
    },
    {
      id: '1',
      requestID: '#3086',
      date: '12/01/2023',
      deliveryOption: 'Email',
      number: '080912002',
      docType: 'Certificate(Original)',
      destination: 'ameerkenny@yopmail.com',
      status: 'Completed',
      action: 'view'
    },
    {
      id: '1',
      requestID: '#3086',
      date: '12/01/2023',
      deliveryOption: 'Email',
      number: '080912002',
      docType: 'Certificate(Original)',
      destination: 'ameerkenny@yopmail.com',
      status: 'Completed',
      action: 'view'
    },
    {
      id: '1',
      requestID: '#3086',
      date: '12/01/2023',
      deliveryOption: 'Email',
      number: '080912002',
      docType: 'Certificate(Original)',
      destination: 'ameerkenny@yopmail.com',
      status: 'Completed',
      action: 'view'
    },
    {
      id: '1',
      requestID: '#3086',
      date: '12/01/2023',
      deliveryOption: 'Email',
      number: '080912002',
      docType: 'Certificate(Original)',
      destination: 'ameerkenny@yopmail.com',
      status: 'Completed',
      action: 'view'
    },
    {
      id: '1',
      requestID: '#3086',
      date: '12/01/2023',
      deliveryOption: 'Email',
      number: '080912002',
      docType: 'Certificate(Original)',
      destination: 'ameerkenny@yopmail.com',
      status: 'Completed',
      action: 'view'
    },
  ]
  
  recentTransactions = [
    {
      id: '1',
      date: '12/01/2023',
      amount: 'N1,500',
      paymentMethod: 'Wallet',
      transactionDesc: '080912002',
      status: 'Completed',
    },
    {
      id: '1',
      date: '12/01/2023',
      amount: 'N1,500',
      paymentMethod: 'Wallet',
      transactionDesc: '080912002',
      status: 'Completed',
    },
    {
      id: '1',
      date: '12/01/2023',
      amount: 'N1,500',
      paymentMethod: 'Wallet',
      transactionDesc: '080912002',
      status: 'Completed',
    },
    {
      id: '1',
      date: '12/01/2023',
      amount: 'N1,500',
      paymentMethod: 'Wallet',
      transactionDesc: '080912002',
      status: 'Completed',
    },
    {
      id: '1',
      date: '12/01/2023',
      amount: 'N1,500',
      paymentMethod: 'Wallet',
      transactionDesc: '080912002',
      status: 'Completed',
    },
    {
      id: '1',
      date: '12/01/2023',
      amount: 'N1,500',
      paymentMethod: 'Wallet',
      transactionDesc: '080912002',
      status: 'Completed',
    },
  ]
  
}
