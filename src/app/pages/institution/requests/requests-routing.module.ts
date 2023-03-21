import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraduateRequestComponent } from './graduate-request/graduate-request.component';
import { ViewMoreGraduateComponent } from './graduate-request/view-more-graduate/view-more-graduate.component';
import { OrganizationRequestComponent } from './organization-request/organization-request.component';
import { ViewMoreOrganizationComponent } from './organization-request/view-more-organization/view-more-organization.component';
import { RequestsComponent } from './requests.component';

const routes: Routes = [
  {
    path: '',
    component: RequestsComponent,
    children: [
      { path: '', component: GraduateRequestComponent },
      { path: 'organization', component: OrganizationRequestComponent },
    ],
  },
  { path: 'graduate/:id', component: ViewMoreGraduateComponent },
  { path: 'organization/:id', component: ViewMoreOrganizationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }
