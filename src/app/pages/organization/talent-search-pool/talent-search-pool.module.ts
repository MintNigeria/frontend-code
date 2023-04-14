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
import { institutionReducers } from 'src/app/store/institution/reducers';
import { InstitutionEffects } from 'src/app/store/institution/effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { OrganizationEffects } from 'src/app/store/organization/effects';
import { organizationReducer } from 'src/app/store/organization/reducers';


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
    StoreModule.forFeature('institution', institutionReducers),
    EffectsModule.forFeature([InstitutionEffects]),
    StoreModule.forFeature('organization', organizationReducer),
    EffectsModule.forFeature([OrganizationEffects]),


  ]
})
export class TalentSearchPoolModule { }
