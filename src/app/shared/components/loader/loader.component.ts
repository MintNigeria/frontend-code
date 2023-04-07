import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectAppAPIResponse } from 'src/app/store/shared/app.selector';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  apiLoader$ = this.appStore.pipe(select(selectAppAPIResponse))
  constructor(
    private appStore: Store<AppStateInterface>

  ) { }

  ngOnInit(): void {
  }

}
