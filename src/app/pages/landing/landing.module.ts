import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { WhatWeDoComponent } from './what-we-do/what-we-do.component';
import { WhyUseVacComponent } from './why-use-vac/why-use-vac.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { FooterComponent } from './footer/footer.component';


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
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }
