import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  @Input() control: FormControl = new FormControl();
  @Input() type: string = 'text';
  @Input() id!: string;
  @Input() Issuer: string = '';
  @Input() required: boolean = false;
  @Input() readonly: boolean = false;
  @Input() class!: string;
  @Input() errorMessage: string = '';
  @Input() invalid!: any;
  @Input() pattern!: string;
  @Input() value?: string;
  @Input() formCtrlName: any;
  @Input() formGrp!: FormGroup;
  @Input() name?: string;
  @Input() maxLength?: string | number | null | undefined;
  @Input() minLength?: string | number | null | undefined;

  constructor() {}

  ngOnInit(): void {}

  displayErrors() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }


}
