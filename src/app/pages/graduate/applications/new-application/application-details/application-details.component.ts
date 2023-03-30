import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent implements OnInit {
  certificateOriginal: boolean = true;
  certificateTemplate: boolean = false;
  certifiedCopy: boolean = false;
  transcript: boolean = false;
  additionalNumber: boolean = false;
  hardCopyMethod: boolean = true;
  emailUploadMethod: boolean = false;
  fileUploadMethod: boolean = false;
  appDetailsForm!: FormGroup;

  emailSelect: boolean = true;
  fileUpload: boolean = false;
  hardCopy: boolean = false;

  selectedFile!: null
allowedFiled = ["image/png", "image/jpeg", "application/pdf"];
selectedFileList: any  = []
 

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.appDetailsForm = this.fb.group ({
      certificate: ['', Validators.required],
      deliveryMethod: ['', Validators.required],
      url: ['', Validators.required],
      loginUser: ['', Validators.required],
      loginPassword: ['', Validators.required],
      phoneNo: ['', Validators.required],
      additionalPhoneNo: [ '', Validators.required ],
      reasonForRequest: [ '',  Validators.required  ],

    })
  }

  originalCertificateClicked(){
    this.certificateOriginal = true;
    this.certificateTemplate = false;
    this.certifiedCopy = false;
    this.transcript = false;
    this.hardCopyMethod = true;
    this.fileUploadMethod = false;
    this.emailUploadMethod = false;
  }

  certificateTemplateClicked(){
    this.certificateOriginal = false;
    this.certificateTemplate = true;
    this.certifiedCopy = false;
    this.transcript = false;
    this.fileUploadMethod = true;
    this.emailUploadMethod = true;
    
  }

 

  certifiedCopyClicked(){
    this.certificateOriginal = false;
    this.certificateTemplate = false;
    this.certifiedCopy = true;
    this.transcript = false;
  }

  transcriptClicked(){
    this.certificateOriginal = false;
    this.certificateTemplate = false;
    this.certifiedCopy = false;
    this.transcript = true;
  }

  emailClicked(){
    this.emailSelect = true;
    this.hardCopy = false; 
    this.fileUpload = false;
  }
  hardCopyClicked(){
    this.emailSelect = false;
    this.hardCopy = true; 
    this.fileUpload = false;

  }

  fileUploadClicked(){
    this.emailSelect = false;
    this.hardCopy = false; 
    this.fileUpload = true;
  }

  showAdditionalNumber(){
    this.additionalNumber = !this.additionalNumber;
  }

  handleFileUpload(e: any) {
    const file = e.target.files[0];
    if (!this.allowedFiled.includes(file.type)) {
		  alert("Invalid format! Please select only correct file type");

		  return;
		} else {
      this.selectedFile = e.target.files[0].name
      this.selectedFileList.push(file)
    }
  }

  cancel(){

  }
}
