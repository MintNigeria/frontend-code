import { Component, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { getGraduateWalletId, getGraduateWalletIdSuccess } from 'src/app/store/graduates/action';
import { getOrganizationWalletId, getOrganizationWalletIdSuccess } from 'src/app/store/organization/action';

@Component({
  selector: 'app-new-verification',
  templateUrl: './new-verification.component.html',
  styleUrls: ['./new-verification.component.scss']
})
export class NewVerificationComponent implements OnInit {
  userData: any;
  balance: any;

  constructor(
    private store: Store,
    private actions$: Actions,
  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)
    this.store.dispatch(getGraduateWalletId())
    this.actions$.pipe(ofType(getGraduateWalletIdSuccess)).subscribe((res: any) => {
      this.balance = res.payload.payload.balance;
    })
  }

  

}
