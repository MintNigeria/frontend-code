import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { HelpDeskComponent } from 'src/app/shared/components/help-desk/help-desk.component';
import { LogoutModalComponent } from 'src/app/shared/components/logout-modal/logout-modal.component';
import { TimerService } from 'src/app/shared/util/timer.service';
import { isUserSelector } from 'src/app/store/auth/selector';
import { getNotification } from 'src/app/store/notification/action';
import { notificationSelector } from 'src/app/store/notification/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  menuLinks = [
    {
      id: 1,
      title: 'Dashboard',
      label: 'Dashboard',
      hasChild: false,
      path: 'dashboard',
      active: 'assets/images/dashboard-inactive.svg',
      inactive: 'assets/images/dashboard-inactive.svg',
      show: true
    },
    {
      id: 2,
      title: 'Verifications',
      label: 'Verifications',
      hasChild: true,
      path: 'verifications',
      active: 'assets/images/verification_inactive.svg',
      inactive: 'assets/images/verification_inactive.svg',
      show: true,
      childRoute:  [
        {
          route: '/organization/verifications',
          name: 'Verification List'
        },
        {
          route: '/organization/verifications/verify-record-by-code',
          name: 'Verify By Code'
        },
        {
          route: '/organization/verifications/verify-graduate-details',
          name: 'Verify By Graduate Details'
        }
      ]
      
    },
    {
      id: 3,
      title: 'Transactions',
      label: 'Transactions',
      hasChild: false,
      path: 'transactions',
      active: 'assets/images/transaction_inactive.svg',
      inactive: 'assets/images/transaction_inactive.svg',
      show: true
    },
    {
      id: 4,
      title: 'Talent Search Pool',
      label: 'Talent Search Pool',
      hasChild: false,
      path: 'talent-search-pool',
      active: 'assets/images/valueaddedservice_inactive.svg',
      inactive: 'assets/images/valueaddedservice_inactive.svg',
      show: true
    },
    
  ];
  // user$ = this.appStore.pipe(select(isUserSelector));
  notification$ = this.appStore.pipe(select(notificationSelector))
  userData: any;
  userId!: number;
  user: any;

  constructor(
    private appStore: Store<AppStateInterface>,
    private dialog: MatDialog,
    private store : Store,
    private timer: TimerService


  ) {
    const data: any = localStorage.getItem('authData')
    this.user = JSON.parse(data)

   }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)
    this.appStore.pipe(select(isUserSelector)).subscribe((res)=> {
      this.userId = Number(res?.id)
    })
    this.store.dispatch(getNotification({entityId: this.userData.OrganizationId, userType: 4}))

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
      data: {userType: 4},
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
