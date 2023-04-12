import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { LogoutModalComponent } from 'src/app/shared/components/logout-modal/logout-modal.component';
import { isUserSelector } from 'src/app/store/auth/selector';
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
      title: 'My Verifcations',
      label: 'My Verifcations',
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
  user$ = this.appStore.pipe(select(isUserSelector));
  notification$ = this.appStore.pipe(select(notificationSelector))


  constructor(
    private appStore: Store<AppStateInterface>,
    private dialog: MatDialog,
  )
 
{ }

  ngOnInit(): void {
  }

  openLogoutModal() {
    const dialogRef = this.dialog.open(LogoutModalComponent, {
      // width: '600px',
      // height: '600px'
    });
  }

}
