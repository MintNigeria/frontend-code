import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { HelpDeskComponent } from 'src/app/shared/components/help-desk/help-desk.component';
import { LogoutModalComponent } from 'src/app/shared/components/logout-modal/logout-modal.component';
import { TimerService } from 'src/app/shared/util/timer.service';
import { isUserSelector } from 'src/app/store/auth/selector';
import { getNotification } from 'src/app/store/notification/action';
import { notificationSelector } from 'src/app/store/notification/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-graduate',
  templateUrl: './graduate.component.html',
  styleUrls: ['./graduate.component.scss']
})
export class GraduateComponent implements OnInit {
  menuLinks = [
    {
      id: 1,
      title: 'Dashboard',
      label: 'Dashboard',
      hasChild: false,
      path: 'dashboard',
      active: 'assets/images/dashboard-inactive.svg',
      inactive: 'assets/images/dashboard-inactive.svg',
      show: false
    },
    {
      id: 2,
      title: 'My Applications',
      label: 'My Applications',
      hasChild: false,
      path: 'my-applications',
      active: 'assets/images/dashboard-inactive.svg',
      inactive: 'assets/images/dashboard-inactive.svg',
      show: false
    },
    {
      id: 3,
      title: 'My Verifications',
      label: 'My Verifications',
      hasChild: false,
      path: 'my-verifications',
      active: 'assets/images/dashboard-inactive.svg',
      inactive: 'assets/images/dashboard-inactive.svg',
      show: false
    },
    
    {
      id: 4,
      title: 'Transactions',
      label: 'Transactions',
      hasChild: false,
      path: 'transactions',
      active: 'assets/images/organization-inactive.svg',
      inactive: 'assets/images/organization-inactive.svg',
      show: false
    },
    // {
    //   id: 5,
    //   title: 'Settings',
    //   label: 'Settings',
    //   hasChild: false,
    //   path: 'settings',
    //   active: 'assets/images/config-inactive.svg',
    //   inactive: 'assets/images/config-inactive.svg',
    //   show: false
    // },
  ];
  // user$ = this.appStore.pipe(select(isUserSelector));
  notification$ = this.appStore.pipe(select(notificationSelector))

  userData: any;
  userId!: number;
user: any
  constructor(
    private appStore: Store<AppStateInterface>,
    private dialog: MatDialog,
    private store : Store,
    private timer: TimerService


  )
 
{
  const data: any = localStorage.getItem('authData')
  this.user = JSON.parse(data)

 }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)
    this.appStore.pipe(select(isUserSelector)).subscribe((res)=> {
      this.userId = Number(res?.id)
    })
    this.store.dispatch(getNotification({entityId: this.userData.GraduateId, userType: 3}))

  }

  openLogoutModal() {
    const dialogRef = this.dialog.open(LogoutModalComponent, {
      // width: '600px',
      // height: '600px'
    });
  }

  openHelpDesk() {
    const dialogRef = this.dialog.open(HelpDeskComponent, {
      width: '500px',
      height: 'auto',
      data: {userType: 3},
      disableClose: true,

    });
    
  }

  openMobileNav() {
    const el: any = document.getElementById('targetEl');
    el.classList.toggle('showMobileNav')
  }
  
  closeNav(event: any) {
    if (event.close === 'true') {

      const el: any = document.getElementById('targetEl');
      el.classList.remove('showMobileNav')

    }
  }

}
