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

  constructor(
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private router: Router,
    private actions$: Actions,

  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.institutionData = JSON.parse(data)
    this.institutionId = this.institutionData.InstitutionId
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
    this.permission$.subscribe((res: any) => {
      this.permissionList = res
      console.log(res)
    })
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
    this.store.dispatch(getAllInstitutionUsers({payload: {...filter, institutionId: this.institutionId}}))

  }


}
