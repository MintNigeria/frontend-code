import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './applications.component';
import { ViewApplicationComponent } from './view-application/view-application.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewApplicationComponent } from './new-application/new-application.component';
import { AcademicDetailsComponent } from './new-application/academic-details/academic-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GraduatesEffects } from 'src/app/store/graduates/effects';
import { graduatesReducer } from 'src/app/store/graduates/reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ApplicationsComponent,
    ViewApplicationComponent,
    NewApplicationComponent,
    AcademicDetailsComponent
  ],
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    StoreModule.forFeature('graduates', graduatesReducer),
    EffectsModule.forFeature([GraduatesEffects]),

  ]
})
export class ApplicationsModule { }
