import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraduateComponent } from './graduate.component';
import { GraduateRoutingModule } from './graduate-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationEffects } from 'src/app/store/notification/effect';
import { notificationReducers } from 'src/app/store/notification/reducer';



@NgModule({
  declarations: [
    GraduateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GraduateRoutingModule,
    StoreModule.forFeature('notification', notificationReducers),
    EffectsModule.forFeature([NotificationEffects])

  ]
})
export class GraduateModule { }
