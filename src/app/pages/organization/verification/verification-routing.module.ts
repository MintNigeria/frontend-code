import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultsComponent } from './start-verification/search-results/search-results.component';
import { VerifyDocumentsComponent } from './start-verification/search-results/verify-documents/verify-documents.component';
import { StartVerificationComponent } from './start-verification/start-verification.component';
import { VerificationComponent } from './verification.component';

const routes: Routes = [
  {path: '', component: VerificationComponent,},

  {path: 'verify-documents', component: StartVerificationComponent},
  {path: 'verify-documents/:id', component: SearchResultsComponent},
  {path: 'verify-documents/:id/:id', component: VerifyDocumentsComponent},

  {path: 'view-verified-documents/:id', component: VerifyDocumentsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificationRoutingModule { }
