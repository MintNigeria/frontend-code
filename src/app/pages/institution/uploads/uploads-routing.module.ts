import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmUploadsComponent } from './confirm-uploads/confirm-uploads.component';
import { FailedUploadsComponent } from './failed-uploads/failed-uploads.component';
import { SuccessUploadsComponent } from './success-uploads/success-uploads.component';
import { UploadRecordsComponent } from './upload-records/upload-records.component';
import { UploadsComponent } from './uploads.component';
import { BatchDetailsComponent } from './batch-details/batch-details.component';
import { ViewFailedDataComponent } from './view-failed-data/view-failed-data.component';

const routes: Routes = [
  {path: '', component: UploadsComponent,
children:[
  {path: '', component: SuccessUploadsComponent},
  {path: 'failed', component: FailedUploadsComponent},
]},
{path: 'upload-records', component: UploadRecordsComponent},
{path: 'confirm-uploads', component: ConfirmUploadsComponent},
{path: 'batch-details/:id', component: BatchDetailsComponent},
{path: 'failed-record/:id', component: ViewFailedDataComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadsRoutingModule { }
