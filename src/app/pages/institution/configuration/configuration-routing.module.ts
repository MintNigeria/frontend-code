import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitutionComponent } from '../institution.component';
import { ConfigurationComponent } from './configuration.component';
import { CreateDegreeTypeComponent } from './create-degree-type/create-degree-type.component';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { CreateFacultyComponent } from './create-faculty/create-faculty.component';
import { DispatchFeeComponent } from './dispatch-fee/dispatch-fee.component';
import { DegreeTypeComponent } from './institution-setup/degree-type/degree-type.component';
import { DepartmentComponent } from './institution-setup/department/department.component';
import { FacultyComponent } from './institution-setup/faculty/faculty.component';
import { InstitutionIndexComponent } from './institution-setup/institution-index/institution-index.component';
import { InstitutionSetupComponent } from './institution-setup/institution-setup.component';
import { AwaitingApprovalComponent } from './processing-fee/awaiting-approval/awaiting-approval.component';
import { ProcessingFeeComponent } from './processing-fee/processing-fee.component';
import { AwaitingApprovalFeeComponent } from './verification-fee/awaiting-approval-fee/awaiting-approval-fee.component';
import { VerificationFeeComponent } from './verification-fee/verification-fee.component';
import { InstitutionGradeComponent } from './institution-setup/institution-grade/institution-grade.component';
import { CreateGradeComponent } from './create-grade/create-grade.component';

const routes: Routes = [
  {path: '', component:ConfigurationComponent,
  children: [
    {path:'', component:ProcessingFeeComponent},
    {path:'verification-fee',component:VerificationFeeComponent},
    {path: 'dispatch-fee', component:DispatchFeeComponent},
    {path:'institution-setup',component:InstitutionIndexComponent, children : [
      {path : '', component: InstitutionSetupComponent, children: [
        {path : '',  component : FacultyComponent},
      {path : 'faculty',  component : FacultyComponent},
      {path : 'department', component: DepartmentComponent},
      { path : 'degree-type', component : DegreeTypeComponent},
      { path : 'grade', component : InstitutionGradeComponent}
      ]},
      {path: 'create-faculty', component: CreateFacultyComponent},
      {path: 'create-grade', component: CreateGradeComponent},
      {path: 'edit-faculty/:id/:name', component: CreateFacultyComponent},
      {path: 'create-department', component: CreateDepartmentComponent},
      {path: 'edit-department/:id/:name/:faculty', component: CreateDepartmentComponent},
      {path: 'create-degree-type', component: CreateDegreeTypeComponent},
      {path: 'edit-degree-type/:id/:name', component: CreateDegreeTypeComponent},

    ]},
    {path: 'awaiting-approval', component: AwaitingApprovalComponent},
    {path: 'awaiting-approval-fee', component: AwaitingApprovalFeeComponent},
    {path: 'institution-setup/create-degree-type', component: CreateDegreeTypeComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
