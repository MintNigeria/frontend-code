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
      path: 'talent-search-pool',
      loadChildren: () =>
        import('../organization/talent-search-pool/talent-search-pool.module').then((m) => m.TalentSearchPoolModule),
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
