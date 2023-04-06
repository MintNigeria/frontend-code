import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { isUserSelector } from 'src/app/store/auth/selector';
import { getNotification } from 'src/app/store/notification/action';
import { notificationSelector } from 'src/app/store/notification/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userData: any;
  userId!: number;
  notification$ = this.appStore.pipe(select(notificationSelector))

  constructor(
     private appStore: Store<AppStateInterface>,
    private store : Store,
  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)
    this.appStore.pipe(select(isUserSelector)).subscribe((res)=> {
      this.userId = Number(res?.id)
      console.log(this.userId)
    })
    if (this.userData.UserType === 'Institution') {
      this.store.dispatch(getNotification({entityId: this.userId, userType: 2}))
    }
    if (this.userData.UserType === 'Graduates') {
      this.store.dispatch(getNotification({entityId: this.userId, userType: 3}))
    }
    if (this.userData.UserType === 'Organization') {
      this.store.dispatch(getNotification({entityId: this.userId, userType: 4}))
    }
  }

}
