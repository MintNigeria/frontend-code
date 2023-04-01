import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-institution-details',
  templateUrl: './institution-details.component.html',
  styleUrls: ['./institution-details.component.scss']
})
export class InstitutionDetailsComponent implements OnInit {
  institutionDetailsForm!: FormGroup
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.institutionDetailsForm = this.fb.group({
      institutionBody: ['', Validators.required],
      faculty: ['', Validators.required],
      department: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      matricNo: ['', Validators.required],
      degreeType: ['', Validators.required],
      yearOfEntry: ['', Validators.required],
      yearOfGraduation: ['', Validators.required],
      consent: ['', Validators.required],    
    })
  }

  changeGender(event: any) {
   
  }

  cancel(){

  }
}
