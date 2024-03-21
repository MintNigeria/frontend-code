import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { isUserSelector, permissionsSelector } from 'src/app/store/auth/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { getALlDepartmentInInstitution, getALlFacultiesInInstitution, getALlFacultiesInInstitutionSuccess, getInstitutionDataEncryptionDecryption, getInstitutionDataSource, getInstitutionDataSourceSuccess } from 'src/app/store/institution/action';
import { Actions, ofType } from '@ngrx/effects';

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
  configurationData: any;
  institutionData: any;
  institutionId: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,

  ) { 
    const data: any = localStorage.getItem('authData')
    this.adminUser = JSON.parse(data)
    this.permissionList = this.adminUser?.permissions
    this.superAdminRole = this.adminUser?.user?.role.split('|')[0]

  }
  
  ngOnInit(): void {
    
    // this.permissions()
    this.users()
    const data: any = localStorage.getItem('userData')

    this.institutionData = JSON.parse(data)
    this.institutionId = this.institutionData.InstitutionId

    this.store.dispatch(getInstitutionDataSource({ id: this.institutionId }));
    this.actions$
      .pipe(ofType(getInstitutionDataSourceSuccess))
      .subscribe((res: any) => {
        this.configurationData = res.payload;
        if (this.configurationData.dataSource === 1) {
          // this.selectedFileUploadType = 'api';

        }
      });

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
