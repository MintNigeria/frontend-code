import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { ProcessingFeeComponent } from './processing-fee/processing-fee.component';
import { VerificationFeeComponent } from './verification-fee/verification-fee.component';
import { DispatchFeeComponent } from './dispatch-fee/dispatch-fee.component';
import { InstitutionSetupComponent } from './institution-setup/institution-setup.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AwaitingApprovalComponent } from './processing-fee/awaiting-approval/awaiting-approval.component';
import { AwaitingApprovalFeeComponent } from './verification-fee/awaiting-approval-fee/awaiting-approval-fee.component';
import { FacultyComponent } from './institution-setup/faculty/faculty.component';
import { DepartmentComponent } from './institution-setup/department/department.component';
import { DegreeTypeComponent } from './institution-setup/degree-type/degree-type.component';
import { ConfigurationEffects } from 'src/app/store/configuration/effects';
import { configurationReducer } from 'src/app/store/configuration/reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InstitutionEffects } from 'src/app/store/institution/effects';
import { NgSelectModule } from '@ng-select/ng-select';
import { CreateDegreeTypeComponent } from './create-degree-type/create-degree-type.component';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { CreateFacultyComponent } from './create-faculty/create-faculty.component';
import { InstitutionIndexComponent } from './institution-setup/institution-index/institution-index.component';
import { InstitutionGradeComponent } from './institution-setup/institution-grade/institution-grade.component';
import { CreateGradeComponent } from './create-grade/create-grade.component';


@NgModule({
  declarations: [
    ConfigurationComponent,
    ProcessingFeeComponent,
    VerificationFeeComponent,
    DispatchFeeComponent,
    InstitutionSetupComponent,
    AwaitingApprovalComponent,
    AwaitingApprovalFeeComponent,
    FacultyComponent,
    DepartmentComponent,
    DegreeTypeComponent,
    CreateDegreeTypeComponent,
    CreateDepartmentComponent,
    CreateFacultyComponent,
    InstitutionIndexComponent,
    InstitutionGradeComponent,
    CreateGradeComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    StoreModule.forFeature('configuration', configurationReducer),
    EffectsModule.forFeature([ConfigurationEffects, InstitutionEffects]),


  ]
})
export class ConfigurationModule { }
