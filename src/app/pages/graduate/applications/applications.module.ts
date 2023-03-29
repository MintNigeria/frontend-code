import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './applications.component';
import { ViewApplicationComponent } from './view-application/view-application.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewApplicationComponent } from './new-application/new-application.component';
import { AcademicDetailsComponent } from './new-application/academic-details/academic-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SearchListComponent } from './new-application/search-list/search-list.component';


@NgModule({
  declarations: [
    ApplicationsComponent,
    ViewApplicationComponent,
    NewApplicationComponent,
    AcademicDetailsComponent,
    SearchListComponent
  ],
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgSelectModule,
  ]
})
export class ApplicationsModule { }
