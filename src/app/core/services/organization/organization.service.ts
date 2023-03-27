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

  registerOrganization(payload: any) {
    const {approvalFile} = payload
    const body = new FormData()
    body.append('OrganizationIndustryId', payload.OrganizationIndustryId)
    body.append('OrganizationSectorId', payload.OrganizationSectorId)
    body.append('RegisteringBody', payload.RegisteringBody)
    body.append('Name', payload.Name)
    body.append('DateOfIncorporation', payload.DateOfIncorporation)
    body.append('CAC', payload.CAC)
    body.append('LgaId', payload.LgaId)
    body.append('StateId', payload.StateId)
    body.append('State', payload.State)
    body.append('Lga', payload.Lga)
    body.append('Address', payload.Address)
    body.append('PhoneNumber', payload.PhoneNumber)
    body.append('Email', payload.EmailAddress)
    body.append('ApproverVM.Title', payload.Title)
    body.append('ApproverVM.FirstName', payload.FirstName)
    body.append('ApproverVM.LastName', payload.LastName)
    body.append('ApproverVM.Designation', payload.Designation)
    body.append('Documents', payload.Designation)
    for (let i = 0; i < approvalFile.length; i++) {
      body.append('Document[' + i + ']', approvalFile[i]);
    }
    return this.http.post<any>(
      `${this.baseUrl}mint-organization/api/v1/Organization/CreateOrganization`, body
    );
  }

  validateOrganizationCode(payload: any) {
    return this.http.post<any>(
      `${this.baseUrl}mint-organization/api/v1/OrganizationUser/EmailVerification`, payload
    );
  }

  getOrganizationSubscriptionHistory(
    payload: any
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/OrganizationVerification/Subscription-Historys`, {params: payload}
    );
  }

  getOrganizationVerificationHistory(
    payload: any
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/OrganizationVerification/Historys`, {params: payload}
    );
  }

  getOrganizationVerificationHistoryData(
    id: any
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/OrganizationVerification/Graduate-Record/${id}`
    );
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
