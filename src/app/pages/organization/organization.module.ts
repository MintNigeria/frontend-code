import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationComponent } from './organization.component';
import { OrganizationRoutingModule } from './organization-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationEffects } from 'src/app/store/notification/effect';
import { notificationReducers } from 'src/app/store/notification/reducer';
import { InstitutionEffects } from 'src/app/store/institution/effects';



@NgModule({
  declarations: [
    OrganizationComponent
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    SharedModule,
    StoreModule.forFeature('notification', notificationReducers),
    EffectsModule.forFeature([NotificationEffects, InstitutionEffects])

  ]
})
export class OrganizationModule { }
