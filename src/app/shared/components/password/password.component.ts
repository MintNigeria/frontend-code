import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  @Input() type: string = 'password';
  @Input() id: string = 'password';
  @Input() placeholder: string = '';
  @Input() class!: string;
  @Input() required: boolean = false;
  @Input() control: FormControl = new FormControl();
  @Input() errorMessage: string = '';
  @Input() value: string = '';
  @Input() formCtrlName: any;
  @Input() formGrp!: FormGroup;
  @Input() name?:string;



  constructor() {}

  ngOnInit(): void {}

  showPassword() {
    this.type === 'password' ? (this.type = 'text') : (this.type = 'password');
  }

  displayErrors() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }

}
