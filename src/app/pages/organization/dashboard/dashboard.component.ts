import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  verificationHistory = [
  {
    id: '1',
    date: '12/01/2023',
    verificationID: '#3066',
    name:'Adekunle Ciroma',
    phoneNumber: '0819036356377',
    institution: 'University of Lagos',
    department: 'Banking and Finance',
    reasonForRequest: 'Educational Verification',
    action: 'View'
  },
  {
    id: '2',
    date: '12/01/2023',
    verificationID: '#3066',
    name:'Adekunle Ciroma',
    phoneNumber: '0819036356377',
    institution: 'University of Lagos',
    department: 'Banking and Finance',
    reasonForRequest: 'Educational Verification',
    action: 'View'
  },
  {
    id: '3',
    date: '12/01/2023',
    verificationID: '#3066',
    name:'Adekunle Ciroma',
    phoneNumber: '0819036356377',
    institution: 'University of Lagos',
    department: 'Banking and Finance',
    reasonForRequest: 'Educational Verification',
    action: 'View'
  },
  {
    id: '4',
    date: '12/01/2023',
    verificationID: '#3066',
    name:'Adekunle Ciroma',
    phoneNumber: '0819036356377',
    institution: 'University of Lagos',
    department: 'Banking and Finance',
    reasonForRequest: 'Educational Verification',
    action: 'View'
  },
  {
    id: '5',
    date: '12/01/2023',
    verificationID: '#3066',
    name:'Adekunle Ciroma',
    phoneNumber: '0819036356377',
    institution: 'University of Lagos',
    department: 'Banking and Finance',
    reasonForRequest: 'Educational Verification',
    action: 'View'
  },
  {
    id: '6',
    date: '12/01/2023',
    verificationID: '#3066',
    name:'Adekunle Ciroma',
    phoneNumber: '0819036356377',
    institution: 'University of Lagos',
    department: 'Banking and Finance',
    reasonForRequest: 'Educational Verification',
    action: 'View'
  }
 ]

  constructor() { }

  ngOnInit(): void {
  }

}
