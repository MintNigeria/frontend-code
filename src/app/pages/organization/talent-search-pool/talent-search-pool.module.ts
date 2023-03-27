import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TalentSearchPoolRoutingModule } from './talent-search-pool-routing.module';
import { TalentSearchPoolComponent } from './talent-search-pool.component';


@NgModule({
  declarations: [
    TalentSearchPoolComponent
  ],
  imports: [
    CommonModule,
    TalentSearchPoolRoutingModule
  ]
})
export class TalentSearchPoolModule { }
