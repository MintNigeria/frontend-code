import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificationsComponent } from './verifications.component';

const routes: Routes = [{ path: '', component: VerificationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificationsRoutingModule { }
