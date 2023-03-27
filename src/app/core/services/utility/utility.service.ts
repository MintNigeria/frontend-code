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

  getuserIP() {
    return this.http.get<any>('https://jsonip.com')
  }
}
