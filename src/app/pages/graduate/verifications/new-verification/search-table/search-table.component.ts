import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent implements OnInit {
  edit = 'editModal';
  constructor(private router : Router,
    private fb: FormBuilder) { }
  consentForm!: FormGroup

 
  ngOnInit(): void {
    this.consentForm = this.fb.group({
      consent: ['', Validators.required]
    })
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

  cancel(){

  }

  openEdit() {
    this.router.navigateByUrl('/graduate/my-verifications/new/verification-reason')
    document.getElementById('editModal')?.click();
  }
  closeEdit() {
    document.getElementById('editModal')?.click();
  }

}
