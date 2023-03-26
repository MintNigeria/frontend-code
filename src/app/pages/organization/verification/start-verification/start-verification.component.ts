import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { getInstitutionSector, getInstitutionTypes } from 'src/app/store/institution/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

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
    private fb: FormBuilder,
    private appStore: Store<AppStateInterface>,
    private store: Store,
    private router: Router,
    private actions$  : Actions
  ) { }

  ngOnInit(): void {
    this.store.dispatch(
      getInstitutionSector()
    );
    this.store.dispatch(
      getInstitutionTypes()
    );
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
