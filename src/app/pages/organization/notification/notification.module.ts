import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationEffects } from 'src/app/store/notification/effect';
import { notificationReducers } from 'src/app/store/notification/reducer';


@NgModule({
  declarations: [
    NotificationComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    StoreModule.forFeature('notification', notificationReducers),
    EffectsModule.forFeature([NotificationEffects])

  ]
})
export class NotificationModule { }
