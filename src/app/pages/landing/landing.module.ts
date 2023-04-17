import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { HowItWorksComponent } from './home/how-it-works/how-it-works.component';
import { WhatWeDoComponent } from './home/what-we-do/what-we-do.component';
import { WhyUseVacComponent } from './home/why-use-vac/why-use-vac.component';
import { TestimonialsComponent } from './home/testimonials/testimonials.component';
import { AnalyticsComponent } from './home/analytics/analytics.component';
import { FooterComponent } from './footer/footer.component';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import { LandingLayoutComponent } from './landing-layout/landing-layout.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CareersComponent } from './careers/careers.component';
import { ContactsComponent } from './contacts/contacts.component';
import { FaqsComponent } from './faqs/faqs.component';
import { QuestionsComponent } from './faqs/questions/questions.component';
import { ContactComponent } from './contacts/contact/contact.component';
import { WhoWeAreComponent } from './about-us/who-we-are/who-we-are.component';
import { VerificationServicesComponent } from './verification-services/verification-services.component';
import { VerificationServiceComponent } from './verification-services/verification-service/verification-service.component';
import { TranscriptServicesComponent } from './transcript-services/transcript-services.component';
import { TranscriptServiceComponent } from './transcript-services/transcript-service/transcript-service.component';


@NgModule({
  declarations: [
    LandingComponent,
    NavBarComponent,
    CarouselComponent,
    HowItWorksComponent,
    WhatWeDoComponent,
    WhyUseVacComponent,
    TestimonialsComponent,
    AnalyticsComponent,
    FooterComponent,
    LoginModalComponent,
    LandingLayoutComponent,
    HomeComponent,
    AboutUsComponent,
    CareersComponent,
    ContactsComponent,
    FaqsComponent,
    QuestionsComponent,
    ContactComponent,
    WhoWeAreComponent,
    VerificationServicesComponent,
    VerificationServiceComponent,
    TranscriptServicesComponent,
    TranscriptServiceComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }
