import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verification-fee',
  templateUrl: './verification-fee.component.html',
  styleUrls: ['./verification-fee.component.scss']
})
export class VerificationFeeComponent implements OnInit {
  feeForm!: FormGroup

  constructor( private fb: FormBuilder,) { }

   ngOnInit(): void {
    this.initFeeForm()
    setTimeout(() => {
      this.populateForm()
    }, 2000);
  }

  initFeeForm() {
    this.feeForm = this.fb.group({
      fee: [''],
    })
  }

   populateForm() {
    this.feeForm.patchValue({
      fee: 'N 5000',
    })
  }

  

}
