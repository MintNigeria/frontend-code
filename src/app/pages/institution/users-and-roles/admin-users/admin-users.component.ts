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

  constructor(
    private appStore: Store<AppStateInterface>,

  ) { }
  ngOnInit(): void {
    this.permissions()

  }

  permissions() {
    this.permission$.subscribe((res: any) => {
      this.permissionList = res;  
    })
  }

}
