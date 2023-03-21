import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraduateComponent } from './graduate.component';
import { GraduateRoutingModule } from './graduate-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    GraduateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GraduateRoutingModule,
  ]
})
export class GraduateModule { }
