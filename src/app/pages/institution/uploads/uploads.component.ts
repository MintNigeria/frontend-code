import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { isUserSelector, permissionsSelector } from 'src/app/store/auth/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent implements OnInit {
  // permission$ = this.appStore.pipe(select(permissionsSelector));
  // user$ = this.appStore.pipe(select(isUserSelector));
  superAdminRole: any;

  alternativePermissions: any;
  adminUser: any;

  permissionList: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private appStore: Store<AppStateInterface>,
  ) { 
    const data: any = localStorage.getItem('authData')
    this.adminUser = JSON.parse(data)
    this.alternativePermissions = this.adminUser?.permissions
    this.superAdminRole = this.adminUser?.user?.role.split('|')[0]

  }
  
  ngOnInit(): void {
    
    // this.permissions()
    this.users()

  }

  // permissions() {
   
  //   this.permission$.subscribe((res: any) => {
  //     if (res !== null) {
  //       this.permissionList = res;
  //     } else {
  //       this.permissionList = this.alternativePermissions
  //     }
  //   })
  // }

  users() {
    // console.log('sdsds')
    // this.user$.subscribe((res: any) => {
    //   this.superAdminRole = res.role.split('|')[0]

    // })
  }

}
