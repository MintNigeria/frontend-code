import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { LogoutModalComponent } from 'src/app/shared/components/logout-modal/logout-modal.component';
import { isUserSelector } from 'src/app/store/auth/selector';
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
      hasChild: false,
      path: 'verifications',
      active: 'assets/images/verification_inactive.svg',
      inactive: 'assets/images/verification_inactive.svg',
      show: true
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
    {
      id: 5,
      title: 'Settings',
      label: 'Settings',
      hasChild: false,
      path: 'settings',
      active: 'assets/images/settings_inactive.svg',
      inactive: 'assets/images/settings_inactive.svg',
      show: true
    },
  ];
  user$ = this.appStore.pipe(select(isUserSelector));
  notification$ = this.appStore.pipe(select(notificationSelector))

  constructor(
    private appStore: Store<AppStateInterface>,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }
  openLogoutModal() {
    const dialogRef = this.dialog.open(LogoutModalComponent, {
      // width: '600px',
      // height: '600px'
    });
  }

}
