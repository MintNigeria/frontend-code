import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  profileForm!: FormGroup
  selectedFile!: null
  allowedFiled = ["image/png", "image/jpeg", "application/pdf"];

  confirmChanges = 'confirmChanges';
  changesConfirmed = 'changesConfirmed';

  

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initProfileForm()
    setTimeout(() => {
      this.populateForm()
    }, 2000);
  }

  initProfileForm() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      state: ['', Validators.required],
      lga: ['', Validators.required],
      address: ['', Validators.required],
      role: ['', Validators.required],
      staffID: ['', Validators.required]
    })
  }

  populateForm() {
    this.profileForm.patchValue({
      name: 'Olivia Rhye',
      type: 'Super Admin',
      email: 'admin@unilag.edu.ng',
      phone: '070894994954',
      state: 'Lagos',
      lga: 'VI',
      address: '14, Karimu Kotun Road',
      role: 'Admin',
      staffID: 'FG56372'
    })
  }

  handleFileUpload(e: any) {
    const file = e.target.files[0];
    //console.log(file)
    if (!this.allowedFiled.includes(file.type)) {
		  alert("Invalid format! Please select only correct file type");

		  return;
		} else {
      this.selectedFile = e.target.files[0].name
    }
  }

  
  openConfirmChanges() {
    document.getElementById('confirmChanges')?.click();
  }

  cancelConfirmChanges() {
    document.getElementById('confirmChanges')?.click();
  }

  openChangesConfirmed(){
    document.getElementById('changesConfirmed')?.click();
    document.getElementById('confirmChanges')?.click();
  }

}
