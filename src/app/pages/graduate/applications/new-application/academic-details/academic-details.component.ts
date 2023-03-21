import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-academic-details',
  templateUrl: './academic-details.component.html',
  styleUrls: ['./academic-details.component.scss']
})
export class AcademicDetailsComponent implements OnInit {
  academicDetailsForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  initForm() {
    this.academicDetailsForm = this.fb.group({
      institutionBody: ['', Validators.required],
      institutionType: ['', Validators.required],
      institutionSector: ['', Validators.required],
      institution_body: ['', Validators.required],
      institution: ['', Validators.required],
      faculty: ['', Validators.required],
      department: ['', Validators.required],
      firstname: ['', Validators.required],
      middlename: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      matricNo: ['', Validators.required],
      degreeType: ['', Validators.required],
      yearOfEntry: ['', Validators.required],
      yearOfGraduation: ['', Validators.required],
    })
  }
}
