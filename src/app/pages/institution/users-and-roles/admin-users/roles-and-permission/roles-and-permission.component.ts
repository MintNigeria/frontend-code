import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { getInstitutionRoles, getInstitutionRolesSuccess, invokeAdminUsersInRole, invokeAdminUsersInRoleSuccess, invokeRolePermission } from 'src/app/store/users-and-roles/actions';
import { usersAndRolesSelector, adminUserInRoleSelector, getRolePermissionSelector } from 'src/app/store/users-and-roles/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';


@Component({
  selector: 'app-roles-and-permission',
  templateUrl: './roles-and-permission.component.html',
  styleUrls: ['./roles-and-permission.component.scss']
})
export class RolesAndPermissionComponent implements OnInit {
  userRolesAndPermission$ = this.appStore.pipe(select(usersAndRolesSelector))
  adminInRole$ = this.appStore.pipe(select(adminUserInRoleSelector))
  getRolePermission$ = this.appStore.pipe(select(getRolePermissionSelector))

  changesConfirmed = "changesConfirmed";

  selectedOption: string = "All";
  selectedInstitution : string = "All";
  gradYear : string = "All";
  superAdminFilter: string = "All";
  status: string = "All";

  filterStatus = { status: 'All'};
  filterOption = {selectedOption : 'All'};
  filterSector = { gradYear: 'All'};
  filterInstituition = {selectedInstituition: 'All'};
  filterDocument = {facultyFilter: 'All'};


  editForm: FormGroup;

  superAdmin: boolean = true ;
  records: boolean = false;
  functionalAdmin: boolean = false;
  audit: boolean = false;
  management: boolean = false;
  newAdmin: boolean = false;
  

  superAdminEdit: boolean = false;
  setupToggle:boolean = true;
  editToggle:boolean = false;
  editToggleType:boolean = false;
  editToggleName: boolean = false;
  editToggleSector: boolean = false;
  
adminRoleList: any
customeRoleList: any
  institutionData: any;
  institutionId: any;
  superAdminList: any;
  filter: string = '';
  keyword: string = '';
  pageIndex: number = 1;
  pageSize: number = 10;
  totalCount: any = 0;
  roleTitle: any;
  currentUser: any;
  selectedRoleList: any;
  constructor(
    private readonly formBuilder: FormBuilder,
    private actions$: Actions,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private notification: NotificationsService,
    ) {
    this.editForm = this.formBuilder.group({
      superAdminName: ['', Validators.required],
      departmentName: [''],
      email: [false],
      fileUpload: [false],
      hardCopy: [false]
    });
  }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.institutionData = JSON.parse(data)
    this.institutionId = this.institutionData.InstitutionId

    this.store.dispatch(getInstitutionRoles({id: this.institutionId}))
    this.actions$.pipe(ofType(getInstitutionRolesSuccess)).subscribe((res: any) => {
      this.adminRoleList = res.payload.defaultRoles
      this.customeRoleList = res.payload.customRoles
    })
  }

  changeRole(role: any) {
    this.store.dispatch(invokeAdminUsersInRole({
      roleId: role.id,
      institutionId: this.institutionId,
      keyword: this.keyword,
      filter: '',
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
    }))
    this.actions$.pipe(ofType(invokeAdminUsersInRoleSuccess)).subscribe((res: any) => {
      this.selectedRoleList = res.payload.data
    }) 
    this.store.dispatch(invokeRolePermission({roleId: role.id }))
    this.roleTitle = role.name
    this.currentUser = role
  }

  seeDetails(id: string){
    this.router.navigateByUrl(`/institution/users-and-roles/users/${id}`);
  }


  goBack() {
  window.history.back();
}

  addFilter() {
    if (this.status !== 'All') {
      this.filterStatus['status'] = this.status;
    }
    if (this.selectedOption !== 'All Time') {
      this.filterOption['selectedOption'] = this.selectedOption;
    }
    if (this.gradYear !== 'All') {
      this.filterSector['gradYear'] = this.gradYear;
    }
    if (this.selectedInstitution !== 'All') {
      this.filterInstituition['selectedInstituition'] = this.selectedInstitution;
    }
    if (this.superAdminFilter !== 'All') {
      this.filterDocument['facultyFilter'] = this.superAdminFilter;
    }
    
    ////console.log(this.filterStatus,this.filterOption,this.filterSector,this.filterInstituition,this.filterDocument);
  }

  openChangesConfirmed(){
  document.getElementById('changesConfirmed')?.click();
}

  removeUser(user: any) {
  const index = this.superAdminList.indexOf(user);
  if (index !== -1) {
    this.superAdminList.splice(index, 1);
  }
}

}
