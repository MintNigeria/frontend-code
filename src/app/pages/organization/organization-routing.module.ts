import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationComponent } from './organization.component';


const routes: Routes = [
  {path: '', component: OrganizationComponent,children: [
    {
      path: 'dashboard',
      loadChildren: () =>
        import('../organization/dashboard/dashboard.module').then((m) => m.DashboardModule),
    },
    {
      path: 'verifications',
      loadChildren: () =>
        import('../organization/verification/verification.module').then((m) => m.VerificationModule),
    },
    {
      path: 'transactions',
      loadChildren: () =>
        import('../organization/transactions/transactions.module').then((m) => m.TransactionsModule),
    },
    {
      path: 'value-added-services',
      loadChildren: () =>
        import('../organization/value-added-services/value-added-services.module').then((m) => m.ValueAddedServicesModule),
    },
    {
      path: 'settings',
      loadChildren: () =>
        import('../organization/settings/settings.module').then((m) => m.SettingsModule),
    },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
