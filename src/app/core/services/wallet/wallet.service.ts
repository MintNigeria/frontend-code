import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURI } from '../shared/baseURI.shared';

abstract class AbstractWalletSService {
 
}

@Injectable({
  providedIn: 'root',
})
export class WalletService
  extends BaseURI
  implements AbstractWalletSService
{
  constructor(private http: HttpClient) {
    super();
  }

  getOrganizationWalletId(id:any){
    return this.http.get<any> (
      `${this.baseUrl}mint-higherinstitution/api/v1/Wallet/OrganizationWallet/${id}`
    )
  }

  fundOrganizationWallet(payload:any){
    return this.http.post<any> (
      `${this.baseUrl}mint-higherinstitution/api/v1/Transaction/Main-Organization-Buy-Subscription`, payload
    )
  }

  validateOrganizationFundWallet(payload:any){
    return this.http.post<any> (
      `${this.baseUrl}mint-higherinstitution/api/v1/Transaction/Main-Validate-Payment`, payload
    )
  }

  
}
