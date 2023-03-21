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
    ReactiveFormsModule,
  ]
})
export class UploadsModule { }
