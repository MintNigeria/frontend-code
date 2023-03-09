import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraduateComponent } from './graduate.component';
import { GraduateRoutingModule } from './graduate-routing.module';



@NgModule({
  declarations: [
    GraduateComponent
  ],
  imports: [
    CommonModule,
    GraduateRoutingModule
  ]
})
export class GraduateModule { }
