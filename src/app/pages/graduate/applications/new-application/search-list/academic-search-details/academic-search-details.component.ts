import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-academic-search-details',
  templateUrl: './academic-search-details.component.html',
  styleUrls: ['./academic-search-details.component.scss']
})
export class AcademicSearchDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goBack() {
    window.history.back();
  }
  
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

//   graduateList  = [
//   {
//     id: '1',
//     requestID: '#3086',
//     date: '12/01/2023',
//     name: 'AdeKunle Ciroma',
//     number: '080912002',
//     docType: 'Certificate(Original)',
//     institution: 'University of Lagos',
//     status: 'Completed',
//     action: 'view'
//   },
//   {
//     id: '2',
//     requestID: '#3086',
//     date: '12/01/2023',
//     name: 'Phoenix Baker',
//     number: '080912002',
//     docType: 'Certificate(Original)',
//     institution: 'University of Benin',
//     status: 'Pending',
//     action: 'view'
//   },
//   {
//     id: '3',
//     requestID: '#3086',
//     date: '12/01/2023',
//     name: 'Lane Ciroma',
//     number: '080912002',
//     docType: 'Certificate(Original)',
//     institution: 'Lagos State University',
//     status: 'Processing',
//     action: 'view'
//   },
//   {
//     id: '4',
//     requestID: '#3086',
//     date: '12/01/2023',
//     name: 'Demi Wiki',
//     number: '080912002',
//     docType: 'Certificate(Original)',
//     institution: 'Yaba Technology',
//     status: 'Paused',
//     action: 'view'
//   },
//   {
//     id: '5',
//     requestID: '#3086',
//     date: '12/01/2023',
//     name: 'AdeKunle Ciroma',
//     number: '080912002',
//     docType: 'Certificate(Original)',
//     institution: 'University of Lagos',
//     status: 'Completed',
//     action: 'view'
//   },
//   {
//     id: '6',
//     requestID: '#3086',
//     date: '12/01/2023',
//     name: 'AdeKunle Ciroma',
//     number: '080912002',
//     docType: 'Certificate(Original)',
//     institution: 'University of Lagos',
//     status: 'Completed',
//     action: 'view'
//   }
//  ]

}
