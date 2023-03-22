import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrganizationApproveReject } from 'src/app/store/organization/types/index.types';
import { BaseURI } from '../shared/baseURI.shared';

abstract class AbstractOrganizationService {
  abstract getAllOrganization(
    organizationStatus: number,
    keyword: string,
    filter: string,
    pageSize: number,
    pageIndex: number
  ): Observable<any>;
  abstract getSingleOrganization(id: string): Observable<any>;
  abstract getOrganizationTransaction(
    id: string,
    keyword: string,
    filter: string,
    pageSize: number,
    pageIndex: number
  ): Observable<any>;
}

@Injectable({
  providedIn: 'root',
})
export class OrganizationService
  extends BaseURI
  implements AbstractOrganizationService
{
  constructor(private http: HttpClient) {
    super();
  }

  getAllOrganization(
    organizationStatus: number,
    keyword: string,
    filter: string,
    pageSize: number,
    pageIndex: number
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-organization/api/v1/Organization/GetOrganizations?Keyword=${keyword}&Filter=${filter}&PageIndex=${pageIndex}&PageSize=${pageSize}&OrganizationStatus=${organizationStatus}`
    );
  }

  getSingleOrganization(id: string) {
    return this.http.get<any>(
      `${this.baseUrl}mint-organization/api/v1/Organization/GetOrganization/${id}`
    );
  }

  getOrganizationTransaction(
    id: string,
    keyword: string,
    filter: string,
    pageSize: number,
    pageIndex: number
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Transaction/Admin-Transactions-of-an-organization?Keyword=${keyword}&Filter=${filter}&PageIndex=${pageIndex}&PageSize=${pageSize}&OrganizationId=${id}`
    );
  }

  getSingleOrganizationTransactionDetails(id: string) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Transaction/${id}`
    );
  }

  getAllPendingOrganizations(
    keyword: string,
    filter: string,
    pageSize: number,
    pageIndex: number
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-organization/api/v1/Approval/GetOrganizationRequest?Keyword=${keyword}&Filter=${filter}&PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
  }

  getIPAddress() {
    return this.http.get<any>('https://api.ipify.org/');
  }

  approvePendingOrganizationRequest(payload: IOrganizationApproveReject) {
    return this.http.post<any>(
      `${this.baseUrl}mint-organization/api/v1/Approval/ApproveRequest`,
      payload
    );
  }
  declinePendingOrganizationRequest(payload: IOrganizationApproveReject) {
    return this.http.post<any>(
      `${this.baseUrl}mint-organization/api/v1/Approval/DeclineRequest`,
      payload
    );
  }
}
