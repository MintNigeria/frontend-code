import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionComponent } from './institution.component';
import { InstitutionRoutingModule } from './institution-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    InstitutionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InstitutionRoutingModule
  ]
})
export class InstitutionModule { }
