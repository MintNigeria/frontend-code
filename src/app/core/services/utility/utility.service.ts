import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURI } from '../shared/baseURI.shared';

abstract class AbstractUtilityService {
 
}

@Injectable({
  providedIn: 'root',
})
export class UtilityService
  extends BaseURI
  implements AbstractUtilityService
{
  constructor(private http: HttpClient) {
    super();
  }
  getLocalGovernment(){
    return this.http.get<any> (
      `${this.baseUrl}mint-higherinstitution/api/v1/Utility/StatesAndLocalGovts`
    )
  }

  getNotification(entityId : number, userType : number){
    return this.http.get<any>(
      `${this.baseUrl}mint-messaging/api/Notification/GetAllNotifications?EntityId=${entityId}&UserType=${userType}`
    );  }

  contactUs(payload: any){
    return this.http.post<any>(
      `${this.baseUrl}mint-messaging/api/Notification/SendInquiryEmail`, payload
    );  
  }

  contactHelpDesk(payload: any){
    return this.http.post<any>(
      `${this.baseUrl}mint-messaging/api/Notification/HelpDesk`, payload
    );  
  }

  getuserIP() {
    return this.http.get<any>('http://ip-api.com/json')
    // return this.http.get<any>('https://api64.ipify.org?format=json')
    // return this.http.get<any>('https://jsonip.com')
  }

  deleteCookie(name: string) {
    console.log(name)
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  getCookieValue(name: string): string {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return '';
  }
}
