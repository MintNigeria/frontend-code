import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-api-configuration',
  templateUrl: './api-configuration.component.html',
  styleUrls: ['./api-configuration.component.scss'],
})
export class ApiConfigurationComponent implements OnInit {
  apiConfigurationForm!: FormGroup;
  uploadType = [
    {
      name: 'simple',
      description:
        'This involves uploading data to VAC system via the use of Excel sheet',
    },
    {
      name: 'API Upload',
      description: 'Upload record by entering API endpoint in a structure data',
    },
  ];

  selectedFileUploadType: string = '';
  constructor() {}

  ngOnInit(): void {
    this.initApiConfigurationForm();
  }

  initApiConfigurationForm() {
    this.apiConfigurationForm = new FormGroup({
      ivKey: new FormControl('', [
        Validators.required,
        Validators.maxLength(16),
        Validators.minLength(16),
      ]),
      secreteKey: new FormControl('', [
        Validators.required,
        Validators.maxLength(16),
        Validators.minLength(16),
      ]),
    });
  }

  selecUploadType(unit: any) {
    this.selectedFileUploadType = unit.name;
  }
}
