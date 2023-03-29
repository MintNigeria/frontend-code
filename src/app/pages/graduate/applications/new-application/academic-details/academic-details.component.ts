import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-academic-details',
  templateUrl: './academic-details.component.html',
  styleUrls: ['./academic-details.component.scss']
})
export class AcademicDetailsComponent implements OnInit {
  academicDetailsForm!: FormGroup;
  emailSelect: boolean = true;
  fileUpload: boolean = false;
  hardCopy: boolean = false;
  tertiaryChecked: boolean = true;
  profBody: boolean = false;



  constructor(private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.initAcademicDetailsForm()
  }


  initAcademicDetailsForm(){
    this.academicDetailsForm = this.fb.group({
      institutionBody: ['', Validators.required],
      faculty: ['', Validators.required],
      department: ['', Validators.required],
      fullName: ['', Validators.required],
      gender: ['', Validators.required],
      matricNo: ['', Validators.required],
      degreeType: ['', Validators.required],
      yearOfEntry: ['', Validators.required],
      yearOfGraduation: ['', Validators.required],
      consent: ['', Validators.required],
      verificationType: ['', Validators.required],
      deliveryMethod: ['', Validators.required],  
      documentType : ['', Validators.required] 
    
    })
  }
  changeGender(event: any) {
   
  }

  emailClicked(){
    this.emailSelect = true;
    this.fileUpload = false;
    this.hardCopy = false;
  }

  fileUploadClicked(){
    this.emailSelect = false;
    this.fileUpload = true;
    this.hardCopy = false;
  }

  
  hardCopyClicked(){
    this.emailSelect = false;
    this.fileUpload = false;
    this.hardCopy = true;
  }

  cancel(){

  }

  // search(){
  //   this.router.navigateByUrl('/graduate/new/search-table');
  // }

  tertiaryInstitution(){
    this.tertiaryChecked = true;
    this.profBody = false;
  }

  professionalBody(){
    this.tertiaryChecked = false;
    this.profBody = true;
  }
}
