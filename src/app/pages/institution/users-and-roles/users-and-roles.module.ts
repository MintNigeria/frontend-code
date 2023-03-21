import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersAndRolesRoutingModule } from './users-and-roles-routing.module';
import { UsersAndRolesComponent } from './users-and-roles.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { OtherUsersComponent } from './other-users/other-users.component';
import { MyProfileComponent } from './admin-users/my-profile/my-profile.component';
import { ChangePasswordComponent } from './admin-users/change-password/change-password.component';
import { UsersComponent } from './admin-users/users/users.component';
import { RolesAndPermissionComponent } from './admin-users/roles-and-permission/roles-and-permission.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsersAndRolesComponent,
    AdminUsersComponent,
    OtherUsersComponent,
    MyProfileComponent,
    ChangePasswordComponent,
    UsersComponent,
    RolesAndPermissionComponent
  ],
  imports: [
    CommonModule,
    UsersAndRolesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UsersAndRolesModule { }
