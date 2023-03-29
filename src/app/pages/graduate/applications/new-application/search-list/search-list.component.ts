import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {
  edit = 'editModal';
  constructor() { }

  ngOnInit(): void {
  }

  recordList = [
    {fullName: 'Chukwuka Chiemelie Esther', matriculationNo: '2014813299', yearOfEntry: '2014', yearOfGraduation: '2019', certificate: 'B.Sc', action: 'View', id: 3},
    {fullName: 'Chukwuka Chiemelie Esther', matriculationNo: '2014813299', yearOfEntry: '2014', yearOfGraduation: '2019', certificate: 'B.Sc', action: 'View', id: 2},
    {fullName: 'Chukwuka Chiemelie Esther', matriculationNo: '2014813299', yearOfEntry: '2014', yearOfGraduation: '2019', certificate: 'B.Sc', action: 'View', id: 1},
   
  ]

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

  viewDetails() {
    document.getElementById('editModal')?.click();
  }

  
}
