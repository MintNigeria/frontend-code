import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verification-reason',
  templateUrl: './verification-reason.component.html',
  styleUrls: ['./verification-reason.component.scss']
})
export class VerificationReasonComponent implements OnInit {
  requestId: any;
  requestDetail: any;
  selectedFile!: null
  allowedFiled = ["image/png", "image/jpeg", "application/pdf"];
  selectedFileList: any  = []
  reasonForm!: FormGroup
   
  constructor(
    private fb: FormBuilder,
    private location: LocationStrategy
  ) { }

  ngOnInit(): void {
    this.reasonForm = this.fb.group({
      reasonForRequest: ['', Validators.required]
    })
  }

  changeReason(event: any){

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
  back() {
    this.location.back();
  }
}
