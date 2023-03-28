import { Component, OnInit } from '@angular/core';

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
      hasChild: false,
      path: 'dashboard',
      active: 'assets/images/dashboard-inactive.svg',
      inactive: 'assets/images/dashboard-inactive.svg',
    },
    {
      id: 2,
      title: 'Verifications',
      hasChild: false,
      path: 'verifications',
      active: 'assets/images/verification_inactive.svg',
      inactive: 'assets/images/verification_inactive.svg',
    },
    {
      id: 3,
      title: 'Transactions',
      hasChild: false,
      path: 'transactions',
      active: 'assets/images/transaction_inactive.svg',
      inactive: 'assets/images/transaction_inactive.svg',
    },
    {
      id: 4,
      title: 'Talent Search Pool',
      hasChild: false,
      path: 'talent-search-pool',
      active: 'assets/images/valueaddedservice_inactive.svg',
      inactive: 'assets/images/valueaddedservice_inactive.svg',
    },
    {
      id: 5,
      title: 'Settings',
      hasChild: false,
      path: 'settings',
      active: 'assets/images/settings_inactive.svg',
      inactive: 'assets/images/settings_inactive.svg',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
