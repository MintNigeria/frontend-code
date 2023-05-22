import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraduateComponent } from './graduate.component';

const routes: Routes = [
  {
    path: '',
    component: GraduateComponent,
    children: [
      // { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'my-applications',
        loadChildren: () =>
          import('./applications/applications.module').then(
            (m) => m.ApplicationsModule
          ),
      },
      {
        path: 'my-verifications',
        loadChildren: () =>
          import('./verifications/verifications.module').then(
            (m) => m.VerificationsModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import('./transactions/transactions.module').then(
            (m) => m.TransactionsModule
          ),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./notification/notification.module').then((m) => m.NotificationModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraduateRoutingModule {}
