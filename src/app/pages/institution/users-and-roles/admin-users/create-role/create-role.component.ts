import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UsersAndRolesService } from 'src/app/core/services/users-and-roles/users-and-roles.service';
import { selectAppAPIResponse } from 'src/app/store/shared/app.selector';
import { invokeGlobalAdminRole, invokePermissionAndRoles, invokePermissionAndRoleSuccess, invokeRolePermission, invokeRolePermissionSuccess, updatePermissionsInRole, updatePermissionsInRoleSuccess } from 'src/app/store/users-and-roles/actions';
import { createAdminRoleSelector, getRolePermissionSelector, getRolesAndPermissionsSelector, messageNotification } from 'src/app/store/users-and-roles/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { Status } from 'src/app/types/shared.types';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {
  roleForm!: FormGroup
  status: Status = Status.NORMAL;
  getRolePermission$ = this.appStore.pipe(select(getRolesAndPermissionsSelector))
  institutionData: any;
  institutionId: any;
  roleId: any;
 
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private notification: NotificationsService,
    private userAndRolesService: UsersAndRolesService,
    private router: Router,
    private route: ActivatedRoute,
    private actions$: Actions
  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.institutionData = JSON.parse(data)

    this.institutionId = this.institutionData.InstitutionId
    this.roleId = this.route.snapshot.params['id']
    if(this.roleId !== undefined) {
      this.store.dispatch(invokeRolePermission({roleId: this.roleId }))
      this.actions$.pipe(ofType(invokeRolePermissionSuccess)).subscribe((res: any) => {
        this.populatePermissions(res.payload)
      })
      console.log('Na me den dey call ooooo')
    } else {

    }
    this.initRoleForm()
    this.store.dispatch(invokePermissionAndRoles())
    //console.log(this.getRolePermission$)
  }

  onSelectOption(event: any){
    this.roleForm.patchValue({level : event})
    //console.log(event)
  }

  initRoleForm() {
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
      permissionIds: ['', Validators.required],
    })
  }
  populatePermissions(data: any) {
    const perms = data.permissions.map((x: any) => x.id)
    this.roleForm.patchValue({
      name: data.roleName,
      permissionIds: perms,
    })
  }

  createRole(){
    const {name, permissionIds} = this.roleForm.value
    const payload = {
      institutionId: Number(this.institutionId),
      name,
      permissionIds
    }
    this.userAndRolesService.createAdminRole(payload).subscribe((res) => {
      if (!res.hasErrors){
        this.router.navigateByUrl('/institution/users-and-roles/roles-and-permission')
      }
      this.notification.publishMessages(
        'success',
        'New Role has been Created'
      )
    })
     
  }
  updateRole(){
    const {permissionIds} = this.roleForm.value
    const payload = {
      roleId: Number(this.roleId),
      permissionIds
    }
    this.store.dispatch(updatePermissionsInRole({payload}))
    this.actions$.pipe(ofType(updatePermissionsInRoleSuccess)).subscribe((res: any) => {
        if (res.payload.hasErrors === false){
          this.notification.publishMessages(
            'success',
            res.payload.description
          )
          this.router.navigateByUrl('/institution/users-and-roles/roles-and-permission')
        }
    })
    // this.userAndRolesService.createAdminRole(payload).subscribe((res) => {
    // })
     
  }


  cancel() {
    window.history.back()
  }

  
}
