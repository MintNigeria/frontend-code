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
  permission$ = this.appStore.pipe(select(permissionsSelector));
  user$ = this.appStore.pipe(select(isUserSelector));
  superAdminRole: any;


  permissionList: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private appStore: Store<AppStateInterface>,
  ) { }

  ngOnInit(): void {
    this.permissions()
    this.users()

  }

  permissions() {
    this.permission$.subscribe((res: any) => {
      this.permissionList = res
      console.log(this.permissionList)
    })
  }

  users() {
    this.user$.subscribe((res: any) => {
      this.superAdminRole = res.role.split('|')[0]

    })
  }

}
