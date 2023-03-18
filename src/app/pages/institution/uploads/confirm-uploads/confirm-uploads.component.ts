import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-confirm-uploads',
  templateUrl: './confirm-uploads.component.html',
  styleUrls: ['./confirm-uploads.component.scss']
})
export class ConfirmUploadsComponent implements OnInit {

  UploadForm!: FormGroup
  changesConfirmed = "changesConfirmed";

  UploadedList = [
    {
      name: 'Adekunle Ciroma',
      gender: 'male',
      dob: '12/01/1989',
      matric: '070812003',
      grade:'Second Class Upper',
      yearofEntry: '2010',
      stateOfOrigin: 'Lagos',
      status: 'successful'
    },
    {
      name: 'Adekunle Ciroma',
      gender: 'maleeee',
      dob: '12/01/1989',
      matric: 'abe',
      grade:'Second Class Upper',
      yearofEntry: '2010',
      stateOfOrigin: 'Lagos',
      status: 'failed'
    },
    {
      name: 'Adekunle Ciroma',
      gender: 'male',
      dob: '12/01/1989',
      matric: '070812003',
      grade:'Second Class Upper',
      yearofEntry: '2010',
      stateOfOrigin: 'Lagos',
      status: 'successful'
    },
    {
      name: 'Adekunle Ciroma',
      gender: 'male',
      dob: '12/01/1989',
      matric: '070812003',
      grade:'Second Class Upper',
      yearofEntry: '2010',
      stateOfOrigin: 'Lagos',
      status: 'successful'
    },
    {
      name: 'Adekunle Ciroma',
      gender: 'male',
      dob: '12/01/1989',
      matric: '070812003',
      grade:'Second Class Upper',
      yearofEntry: '2010',
      stateOfOrigin: 'Lagos',
      status: 'successful'
    },
    {
      name: 'Adekunle Ciroma',
      gender: 'male',
      dob: '12/01/1989',
      matric: '070812003',
      grade:'Second Class Upper',
      yearofEntry: '2010',
      stateOfOrigin: 'Lagos',
      status: 'successful'
    },
    {
      name: 'Adekunle Ciroma',
      gender: 'male',
      dob: '12/01/1989',
      matric: '070812003',
      grade:'Second Class Upper',
      yearofEntry: '2010',
      stateOfOrigin: 'Lagos',
      status: 'successful'
    },
    {
      name: 'Adekunle Ciroma',
      gender: 'male',
      dob: '12/01/1989',
      matric: '070812003',
      grade:'Second Class Upper',
      yearofEntry: '2010',
      stateOfOrigin: 'Lagos',
      status: 'successful'
    },
    {
      name: 'Adekunle Ciroma',
      gender: 'maleeee',
      dob: '12/01/1989',
      matric: 'abe',
      grade:'Second Class Upper',
      yearofEntry: '2010',
      stateOfOrigin: 'Lagos',
      status: 'failed'
    },
    {
      name: 'Adekunle Ciroma',
      gender: 'maleeee',
      dob: '12/01/1989',
      matric: 'abe',
      grade:'Second Class Upper',
      yearofEntry: '2010',
      stateOfOrigin: 'Lagos',
      status: 'failed'
    },
    {
      name: 'Adekunle Ciroma',
      gender: 'male',
      dob: '12/01/1989',
      matric: '070812003',
      grade:'Second Class Upper',
      yearofEntry: '2010',
      stateOfOrigin: 'Lagos',
      status: 'successful'
    },
    {
      name: 'Adekunle Ciroma',
      gender: 'male',
      dob: '12/01/1989',
      matric: '070812003',
      grade:'Second Class Upper',
      yearofEntry: '2010',
      stateOfOrigin: 'Lagos',
      status: 'successful'
    },
  ]
successful: any;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initUploadForm()
    setTimeout(() => {
      this.populateForm()
    }, 2000);
  }

  initUploadForm() {
    this.UploadForm = this.fb.group({
      faculty: [''],
      department: [''],
      bsc: [''],
      yearofGrad:['']
      
    })
  }

  populateForm() {
    this.UploadForm.patchValue({
      faculty: 'Management Sciences',
      department: 'Business Administration',
      bsc: 'B.Sc',
      yearofGrad: '2014',
    })
  }


  goBack() {
  window.history.back();
}

openChangesConfirmed(){
  document.getElementById('changesConfirmed')?.click();
}

}
