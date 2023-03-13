import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
