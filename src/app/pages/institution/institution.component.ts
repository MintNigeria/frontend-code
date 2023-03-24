import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.scss']
})
export class InstitutionComponent implements OnInit {
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
      title: 'Requests',
      hasChild: true,
      path: 'requests',
      active: 'assets/images/request-active.svg',
      inactive: 'assets/images/request-active.svg',
      childRoute:  [
        {
          route: '/institution/requests',
          name: 'Graduate'
        },
        {
          route: '/institution/requests/organization',
          name: 'Organization'
        }
      ]
    },
    {
      id: 2,
      title: 'Records',
      hasChild: false,
      path: 'records',
      active: 'assets/images/gradaute-active.svg',
      inactive: 'assets/images/graduate-active.svg',
      childRoute:  [
        {
          route: 'approved',
          name: 'Approved'
        },
        {
          route: 'pending',
          name: 'Pending'
        }
      ]
    },
    {
      id: 3,
      title: 'Uploads',
      hasChild: false,
      path: 'uploads',
      active: 'assets/images/institution-inactive.svg',
      inactive: 'assets/images/institution-inactive.svg',
    },
    {
      id: 4,
      title: 'Reports',
      hasChild: false,
      path: 'reports',
      active: 'assets/images/reports.svg',
      inactive: 'assets/images/reports.svg',
    },
    {
      id: 5,
      title: 'Transactions',
      hasChild: false,
      path: 'transactions',
      active: 'assets/images/organization-inactive.svg',
      inactive: 'assets/images/organization-inactive.svg',
    },
    {
      id: 6,
      title: 'Configuration',
      hasChild: false,
      path: 'configuration',
      active: 'assets/images/config-inactive.svg',
      inactive: 'assets/images/config-inactive.svg',
    },
    {
      id: 7,
      title: 'Users and Roles',
      hasChild: false,
      path: 'users-and-roles',
      active: 'assets/images/role-inactive.svg',
      inactive: 'assets/images/role-inactive.svg',
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}