import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-start-verification',
  templateUrl: './start-verification.component.html',
  styleUrls: ['./start-verification.component.scss']
})
export class StartVerificationComponent implements OnInit {
profileForm!: FormGroup
  selectedFile!: null
allowedFiled = ["image/png", "image/jpeg", "application/pdf"];

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
      matric: ['', Validators.required],
      state: ['', Validators.required],
      lga: ['', Validators.required],
      address: ['', Validators.required],
    })
  }

  populateForm() {
    this.profileForm.patchValue({
      name: 'Chukwuka Chiemelie Esther',
      type: 'Super Admin',
      email: 'admin@yopmail.com',
      matric: '1234567890',
      state: 'Lagos',
      lga: 'VI',
      address: '14, Karimu Kotun Road',
    })
  }

}
