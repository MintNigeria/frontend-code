import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guards';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  // {
  //   path: 'authentication',
  //   loadChildren: () =>
  //     import('./pages/authentication/authentication.module').then((m) => m.AuthenticationModule),
  //     data: { preload: true }
  // },
  {
    path: 'institution',
    loadChildren: () =>
      import('./pages/institution/institution.module').then((m) => m.InstitutionModule),
      canActivate: [AuthGuard],
  },
  {
    path: 'organization',
    loadChildren: () =>
      import('./pages/organization/organization.module').then((m) => m.OrganizationModule),
       canActivate: [AuthGuard]
  },
  {
    path: 'graduate',
    loadChildren: () =>
      import('./pages/graduate/graduate.module').then((m) => m.GraduateModule),
       canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
