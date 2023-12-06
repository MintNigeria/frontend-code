import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { LandingLayoutComponent } from './landing-layout/landing-layout.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CareersComponent } from './careers/careers.component';
import { ContactsComponent } from './contacts/contacts.component';
import { FaqsComponent } from './faqs/faqs.component';
import { VerificationServicesComponent } from './verification-services/verification-services.component';
import { TranscriptServicesComponent } from './transcript-services/transcript-services.component';
import { RequestDemoComponent } from './request-demo/request-demo.component';

const routes: Routes = [
  {
    path: '',
    component: LandingLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutUsComponent },
      { path: 'career', component: CareersComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'request-demo', component: RequestDemoComponent },
      { path: 'faqs', component: FaqsComponent },
      {path: 'verification-services', component: VerificationServicesComponent},
      {path: 'transcript-services', component: TranscriptServicesComponent},

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
