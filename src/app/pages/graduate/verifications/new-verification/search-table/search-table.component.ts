import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { getOrganizationWalletId, getOrganizationWalletIdSuccess } from 'src/app/store/organization/action';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent implements OnInit {
  edit = 'editModal';
  graduateList: any;
  modalViewData: any;
  userData: any;
  balance: any;
  activateBtn: boolean = false;

  constructor(
    private router : Router,
    private fb: FormBuilder,
    private store: Store,
    private actions$: Actions,
    private utilityService: UtilityService,
    ) { }
  consentForm!: FormGroup

 
  ngOnInit(): void {
    this.consentForm = this.fb.group({
      consent: ['', Validators.required]
    })
    

    const record: any = sessionStorage.getItem('ver_Ys')
    this.recordList = JSON.parse(record)
  }

  recordList: any

  data : any

  viewDetails(data: any) {
    this.data = data;
    document.getElementById('editModal')?.click();
  }

  cancel(){

  }

  openEdit() {
    sessionStorage.setItem('sel_Ver', JSON.parse(this.data))
    this.router.navigateByUrl('/graduate/my-verifications/new/verification-reason')
    document.getElementById('editModal')?.click();
  }
  
  proceed() {
    sessionStorage.setItem('sel_Ver', JSON.stringify(this.data))
    this.router.navigateByUrl('/graduate/my-verifications/new/verification-reason')
    document.getElementById('editModal')?.click();

  }
  closeEdit() {
    document.getElementById('editModal')?.click();
  }

  checkConsent(event: any) {
    if (event.checked === true) {
      this.activateBtn = true
    } else {
      this.activateBtn = false

    }
  }

}
