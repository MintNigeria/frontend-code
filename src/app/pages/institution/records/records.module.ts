import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordsRoutingModule } from './records-routing.module';
import { RecordsComponent } from './records.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecordDetailsComponent } from './record-details/record-details.component';
import { GraduatesEffects } from 'src/app/store/graduates/effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InstitutionEffects } from 'src/app/store/institution/effects';
import { reportingReducer } from 'src/app/store/reporting/reducers';


@NgModule({
  declarations: [
    RecordsComponent,
    RecordDetailsComponent
  ],
  imports: [
    CommonModule,
    RecordsRoutingModule,
    SharedModule,
    StoreModule.forFeature('reporting', reportingReducer),
    EffectsModule.forFeature([GraduatesEffects, InstitutionEffects]),

  ]
})
export class RecordsModule { }
