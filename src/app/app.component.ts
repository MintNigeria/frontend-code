import { filter, mapTo, merge, Observable, Subscription } from 'rxjs';
import { AppResponseInterface } from './types/appState.interface';
import { StorageService } from './core/services/shared/storage.service';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Router, ResolveStart, ResolveEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mint-client';
  isLoading$!: Observable<boolean>;
  eventBusSub?: Subscription;
  private _showLoaderEvents$!: Observable<boolean>;
  private _hideLoaderEvents$!: Observable<boolean>;
  constructor(
    private router: Router,
    // private eventBusService: EventBusService,
    private store: Store<AppResponseInterface>,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    // this.eventBusSub = this.eventBusService.on('logout', (message: string) => {
    //   if (message) {
    //     this.storage.clear();
    //     // this.router.navigate(['/']);
    //     location.href = '/';
    //   }
    // });

    // this would help loading when a resolver is added to a route
    this._showLoaderEvents$ = this.router.events.pipe(
      filter((e) => e instanceof ResolveStart),
      mapTo(true)
    );

    this._hideLoaderEvents$ = this.router.events.pipe(
      filter((e) => e instanceof ResolveEnd),
      mapTo(false)
    );
    this.isLoading$ = merge(this._showLoaderEvents$, this._hideLoaderEvents$);
  }

  // loading value coming from the state should be added here
  public loadingStatus$ = this.store.select('isLoading');
}
