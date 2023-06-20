import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { permissionsSelector, isUserSelector } from 'src/app/store/auth/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  permission$ = this.appStore.pipe(select(permissionsSelector));
  permissionList: any;
  user$ = this.appStore.pipe(select(isUserSelector));

  adminUser: any;
  superAdminRole: any;
  alternativePermissions: any;
  constructor(
    private appStore: Store<AppStateInterface>,

  ) { 
    const data: any = localStorage.getItem('authData')
    this.adminUser = JSON.parse(data)
    this.alternativePermissions = this.adminUser?.permissions
    this.superAdminRole = this.adminUser?.user?.role.split('|')[0]

    console.log(this.alternativePermissions)

  }
  ngOnInit(): void {
    this.permissions()
    // this.users()

  }

  permissions() {
    const data: any = localStorage.getItem('authData')
    this.adminUser = JSON.parse(data)
    this.alternativePermissions = this.adminUser?.permissions
    this.permissionList = this.alternativePermissions
    console.log(this.permissionList)

    this.permission$.subscribe((res: any) => {
      if (res !== null) {
        this.permissionList = res;
      } else {
        this.permissionList = this.alternativePermissions
        // console.log(this.permissionList)
      }
    })
  }

  users() {
    this.user$.subscribe((res: any) => {
      this.superAdminRole = res.role.split('|')[0]
      console.log(this.superAdminRole)

    })
  }

}
