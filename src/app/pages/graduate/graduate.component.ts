import { Component, OnInit } from '@angular/core';

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
      hasChild: false,
      path: 'dashboard',
      active: 'assets/images/dashboard-inactive.svg',
      inactive: 'assets/images/dashboard-inactive.svg',
    },
    {
      id: 2,
      title: 'My Applications',
      hasChild: false,
      path: 'my-applications',
      active: 'assets/images/dashboard-inactive.svg',
      inactive: 'assets/images/dashboard-inactive.svg',
    },
    {
      id: 3,
      title: 'My Verifcations',
      hasChild: false,
      path: 'my-verifications',
      active: 'assets/images/dashboard-inactive.svg',
      inactive: 'assets/images/dashboard-inactive.svg',
    },
    
    {
      id: 4,
      title: 'Transactions',
      hasChild: false,
      path: 'transactions',
      active: 'assets/images/organization-inactive.svg',
      inactive: 'assets/images/organization-inactive.svg',
    },
    {
      id: 5,
      title: 'Support',
      hasChild: false,
      path: 'support',
      active: 'assets/images/dashboard-inactive.svg',
      inactive: 'assets/images/dashboard-inactive.svg',
    },
    {
      id: 6,
      title: 'Settings',
      hasChild: false,
      path: 'settings',
      active: 'assets/images/config-inactive.svg',
      inactive: 'assets/images/config-inactive.svg',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
