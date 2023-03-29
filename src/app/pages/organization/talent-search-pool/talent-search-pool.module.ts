import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TalentSearchPoolRoutingModule } from './talent-search-pool-routing.module';
import { TalentSearchPoolComponent } from './talent-search-pool.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewSearchTalentComponent } from './new-search-talent/new-search-talent.component';
import { MakePaymentComponent } from './new-search-talent/make-payment/make-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ViewReportComponent } from './new-search-talent/make-payment/view-report/view-report.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    TalentSearchPoolComponent,
    NewSearchTalentComponent,
    MakePaymentComponent,
    ViewReportComponent
  ],
  imports: [
    CommonModule,
    TalentSearchPoolRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxPaginationModule,
  ]
})
export class TalentSearchPoolModule { }
