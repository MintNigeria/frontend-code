import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationsComponent } from './applications.component';
import { AcademicDetailsComponent } from './new-application/academic-details/academic-details.component';
import { ApplicationDetailsComponent } from './new-application/application-details/application-details.component';
import { NewApplicationComponent } from './new-application/new-application.component';
import { ReviewOrderComponent } from './new-application/review-order/review-order.component';
import { AcademicSearchDetailsComponent } from './new-application/search-list/academic-search-details/academic-search-details.component';
import { SearchListComponent } from './new-application/search-list/search-list.component';
import { ViewApplicationComponent } from './view-application/view-application.component';

const routes: Routes = [
  { path: '', component: ApplicationsComponent },
  {
    path: 'new',
    component: NewApplicationComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'academic-details' },
      { path: 'academic-details', component: AcademicDetailsComponent },
      { path: 'search-table', component: SearchListComponent },
    
      {
        path: 'app-details',
        component: ApplicationDetailsComponent,
        children: [
          
        ]
      },
      {
        path: 'review-order',
        component: ReviewOrderComponent
      }
    ],
  },
  { path: ':id', component: ViewApplicationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationsRoutingModule {}
