import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsComponent } from './requests.component';
import { GraduateRequestComponent } from './graduate-request/graduate-request.component';
import { OrganizationRequestComponent } from './organization-request/organization-request.component';
import { ViewMoreGraduateComponent } from './graduate-request/view-more-graduate/view-more-graduate.component';
import { ViewMoreOrganizationComponent } from './organization-request/view-more-organization/view-more-organization.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RequestsComponent,
    GraduateRequestComponent,
    OrganizationRequestComponent,
    ViewMoreGraduateComponent,
    ViewMoreOrganizationComponent
  ],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    SharedModule,
  ]
})
export class RequestsModule { }
