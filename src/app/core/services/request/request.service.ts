import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURI } from '../shared/baseURI.shared';

abstract class AbstractRequestService {
  abstract getAllRequest(
    institutionType? : string,
    documentType? : string,
    selector? : string,
    status? : string,
    StartDate? : string,
    EndDate? : string,
    keyword?: string,
    filter?: string,
    pageSize?: number,
    pageIndex?: number,
  ): Observable<any>;
  abstract getAllOrganisationRequest(
    range: number,
    organisationIndustry : string,
    organisationSelector : string,
    documentType : string,
    status : string,
    StartDate : string,
    EndDate : string,
    keyword: string,
    filter: string,
    pageSize: number,
    pageIndex: number,
  ): Observable<any>;
  abstract getRequestDetailsByRequestId(
    requestId: string,
  ): Observable<any>;
}

@Injectable({
  providedIn: 'root',
})
export class RequestService
  extends BaseURI
  implements AbstractRequestService
{
  constructor(private http: HttpClient) {
    super();
  }

  getAllInstitutionGraduateRequest(
  payload: any    
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionRequest/GetGraduatesRequestsDashboard`, {params: payload}
    );
  }

  getAllInstitutionOrganizationRequest(
  payload: any    
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionRequest/GetVerificationRequestsDashboard`, {params: payload}
    );
  }

  getAllRequest(
    institutionType? : string,
    documentType? : string,
    selector? : string,
    status? : string,
    StartDate? : string,
    EndDate? : string,
    keyword?: string,
    filter?: string,
    pageSize?: number,
    pageIndex?: number,
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionRequest/GetGraduatesRequestsDashboard?InstitutionType=${institutionType}&DocumentType=${documentType}&Sector=${selector}&status=${status}&StartDate=${StartDate}&EndDate=${EndDate}&Range=0&Keyword=${keyword}&Filter=${filter}&PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
  }

  getAllOrganisationRequest(
    range: number,
    organisationIndustry : string,
    organisationSelector : string,
    documentType : string,
    status : string,
    StartDate : string,
    EndDate : string,
    keyword: string,
    filter: string,
    pageSize: number,
    pageIndex: number,
  ){
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionRequest/GetVerificationRequestsDashboard?Range=${range}&OrganisationIndustry=${organisationIndustry}&OrganisationSector=${organisationSelector}&DocumentType=${documentType}&Status=${status}&StartDate=${StartDate}&EndDate=${EndDate}&Keyword=${keyword}&Filter=${filter}&PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
  }

  getRequestDetailsByRequestId(
    requestId: string
  ){
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionRequest/InstitutionRequest/${requestId}`
    );
  }
}
