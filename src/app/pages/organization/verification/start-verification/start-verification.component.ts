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
  referenceForm!: FormGroup
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
    this.initReferenceForm()
    setTimeout(() => {
      this.populateForm()
    }, 2000);
  }

  initReferenceForm() {
    this.referenceForm = this.fb.group({
    refNumber: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{14}$/)]],
    reasonForRequest: ['', Validators.required],
  });
  }

  populateForm() {
    this.referenceForm.patchValue({
      refNumber: '23467898763FMS'
    })
  }

  goBack() {
  window.history.back();
  }

  isRefNumberValid(): boolean {
  const refNumberControl = this.referenceForm.get('refNumber');
  return (refNumberControl?.valid ?? false) && (refNumberControl?.touched ?? false);}

}
