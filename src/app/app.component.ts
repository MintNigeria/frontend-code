import { Component } from '@angular/core';
import { NotificationsService } from './core/services/shared/notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  isOnline: boolean;
  title = 'mint-client';
  constructor(
    private notification: NotificationsService,
    private router : Router
  ) {
    this.isOnline = navigator.onLine;
      window.addEventListener('online', () => {
        this.isOnline = true;
        this.notification.publishMessages('success', 'Welcome back. You are now connected')
        
      });
      
      window.addEventListener('offline', () => {
        this.isOnline = false;
        this.notification.publishMessages('danger', 'You are currently offline, please check your internet connection')
      });
  }

  // showCookies(currentRoute: string): boolean{
  //   if(currentRoute == "privacy-policy" || currentRoute == "terms-and-condition"){
  //     return false
  //   }
  //   return true
  // }
  
}
