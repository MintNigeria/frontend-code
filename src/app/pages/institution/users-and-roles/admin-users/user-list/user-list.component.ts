import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { globalUsersAndRolesSelector,  } from 'src/app/store/users-and-roles/selector';
import { getAllGlobalUsersAndRoles, } from 'src/app/store/users-and-roles/actions';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { getALlFacultiesInInstitutionSuccess, getAllInstitutionUsers, getAllInstitutionUsersSuccess } from 'src/app/store/institution/action';
import { Actions, ofType } from '@ngrx/effects';
import { isUserSelector, permissionsSelector } from 'src/app/store/auth/selector';
import { UsersAndRolesService } from 'src/app/core/services/users-and-roles/users-and-roles.service';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  permission$ = this.appStore.pipe(select(permissionsSelector));
  user$ = this.appStore.pipe(select(isUserSelector));

  permissionList: any;

  userAndRoles$ = this.appStore.pipe(select(globalUsersAndRolesSelector))
  keyword: string = '';
  pageIndex: number = 1;
  pageSize: number = 10;
  totalCount: any = 0;
  id: string = '';
  institutionData: any;
  institutionId: any;
  userAndRoles: any;
  searchForm = new FormGroup({
    searchPhrase: new FormControl(''),
  });
  filter = {
    institutionId: '',
    keyword: '',
    filter: '',
    pageSize: 10,
    pageIndex: 1
  }
  superAdminRole: any;
  adminUser: any;

  constructor(
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private router: Router,
    private actions$: Actions,
    private userAndRolesService: UsersAndRolesService,
    private notificationService: NotificationsService
  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    console.log(data)
    this.institutionData = JSON.parse(data)
    this.institutionId = this.institutionData.InstitutionId
    const data2: any = localStorage.getItem('authData')

    this.adminUser = JSON.parse(data2)
    this.permissionList = this.adminUser?.permissions;
    console.log(this.adminUser)
    // this.superAdminRole = this.adminUser.user.role.split('|')[0]
    this.permissions()
    this.users()

   this.store.dispatch(getAllInstitutionUsers({payload: {...this.filter, institutionId: this.institutionId}}))
   this.actions$.pipe(ofType(getAllInstitutionUsersSuccess)).subscribe((res: any) => {
    this.userAndRoles = res.payload.data;
    this.totalCount = res.payload.totalCount;
  })
    this.searchForm.controls.searchPhrase.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((term) => {
        this.keyword = term as string;
        this.search(term as string);
      });

  }

  permissions() {
    const data: any = localStorage.getItem('authData')
    this.adminUser = JSON.parse(data)
    this.permissionList = this.adminUser?.permissions;
    // this.permission$.subscribe((res: any) => {
    //   this.permissionList = res
    //   console.log(res)
    // })
  }

  users() {
    this.user$.subscribe((res: any) => {
      this.superAdminRole = res.role.split('|')[0]

    })
  }

  // getUsers(){
  //   this.store.dispatch(
  //     getAllGlobalUsersAndRoles({
  //       keyword: this.keyword,
  //       filter: '',
  //       pageSize: this.pageSize,
  //       pageIndex: this.pageIndex
  //     })
  //   )
  // }

  seeDetails(id: string){
    this.router.navigateByUrl(`/institution/users-and-roles/users/${id}`);
  }

  search(event: any) {
    if (event) {
      const filter = {...this.filter, ['keyword'] : event}
      this.store.dispatch(getAllInstitutionUsers({payload: {...filter, institutionId: this.institutionId}}))
      } else {
        const filter = {...this.filter, ['keyword'] : ''}
        this.store.dispatch(getAllInstitutionUsers({payload: {...filter, institutionId: this.institutionId}}))
      }
  }

  getPage(currentPage: number) {
    const filter = {...this.filter, ['pageIndex'] : currentPage}
    this.filter = filter
    this.store.dispatch(getAllInstitutionUsers({payload: {...filter, institutionId: this.institutionId}}))
    
  }
  
  selectRecordCount(event: any) {
    this.pageSize = event.value
    const filter = {...this.filter, ['pageSize'] : event.value}
    this.filter = filter
    this.store.dispatch(getAllInstitutionUsers({payload: {...filter, institutionId: this.institutionId}}))

  }


  enableDisableUser(event: any, userId: any) {
    // console.log(event.target.checked)
    const payload = {
      userIds: [userId],
      status: event.target.checked === true ? 1 : 2
    }
    this.userAndRolesService
      .activateOrDeactivateUsers(payload)
      .subscribe((res) => {
        if (!res.hasErrors) {
          this.notificationService.publishMessages(
            'success',
            event.target.checked === true ? 'User successfully activated' : 'User successfully deactivated'
            );
            this.store.dispatch(getAllInstitutionUsers({payload: {...this.filter, institutionId: this.institutionId}}))

        }
      });
   
  }
  


}
