import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { ChangePasswordComponent } from './admin-users/change-password/change-password.component';
import { CreateRoleComponent } from './admin-users/create-role/create-role.component';
import { MyProfileComponent } from './admin-users/my-profile/my-profile.component';
import { RolesAndPermissionComponent } from './admin-users/roles-and-permission/roles-and-permission.component';
import { UserListComponent } from './admin-users/user-list/user-list.component';
import { UsersComponent } from './admin-users/users/users.component';
import { OtherUsersComponent } from './other-users/other-users.component';
import { UsersAndRolesComponent } from './users-and-roles.component';
import { TwoFactorAuthenticationComponent } from './admin-users/two-factor-authentication/two-factor-authentication.component';

const routes: Routes = [
  {
    path: '', component: UsersAndRolesComponent,
    children: [
      {
        path: '', component: AdminUsersComponent,
        children: [
          { path: '', component: MyProfileComponent },
          { path: 'change-password', component: ChangePasswordComponent },
          { path: 'users', component: UserListComponent },
          { path: 'users/create-new-user', component: UsersComponent },
          { path: 'users/:id', component: UsersComponent },
          { path: 'roles-and-permission', component: RolesAndPermissionComponent },
          {path: 'roles-and-permission/create-new-role', component: CreateRoleComponent},
          {path: 'roles-and-permission/edit-permission/:id', component: CreateRoleComponent},
          // {path: '2fa', component: TwoFactorAuthenticationComponent},

        ]
      },
      { path: 'other-users', component: OtherUsersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersAndRolesRoutingModule { }
