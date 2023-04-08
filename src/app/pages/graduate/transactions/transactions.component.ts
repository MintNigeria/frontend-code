import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { getGraduateWalletId, getGraduateWalletIdSuccess } from 'src/app/store/graduates/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  institutionData: any;
  institutionId: any;
  userData: any;
  filter: any;
  transactionDetails: any;
  totalCount: any;
  walletData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
        private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)
    this.store.dispatch(getGraduateWalletId())
    // this.store.dispatch(invokeGetTransactions({institutionId: this.institutionId, payload: this.filter}))
    this.actions$.pipe(ofType(getGraduateWalletIdSuccess)).subscribe((res: any) => {
      // this.transactionDetails = res.payload.data;
      // this.totalCount = res.payload.totalCount
      console.log(res)
      this.walletData = res.payload.payload;
    })
  }

}
