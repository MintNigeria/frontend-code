import { Component, OnInit } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { isUserSelector } from 'src/app/store/auth/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user$ = this.appStore.pipe(select(isUserSelector));

  constructor(
    private appStore: Store<AppStateInterface>,
    private store: Store,
    private actions$: Actions
  ) { }

  ngOnInit(): void {

  }

  changeRange(range: number) {
    
  }

}
