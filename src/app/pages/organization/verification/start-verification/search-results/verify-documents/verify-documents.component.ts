import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify-documents',
  templateUrl: './verify-documents.component.html',
  styleUrls: ['./verify-documents.component.scss']
})
export class VerifyDocumentsComponent implements OnInit {


  studentDetails = {
    fullName: 'Chukwuka Chiemelie Esther',
    gender: 'Female',
    dob: '12th June, 2022',
    address: '14 Karimu Kotun street, Victoria Island, Lagos',
    stateOfOrigin: 'Ogun State',
  }

  academicDetails = {
    institution : 'Florida Atlantic University',
    faculty: 'College of Business',
    department: 'Mathematics',
    matricNo: "123456",
    degree: 'B.Sc',
    grade: 'Second Class Upper',
    yearOfEntry: '2016',
    yearOfGrad: '2019'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
