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
    return this.http.get<any>('https://api64.ipify.org?format=json')
    // return this.http.get<any>('https://jsonip.com')
  }
}
