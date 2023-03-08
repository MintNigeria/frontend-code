import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-institutition-registration',
  templateUrl: './institutition-registration.component.html',
  styleUrls: ['./institutition-registration.component.scss']
})
export class InstitutitionRegistrationComponent implements OnInit {
  otplength: any;
  otpValue: any;

  siteKey: string = environment.recaptchaKey

institutionRegForm!: FormGroup
selectedFile!: null
allowedFiled = ["image/png", "image/jpeg", "application/pdf"];
selectedFileList: any  = []
  showOTPPage: boolean = false;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initInstitutionRegForm()
  }

  initInstitutionRegForm() {
    this.institutionRegForm = this.fb.group({
      institutionBody: ['', Validators.required]
    })
  }

  handleFileUpload(e: any) {
    const file = e.target.files[0];
    console.log(file)
    if (!this.allowedFiled.includes(file.type)) {
		  alert("Invalid format! Please select only correct file type");

		  return;
		} else {
      this.selectedFile = e.target.files[0].name
      this.selectedFileList.push(file)
    }
  }

  public resolved(captchaResponse: string): void {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.institutionRegForm.controls['recaptchaReactive'].setValue(captchaResponse)
  }

  continueCreation() {
    this.showOTPPage = true;
  }
  onOtpChange(event: any) {
    this.otplength = event
    this.otpValue = event;
    
  }

  verifyOTP() {

  }

  resendOTP() {

  }

}
