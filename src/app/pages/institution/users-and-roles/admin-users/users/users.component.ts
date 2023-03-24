import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UsersAndRolesService } from 'src/app/core/services/users-and-roles/users-and-roles.service';
import { messageNotification } from 'src/app/store/auth/selector';
import { invokeGetStateAndLGA } from 'src/app/store/institution copy/action';
import { stateLgaSelector } from 'src/app/store/institution copy/selector';
import { getALlFacultiesInInstitution, getALlFacultiesInInstitutionSuccess, getInstitutionUserInfo, getInstitutionUserInfoSuccess } from 'src/app/store/institution/action';
import { selectAppAPIResponse } from 'src/app/store/shared/app.selector';
import { createInstitutionUserWithRole, createInstitutionUserWithRoleSuccess, getInstitutionRoles, getInstitutionRolesSuccess, updateGlobalAdminUser } from 'src/app/store/users-and-roles/actions';
import { getLGASelector } from 'src/app/store/users-and-roles/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { Status } from 'src/app/types/shared.types';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
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
      console.log(res)
      this.roles = [...res.payload.defaultRoles, ...res.payload.defaultRoles]
    })
    this.store.dispatch(
      invokeGetStateAndLGA()
      );
      this.initUserForm()
    this.store.dispatch(getInstitutionUserInfo({id: this.userId}))
    if (this.userId !== undefined) {
      this.editUser = true
      this.actions$.pipe(ofType(getInstitutionUserInfoSuccess)).subscribe((res: any) => {
        console.log(res)
        this.userForm.patchValue({
          // firstName: res?.payload?.firstName,
          title: res?.payload?.title,
          fullName: res?.payload?.fullName,
          emailAddress: res?.payload?.emailAddress,
          phoneNumber: res?.payload?.phoneNumber,
          faculty: res?.payload?.department,
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
  console.log(data)
  this.userForm.controls['faculty'].setValue(data.name)
  this.departmentList = data.departmentVMs;
}

enableDisableUser(event: any) {
  console.log(event.checked);
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

saveUser() {
  if (this.buttonText === 'Create User') {
    // this.userAndRolesService
    //   .addGlobalAdminUser(this.userForm.value)
    //   .subscribe((res) => {
    //     if (!res.hasErrors) {
    //       this.notification.publishMessages('success', 'New User Created');
    //     }
    //   });
  } else {
    // write logic to update user here
  //   this.store.dispatch(
  //     updateGlobalAdminUser({ payload: this.userForm.value })
  //   );
  //   let userAdmin$ = this.appStore.pipe(select(selectAppAPIResponse));
  //   let message$ = this.appStore.pipe(select(messageNotification), take(2));
  //   userAdmin$.subscribe((x) => {
  //     if (x.isApiSuccessful) {
  //       this.status = Status.SUCCESS;
  //     }
  //   });
  //   message$.subscribe((res) => {
  //     if (res) this.notification.publishMessages('success', res);
  //   });
  }
}

selectLocalGovt(stateId: any) {
  this.stateLGA$.subscribe((x) => {
    const data = x.find((value: any) => value.id == Number(stateId));
   

    this.lga = data.lgaVMs;
  });
}

createNewUser() {
  console.log('er', this.userForm.value) 
  const payload = {
    
  }
  this.store.dispatch(createInstitutionUserWithRole({payload: this.userForm.value}))
  this.actions$.pipe(ofType(createInstitutionUserWithRoleSuccess)).subscribe((res: any) => {
    console.log(res)
  })
}
}
