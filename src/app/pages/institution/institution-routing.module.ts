import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitutionComponent } from './institution.component';

const routes: Routes = [
  {path: '', component: InstitutionComponent, children: [
    {
      path: 'institution',
      loadChildren: () =>
        import('../institution/institution.module').then((m) => m.InstitutionModule),
    },
    {
      path: 'graduate',
      loadChildren: () =>
        import('../graduate/graduate.module').then((m) => m.GraduateModule),
    },
    {
      path: 'organization',
      loadChildren: () =>
        import('../organization/organization.module').then((m) => m.OrganizationModule),
    },
    {
      path: 'dashboard',
      loadChildren: () =>
        import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    },
    {
      path: 'requests',
      loadChildren: () =>
        import('./requests/requests.module').then((m) => m.RequestsModule),
    },
    {
      path: 'records',
      loadChildren: () =>
        import('./records/records.module').then((m) => m.RecordsModule),
    },
    {
      path: 'uploads',
      loadChildren: () =>
        import('./uploads/uploads.module').then((m) => m.UploadsModule),
    },
    {
      path: 'reports',
      loadChildren: () =>
        import('./reports/reports.module').then((m) => m.ReportsModule),
    },
    {
      path: 'transactions',
      loadChildren: () =>
        import('./transactions/transactions.module').then((m) => m.TransactionsModule),
    },
    {
      path: 'configuration',
      loadChildren: () =>
        import('./configuration/configuration.module').then((m) => m.ConfigurationModule),
    },
    {
      path: 'users-and-roles',
      loadChildren: () =>
        import('./users-and-roles/users-and-roles.module').then((m) => m.UsersAndRolesModule),
    },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitutionRoutingModule { }
