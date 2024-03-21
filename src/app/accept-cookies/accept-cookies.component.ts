import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations'; 

@Component({
  selector: 'app-accept-cookies',
  templateUrl: './accept-cookies.component.html',
  styleUrls: ['./accept-cookies.component.scss'],
   animations: [ // Define animations here
    trigger('easeInOut', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(-20px)' // Initial position of the content
      })),
      transition(':enter, :leave', [
        animate('300ms ease-in-out') // Animation duration and easing
      ])
    ])
  ]
})
export class AcceptCookiesComponent implements OnInit {
  cookiesVAC: boolean = false;
  showPopUp: boolean = true;
  showPrivacyPolicy: boolean = false;
  showTermsOfCondition: boolean = false; 

  constructor() { }

  ngOnInit(): void {
    const cookiesVAC = localStorage.getItem('cookiesVAC');
    if (cookiesVAC === 'true') {
      this.showPopUp = false; 
    }
  }

  acceptCookies(): void {
    localStorage.setItem('cookiesVAC', 'true');
    this.cookiesVAC= true;

    this.closePopup();
  }

  closePopup(): void {
    this.showPopUp = false;
  }

  togglePrivacyPolicy(): void {
    this.showPrivacyPolicy = !this.showPrivacyPolicy; 
  }

  toggleTermsOfCondition(): void {
    this.showTermsOfCondition = !this.showTermsOfCondition; 
  }

}
