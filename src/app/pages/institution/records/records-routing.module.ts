import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordDetailsComponent } from './record-details/record-details.component';
import { RecordsComponent } from './records.component';

const routes: Routes = [
  {path: '', component: RecordsComponent},
  {path: 'record-details/:id', component: RecordDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordsRoutingModule { }
