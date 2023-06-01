import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './applications.component';
import { ViewApplicationComponent } from './view-application/view-application.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewApplicationComponent } from './new-application/new-application.component';
import { AcademicDetailsComponent } from './new-application/academic-details/academic-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GraduatesEffects } from 'src/app/store/graduates/effects';
import { graduatesReducer } from 'src/app/store/graduates/reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { SearchListComponent } from './new-application/search-list/search-list.component';
import { AcademicSearchDetailsComponent } from './new-application/search-list/academic-search-details/academic-search-details.component';
import { ApplicationDetailsComponent } from './new-application/application-details/application-details.component';
import { ReviewOrderComponent } from './new-application/review-order/review-order.component';
import { MakePaymentComponent } from './new-application/make-payment/make-payment.component';
import { organizationReducer } from 'src/app/store/organization/reducers';
import { OrganizationEffects } from 'src/app/store/organization/effects';
import { RequestEmptyStateComponent } from 'src/app/shared/request-empty-state/request-empty-state.component';
import { InstitutionEffects } from 'src/app/store/institution/effects';
import { ConfigurationEffects } from 'src/app/store/configuration/effects';

import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

@NgModule({
  declarations: [
    ApplicationsComponent,
    ViewApplicationComponent,
    NewApplicationComponent,
    AcademicDetailsComponent,
    SearchListComponent,
    AcademicSearchDetailsComponent,
    ApplicationDetailsComponent,
    ReviewOrderComponent,
    MakePaymentComponent
  ],
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    RequestEmptyStateComponent,
    NgSelectModule,
    NgxPaginationModule,
    NgxIntlTelInputModule,
    StoreModule.forFeature('graduates', graduatesReducer),
    StoreModule.forFeature('organization', organizationReducer),
    EffectsModule.forFeature([GraduatesEffects, OrganizationEffects, InstitutionEffects, ConfigurationEffects]),
  ]
})
export class ApplicationsModule { }
