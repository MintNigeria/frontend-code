import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {


  details = {
    fullName: 'Chukwuka Chiemelie Esther',
    institution: 'Nnamdi Azikiwe University',
    faculty: 'Sciences',
    department: 'Computer Science',
    degreeType: 'Bsc',
    matricNumber: '034958',
    yearOfEntry: '2020',
    yearofGrad: '2020',
    gender: 'Female',
    documentType: 'Certificate Verification',
    reasonForRequest: 'Educational Purpose',
    status: 'pending',
    code: '------'
  }

  constructor() { }

  ngOnInit(): void {
  }

  goBack() {
  window.history.back();
  }

}
