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
  showPopUp: boolean = true;
  showPrivacyPolicy: boolean = false;
  showTermsOfCondition: boolean = false;

  constructor() { }

  ngOnInit(): void {
    const cookiesVAC = this.getCookie("cookiesVAC");
    if (cookiesVAC === 'true') {
      this.showPopUp = false; // Hide the pop-up if cookies are already accepted
    }
  }

  acceptCookies(): void {
    this.setCookie('cookiesVAC', 'true');
    this.showPopUp = false;

    this.closePopup();
  }

  setCookie(name: string, value: string, days: number = 365) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
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

  getCookie(name: string) {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) == 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return "";
  }
}
