import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {path: '', component: MainComponent,
children: [
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
 
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
