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
import { usersAndRolesReducer } from 'src/app/store/users-and-roles/reducer';
import { UsersAndRolesEffects } from 'src/app/store/users-and-roles/effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InstitutionEffects } from 'src/app/store/institution/effects';
import { ReportingEffects } from 'src/app/store/reporting/effects';
import { UserListComponent } from './admin-users/user-list/user-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { CreateRoleComponent } from './admin-users/create-role/create-role.component';


@NgModule({
  declarations: [
    UsersAndRolesComponent,
    AdminUsersComponent,
    OtherUsersComponent,
    MyProfileComponent,
    ChangePasswordComponent,
    UsersComponent,
    RolesAndPermissionComponent,
    UserListComponent,
    CreateRoleComponent
  ],
  imports: [
    CommonModule,
    UsersAndRolesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxPaginationModule,
    StoreModule.forFeature('usersAndRoles', usersAndRolesReducer),
    EffectsModule.forFeature([UsersAndRolesEffects, InstitutionEffects]),

  ]
})
export class UsersAndRolesModule { }
