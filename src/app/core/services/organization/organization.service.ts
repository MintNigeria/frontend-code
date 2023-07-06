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
    body.append('RegistrationNumber', payload.CAC)
    body.append('State', payload.State)
    body.append('City', payload.City)
    body.append('Country', payload.Country)
    body.append('Address', payload.Address)
    body.append('PhoneNumber', payload.PhoneNumber.internationalNumber)
    body.append('Email', payload.EmailAddress)
    body.append('ApproverVM.Title', payload.Title)
    body.append('ApproverVM.FirstName', payload.FirstName)
    body.append('ApproverVM.LastName', payload.LastName)
    body.append('ApproverVM.Designation', payload.Designation)
    for (let i = 0; i < approvalFile.length; i++) {
      body.append('DocumentVM[' + i + '].FileNo', '');
      body.append('DocumentVM[' + i + '].File', approvalFile[i]);
    }
    return this.http.post<any>(
      `${this.baseUrl}mint-organization/api/v1/Organization/CreateOrganization`, body
    );
  }

  updateOrganization(payload: any) {
    const body = new FormData()
    body.append('Id', payload.id)
    body.append('Country', payload.country)
    body.append('State', payload.state)
    body.append('City', payload.city)
    body.append('Address', payload.address)
    body.append('PhoneNumber', payload.phone)
    body.append('Logo', payload.file)
    body.append('imei', payload.imei)
    body.append('serialNumber', payload.serialNumber)
    body.append('device', payload.device)
    body.append('ipAddress', payload.ipAddress)

    return this.http.put<any>(
      `${this.baseUrl}mint-organization/api/v1/Organization/UpdateOrganization`, body
    );
  }

  validateOrganizationCode(payload: any) {
    return this.http.post<any>(
      `${this.baseUrl}mint-auth/api/v1/OrganizationUser/EmailVerification`, payload
    );
  }

  verifyGraduateRecord(payload: any) {
    return this.http.post<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/OrganizationVerification/Verify-Graduate`, payload
    );
  }

  verifyHistoryInstitutionDropdown(id: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/OrganizationVerification/InstitutionName-By-Verification-Histories/${id}`);
  }

  organizationProfile(id: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-organization/api/v1/Organization/Profile/${id}`);
  }

  organizationSectorAndIndustry(id: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-organization/api/v1/Organization/OrganizationIndustryAndSectorByName/${id}`);
  }

  reasonForRequest() {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/OrganizationVerification/Reason-For-Request`);
  }

  getOrganizationSubscriptionHistory(
    payload: any
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/OrganizationVerification/Organization-transactions`, {params: payload}
    );
  }

  getOrganizationVerificationHistory(
    payload: any
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/OrganizationVerification/Histories`, {params: payload}
    );
  }

  getOrganizationVerificationHistoryData(
    id: any
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/OrganizationVerification/Graduate-Record/${id}`
    );
  }

  getAlltalentSearchPool(
    payload: any
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/OrganizationVerification/Organization-Search-Pool`, {params: payload}
    );
  }

  getAlltalentSearchPoolResult(
    payload: any
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/TalentSearch/Organization-TalentSearch-Results`, {params: payload}
    );
    // return this.http.get<any>(
    //   `${this.baseUrl}mint-higherinstitution/api/v1/OrganizationVerification/Organization-Search-Pool-Results`, {params: payload}
    // );
  }

  newTalentPoolSearch(
    payload: any
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/OrganizationVerification/Organization-Talent-Search`, {params: payload}
    );
  }

  organizationVerificationByGraduateDetails(
    payload: any
  ) {
    return this.http.post<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/OrganizationVerification/Verify-By-Graduate-Details`, payload, 
    );
  }


  getDepartmentGrades(
    institutionId: any,
    deparmentId: any
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/OrganizationVerification/Institution-Grades-By-Department?InstitutionId=${institutionId}&Department=${deparmentId}`
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
  exportTalentSearchPoolResults(payload: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-organization/api/v1/OrganizationVerification/Export-Talent-Search-Pool-Result-As-Excel`, {params: payload}
    );
  }
  searchCompletedGraduateProfileForTalentSearch(payload: any) {
    const {Institutions,ClassesOfDegree} = payload
    const body = new FormData()
    body.append('StateOfOrigin', payload.StateOfOrigin)
    body.append('StateOfLocation', payload.StateOfLocation)
    body.append('YearOfExperience', payload.YearOfExperience)
    body.append('YearOfGraduation', payload.YearOfGraduation)
    body.append('FromYearOfGraduation', payload.FromYearOfGraduation)
    body.append('ToYearOfGraduation', payload.ToYearOfGraduation)
    body.append('Profession', payload.Profession)
    body.append('Age', payload.Age)
    body.append('StartAgeRange', payload.StartAgeRange)
    body.append('EndAgeRange', payload.EndAgeRange)
    for (let i = 0; i < Institutions.length; i++) {
      body.append('Institutions[' + i + ']', Institutions[i]);
    }
    for (let i = 0; i < ClassesOfDegree.length; i++) {
      body.append('ClassesOfDegree[' + i + ']', ClassesOfDegree[i]);
    }
    return this.http.post<any>(
      `${this.baseUrl}mint-auth/api/v1/TalentSearch/Search-Completed-Graduate-Profile-For-TalentSearch`, payload
    );
  }
  getTalentSearchTransactionId(payload: any) {
    
    return this.http.post<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Transaction/Organization-Make-Payment-For-TalentSearch`, payload
    );
  }
  getTalentSearchBatchRecord(payload: any) {
    
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/TalentSearch/Organization-TalentSearch-Batch-Results`, payload
    );
  }
}
