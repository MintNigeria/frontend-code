import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-processing-fee',
  templateUrl: './processing-fee.component.html',
  styleUrls: ['./processing-fee.component.scss']
})
export class ProcessingFeeComponent implements OnInit {
  feeForm!: FormGroup

  editForm!: FormGroup;
  edit ='editModal';

  saveDocumentType: EventEmitter<any> = new EventEmitter();

  constructor(
     private fb: FormBuilder,
     private readonly formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      documentName: ['', Validators.required],
      description: [''],
      email: [false],
      fileUpload: [false],
      hardCopy: [false]
    });
   }

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

  openEdit(){
    document.getElementById('editModal')?.click();
  }
  closeEdit(){
    document.getElementById('editModal')?.click();
  }
}
