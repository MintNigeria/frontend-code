import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakePaymentVasComponent } from './make-payment-vas/make-payment-vas.component';
import { ValueAddedServicesComponent } from './value-added-services.component';
import { ViewReportsComponent } from './view-reports/view-reports.component';

const routes: Routes = [
  {path: '', component:ValueAddedServicesComponent},
  {path: 'make-payment/:id', component:MakePaymentVasComponent},
  {path: 'view-report/:id', component: ViewReportsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValueAddedServicesRoutingModule { }
