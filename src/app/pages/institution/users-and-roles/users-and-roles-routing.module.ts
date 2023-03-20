import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersAndRolesComponent } from './users-and-roles.component';

const routes: Routes = [
  {path: '', component: UsersAndRolesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersAndRolesRoutingModule { }
