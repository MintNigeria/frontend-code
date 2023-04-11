import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs';
import { UsersAndRolesService } from 'src/app/core/services/users-and-roles/users-and-roles.service';
import { messageNotification, permissionsSelector } from 'src/app/store/auth/selector';
import { invokeGetStateAndLGA } from 'src/app/store/institution copy/action';
import { stateLgaSelector } from 'src/app/store/institution copy/selector';
import { getALlFacultiesInInstitution, getALlFacultiesInInstitutionSuccess, getInstitutionUserInfo, getInstitutionUserInfoSuccess } from 'src/app/store/institution/action';
import { selectAppAPIResponse } from 'src/app/store/shared/app.selector';
import { createInstitutionUserWithRole, createInstitutionUserWithRoleSuccess, getInstitutionRoles, getInstitutionRolesSuccess, updateGlobalAdminUser, updateInstitutionUserWithRole, updateInstitutionUserWithRoleSuccess } from 'src/app/store/users-and-roles/actions';
import { getLGASelector } from 'src/app/store/users-and-roles/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { Status } from 'src/app/types/shared.types';
import { NotificationsService } from 'src/app/core/services/notifications.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  permission$ = this.appStore.pipe(select(permissionsSelector));

  permissionList: any;

  stateLGA$ = this.appStore.pipe(select(stateLgaSelector));
  buttonText: string = 'Create User';
  enableToggleButton: string = 'Enable User';

  changesConfirmed = "changesConfirmed";
  userForm!: FormGroup;
  userId: any;
  editUser: boolean = false;
  lga: any;
  facultyList: any;
  departmentList: any;
  institutionData: any;
  institutionId: any;
  roles!: any[];
  userData: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private actions$: Actions,

    private activatedRoute: ActivatedRoute,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private notification: NotificationsService,
    ) {
  }


  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.institutionData = JSON.parse(data)
    this.institutionId = this.institutionData.InstitutionId
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.store.dispatch(getALlFacultiesInInstitution({id: this.institutionId}))
    this.actions$.pipe(ofType(getALlFacultiesInInstitutionSuccess)).subscribe((res: any) => {
      this.facultyList = res.payload;
    })
    this.store.dispatch(getInstitutionRoles({id: this.institutionId}))
    this.actions$.pipe(ofType(getInstitutionRolesSuccess)).subscribe((res: any) => {
      this.roles = [...res.payload.defaultRoles, ...res.payload.customRoles]
    })
    this.store.dispatch(
      invokeGetStateAndLGA()
      );
      this.initUserForm()
    this.store.dispatch(getInstitutionUserInfo({id: this.userId}))
    if (this.userId !== undefined) {
      this.editUser = true
      this.actions$.pipe(ofType(getInstitutionUserInfoSuccess)).subscribe((res: any) => {
        this.userData = res.payload;
        this.userForm.patchValue({
          // firstName: res?.payload?.firstName,
          title: res?.payload?.title,
          fullName: res?.payload?.fullName,
          emailAddress: res?.payload?.emailAddress,
          phoneNumber: res?.payload?.phoneNumber,
          faculty: res?.payload?.faculty,
          department: res?.payload?.department,
          stateOfResidence: res?.payload?.state,
          localGovernment: res?.payload?.localGovernment,
          address: res?.payload?.address,
          roleId: res?.payload?.roleId,
          staffIdNumber: res?.payload?.staffId,
          isEnabled: res?.payload?.isEnabled,
        });
      })
    }

    this.permissions()

   
  }

  permissions() {
    this.permission$.subscribe((res: any) => {
      this.permissionList = res

    })
  }
  initUserForm() {
    this.userForm = this.fb.group({
      title: ['', Validators.required],
      fullName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      faculty: ['', Validators.required],
      department: ['', Validators.required],
      stateOfResidence: [null, Validators.required],
      localGovernment: [null, Validators.required],
      address: ['', Validators.required],
      roleId: [null, Validators.required],
      staffIdNumber: ['', Validators.required],
      isEnabled: [false, Validators.required],
    });
  }


  openChangesConfirmed(){
  document.getElementById('changesConfirmed')?.click();
}

changeFaculty(event: any) {
  const data = this.facultyList.find((value: any) => value.id == Number(event));
  this.userForm.controls['faculty'].setValue(data.name)
  this.departmentList = data.departmentVMs;
}

enableDisableUser(event: any) {
  if (event.checked === true) {
    this.enableToggleButton = 'Enabled';
  } else {
    this.enableToggleButton = 'Disabled';
  }
  // this.userAndRolesService
  //   .activateOrDeactivateUsers(this.enableToggleButton)
  //   .subscribe((res) => {
  //     if (!res.hasErrors) {
  //       this.notification.publishMessages(
  //         'success',
  //         'Institution key deactivated successfully'
  //       );
  //     }
  //   });
}



selectLocalGovt(stateId: any) {
  this.stateLGA$.subscribe((x) => {
    const data = x.find((value: any) => value.id == Number(stateId));
    this.userForm.controls['stateOfResidence'].setValue(data.name)


    this.lga = data.lgaVMs;
  });
}

createNewUser() {
  const {title, fullName, phoneNumber, emailAddress, faculty, department, stateOfResidence, localGovernment, address, roleId, staffIdNumber} = this.userForm.value
  const payload = {
    title,
    fullName,
    emailAddress,
    phoneNumber,
    faculty,
    department,
    stateOfResidence,
    localGovernment,
    address,
    roleId: String(roleId),
    staffIdNumber,
    institutionId: Number(this.institutionId)
  }
  this.store.dispatch(createInstitutionUserWithRole({payload}))
  this.actions$.pipe(ofType(createInstitutionUserWithRoleSuccess)).subscribe((res: any) => {
    if (res.payload.hasErrors === false) {
      this.notification.publishMessages('success', res.payload.payload);
      this.router.navigateByUrl('/institution/users-and-roles/users')
    }
  })
}

updateUserData() {
  const {title, fullName, phoneNumber, emailAddress, faculty, department, stateOfResidence, localGovernment, address, roleId, staffIdNumber, isEnabled} = this.userForm.value
  const payload = {
    title,
    fullName,
    emailAddress,
    phoneNumber,
    faculty,
    department,
    stateOfResidence,
    localGovernment,
    address,
    staffIdNumber,
    oldRoleId: this.userData.roleId,
    newRoleId: roleId,
    userId: this.userData.userId,
    institutionId: Number(this.institutionId),
    isEnabled
  }
  this.store.dispatch(updateInstitutionUserWithRole({payload}))
  this.actions$.pipe(ofType(updateInstitutionUserWithRoleSuccess)).subscribe((res: any) => {
    if (res.payload.hasErrors === false) {
      this.notification.publishMessages('success', res.payload.payload);

      this.router.navigateByUrl('/institution/users-and-roles/users')
    }
  })
}
}
