import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificationRoutingModule } from './verification-routing.module';
import { VerificationComponent } from './verification.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StartVerificationComponent } from './start-verification/start-verification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchResultsComponent } from './start-verification/search-results/search-results.component';
import { VerifyDocumentsComponent } from './start-verification/search-results/verify-documents/verify-documents.component';
import { NewVerificationComponent } from './new-verification/new-verification.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GraduatesEffects } from 'src/app/store/graduates/effects';
import { graduatesReducer } from 'src/app/store/graduates/reducers';
import { OrganizationEffects } from 'src/app/store/organization/effects';
import { GraduateVerificationDetailsComponent } from './start-verification/graduate-verification-details/graduate-verification-details.component';
import { GraduateVerificationDetailsSearchResultComponent } from './start-verification/graduate-verification-details-search-result/graduate-verification-details-search-result.component';
import { GraduateVerificationPaymentComponent } from './start-verification/graduate-verification-payment/graduate-verification-payment.component';
import { FlutterwaveModule } from 'flutterwave-angular-v3';
import { RequestEmptyStateComponent } from "../../../shared/request-empty-state/request-empty-state.component";


@NgModule({
    declarations: [
        VerificationComponent,
        StartVerificationComponent,
        SearchResultsComponent,
        VerifyDocumentsComponent,
        NewVerificationComponent,
        GraduateVerificationDetailsComponent,
        GraduateVerificationDetailsSearchResultComponent,
        GraduateVerificationPaymentComponent
    ],
    imports: [
        CommonModule,
        VerificationRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        NgSelectModule,
        FlutterwaveModule,
        StoreModule.forFeature('graduates', graduatesReducer),
        EffectsModule.forFeature([GraduatesEffects, OrganizationEffects]),
        RequestEmptyStateComponent
    ]
})
export class VerificationModule { }
