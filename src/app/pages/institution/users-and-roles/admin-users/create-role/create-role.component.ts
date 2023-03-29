import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UsersAndRolesService } from 'src/app/core/services/users-and-roles/users-and-roles.service';
import { selectAppAPIResponse } from 'src/app/store/shared/app.selector';
import { invokeGlobalAdminRole, invokePermissionAndRoles, invokePermissionAndRoleSuccess, invokeRolePermission } from 'src/app/store/users-and-roles/actions';
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
 
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private notification: NotificationsService,
    private userAndRolesService: UsersAndRolesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.institutionData = JSON.parse(data)

    this.institutionId = this.institutionData.InstitutionId

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
      permissions: ['', Validators.required],
    })
  }

  createRole(){
    const {name, permissions} = this.roleForm.value
    const payload = {
      institutionId: Number(this.institutionId),
      name,
      permissions
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

  
}
