import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-hub',
  templateUrl: './my-hub.component.html',
  styleUrls: ['./my-hub.component.scss']
})
export class MyHubComponent implements OnInit {

  uploadForm!: FormGroup

  selectedFile!: any
  allowedFiled = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/pdf"];

  confirmChanges = 'confirmChanges';
  changesConfirmed = 'changesConfirmed';

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initUploadForm()
    setTimeout(() => {
      this.populateForm()
    },2000)
  }

  initUploadForm(){
    this.uploadForm = this.fb.group({
      documentName: ['', Validators.required],
      Issuer: ['', Validators.required],
      date: ['', Validators.required],
    })
  }

  populateForm(){
    this.uploadForm.patchValue({
      documentName: 'NYSC',
      Issuer: 'Federal Government',
      date: '03/04/1963'
    })
  }

  openConfirmChanges() {
    document.getElementById('confirmChanges')?.click();
  }
  closeConfirmChanges() {
    document.getElementById('confirmChanges')?.click();
  }

  cancelConfirmChanges() {
    document.getElementById('confirmChanges')?.click();
  }

  openChangesConfirmed(){
    // document.getElementById('changesConfirmed')?.click();
    document.getElementById('confirmChanges')?.click();
  }

  saveUpdates (){

  }

  handleFileUpload(e: any) {
    const file = e.target.files[0];
    ////console.log(file)
    if (!this.allowedFiled.includes(file.type)) {
		  alert("Invalid format! Please select only correct file type");

		  return;
		} else {
      this.selectedFile = e.target.files[0]
    }
  }

}
