import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersAndRolesRoutingModule } from './users-and-roles-routing.module';
import { UsersAndRolesComponent } from './users-and-roles.component';


@NgModule({
  declarations: [
    UsersAndRolesComponent
  ],
  imports: [
    CommonModule,
    UsersAndRolesRoutingModule
  ]
})
export class UsersAndRolesModule { }
