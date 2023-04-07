import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {
  edit = 'editModal';
  consentForm!: FormGroup
  recordList: any
  data : any
  constructor(
    private router : Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.consentForm = this.fb.group({
      consent: ['', Validators.required]
    })
        const record: any = sessionStorage.getItem('ver_Ys')
    this.recordList = JSON.parse(record)

  }



  viewDetails(data: any) {
    this.data = data;
    document.getElementById('editModal')?.click();
  }

  cancel(){

  }

  openEdit() {
    this.router.navigateByUrl('/graduate/my-applications/new/app-details')
    document.getElementById('editModal')?.click();
  }

  proceed() {
    sessionStorage.setItem('sel_Ver', JSON.stringify(this.data))
    this.router.navigateByUrl('/graduate/my-applications/new/app-details')
    document.getElementById('editModal')?.click();

  }

  closeEdit() {
    document.getElementById('editModal')?.click();
  }
  
}
