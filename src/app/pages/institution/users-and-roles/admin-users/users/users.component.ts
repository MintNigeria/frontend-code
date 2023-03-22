import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  changesConfirmed = "changesConfirmed";
  editForm!: FormGroup;

  constructor(private fb: FormBuilder) {
  }


  ngOnInit(): void {
    this.initEditForm()
    setTimeout(() => {
      this.populateForm()
    }, 2000);
  }

  initEditForm() {
    this.editForm = this.fb.group({
      title: [''],
      name: [''],
      email: [''],
      phone: [''],
      address: [''],
      staffID: [''],
    })
  }

  populateForm() {
    this.editForm.patchValue({
      title: 'Dr',
      name: 'Olivia Rhy',
      email: 'admin@unilag.edu.ng',
      phone: '070894994954',
      address: '14, Karimu Kotun Road',
      staffID: '345566NK',
    })
  }

  openChangesConfirmed(){
  document.getElementById('changesConfirmed')?.click();
}


}
