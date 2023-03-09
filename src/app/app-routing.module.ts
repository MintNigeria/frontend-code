import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'institution',
    loadChildren: () =>
      import('./pages/institution/institution.module').then((m) => m.InstitutionModule),
  },
  {
    path: 'organization',
    loadChildren: () =>
      import('./pages/organization/organization.module').then((m) => m.OrganizationModule),
  },
  {
    path: 'graduate',
    loadChildren: () =>
      import('./pages/graduate/graduate.module').then((m) => m.GraduateModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
