import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guards';
import { ModuleLoadingStrategyService } from './module.loading.strategy';
import { IdleScreenLoginComponent } from './pages/idle-screen-login/idle-screen-login.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/landing/landing.module').then((m) => m.LandingModule),
  },
  // {
  //   path: 'auth',
  //   loadChildren: () =>
  //     import('./pages/auth/auth.module').then((m) => m.AuthModule),
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
  {
    path: 'idle-user',
    component: IdleScreenLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: ModuleLoadingStrategyService,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
