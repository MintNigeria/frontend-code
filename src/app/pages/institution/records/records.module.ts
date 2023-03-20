import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordsRoutingModule } from './records-routing.module';
import { RecordsComponent } from './records.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecordDetailsComponent } from './record-details/record-details.component';


@NgModule({
  declarations: [
    RecordsComponent,
    RecordDetailsComponent
  ],
  imports: [
    CommonModule,
    RecordsRoutingModule,
    SharedModule
  ]
})
export class RecordsModule { }
