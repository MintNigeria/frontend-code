import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectAppAPIResponse } from 'src/app/store/shared/app.selector';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  currentRoute: any;
  apiLoader$ = this.appStore.pipe(select(selectAppAPIResponse))
  constructor(
    private appStore: Store<AppStateInterface>,
    private router: Router
  ) {
    this.currentRoute = window.location.pathname;
   }

  ngOnInit(): void {
  }

  goBack() {
    console.log('twale')
    this.router.navigateByUrl('/institution/uploads')
  }

}
