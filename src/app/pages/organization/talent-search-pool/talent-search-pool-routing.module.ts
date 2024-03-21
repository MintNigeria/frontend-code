import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakePaymentComponent } from './new-search-talent/make-payment/make-payment.component';
import { ViewReportComponent } from './new-search-talent/make-payment/view-report/view-report.component';
import { NewSearchTalentComponent } from './new-search-talent/new-search-talent.component';
import { TalentSearchPoolComponent } from './talent-search-pool.component';
import { ViewGraduateTalentSearchProfileComponent } from './view-graduate-talent-search-profile/view-graduate-talent-search-profile.component';

const routes: Routes = [
  {path: '', component:TalentSearchPoolComponent},
  {path: 'search-talent', component:NewSearchTalentComponent},
  {path: 'make-payment/:id',component:MakePaymentComponent},
  {path: 'view-report/:id',component:ViewReportComponent},
  {path: 'view-graduate-record/:id',component:ViewGraduateTalentSearchProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TalentSearchPoolRoutingModule { }
