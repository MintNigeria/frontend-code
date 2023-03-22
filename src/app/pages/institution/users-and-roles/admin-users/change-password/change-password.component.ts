import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm! : FormGroup;

  confirmChanges = 'confirmChanges';
  changesConfirmed = 'changesConfirmed';

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initPasswordForm()
    setTimeout(() => {
      this.populateForm()
    }, 2000);
  }

  initPasswordForm() {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })
  }

  populateForm() {
    this.passwordForm.patchValue({
      currentPassword: 'Olivia Rhye',
      newPassword: 'Super Admin',
      confirmPassword: 'admin@unilag.edu.ng',
    })
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
