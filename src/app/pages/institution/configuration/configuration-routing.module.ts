import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitutionComponent } from '../institution.component';
import { ConfigurationComponent } from './configuration.component';
import { CreateDegreeTypeComponent } from './create-degree-type/create-degree-type.component';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { CreateFacultyComponent } from './create-faculty/create-faculty.component';
import { DispatchFeeComponent } from './dispatch-fee/dispatch-fee.component';
import { InstitutionSetupComponent } from './institution-setup/institution-setup.component';
import { AwaitingApprovalComponent } from './processing-fee/awaiting-approval/awaiting-approval.component';
import { ProcessingFeeComponent } from './processing-fee/processing-fee.component';
import { AwaitingApprovalFeeComponent } from './verification-fee/awaiting-approval-fee/awaiting-approval-fee.component';
import { VerificationFeeComponent } from './verification-fee/verification-fee.component';

const routes: Routes = [
  {path: '', component:ConfigurationComponent,
  children: [
    {path:'', component:ProcessingFeeComponent},
    {path:'verification-fee',component:VerificationFeeComponent},
    {path: 'dispatch-fee', component:DispatchFeeComponent},
    {path:'institution-setup',component:InstitutionSetupComponent},
    {path: 'awaiting-approval', component: AwaitingApprovalComponent},
    {path: 'awaiting-approval-fee', component: AwaitingApprovalFeeComponent},
    {path: 'institution-setup/create-degree-type', component: CreateDegreeTypeComponent},
    {path: 'create-degree-type/:id', component: CreateDegreeTypeComponent},
    {path: 'create-department', component: CreateDepartmentComponent},
    {path: 'edit-department/:id', component: CreateDepartmentComponent},
    {path: 'create-faculty', component: CreateFacultyComponent},
    {path: 'edit-faculty/:id', component: CreateFacultyComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
