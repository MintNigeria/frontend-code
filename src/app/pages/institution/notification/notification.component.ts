import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getNotification } from 'src/app/store/notification/action';
import { notificationSelector } from 'src/app/store/notification/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notification$ = this.appStore.pipe(select(notificationSelector))
  userData: any;

  constructor(
    private appStore: Store<AppStateInterface>,

    private store : Store,

  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)
    console.log(this.userData), 'ddsdsdsds';

    this.store.dispatch(getNotification({entityId: this.userData.InstitutionId, userType: 2}))

  }

}
