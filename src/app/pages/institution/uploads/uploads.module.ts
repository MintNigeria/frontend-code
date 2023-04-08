import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadsRoutingModule } from './uploads-routing.module';
import { UploadsComponent } from './uploads.component';
import { SuccessUploadsComponent } from './success-uploads/success-uploads.component';
import { FailedUploadsComponent } from './failed-uploads/failed-uploads.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UploadRecordsComponent } from './upload-records/upload-records.component';
import { ConfirmUploadsComponent } from './confirm-uploads/confirm-uploads.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { graduatesReducer } from 'src/app/store/graduates/reducers';
import { GraduatesEffects } from 'src/app/store/graduates/effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    UploadsComponent,
    SuccessUploadsComponent,
    FailedUploadsComponent,
    UploadRecordsComponent,
    ConfirmUploadsComponent
  ],
  imports: [
    CommonModule,
    UploadsRoutingModule,
    SharedModule,
    FormsModule,
    NgxPaginationModule,
    NgSelectModule,
    ReactiveFormsModule,
    StoreModule.forFeature('graduates', graduatesReducer),
    EffectsModule.forFeature([GraduatesEffects]),

  ]
})
export class UploadsModule { }
