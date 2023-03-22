import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURI } from '../shared/baseURI.shared';

abstract class AbstractInstitutionService {
  abstract getAllInstitutions(
    institutionStatus: number,
    instituionTypeId: string,
    instituionSectorId: '',
    keyword: string,
    filter: string,
    pageIndex: number,
    pageSize: number,
    range?: string,
    fromDate?: string,
    toDate?: string
  ): Observable<any>;

  abstract getSingleInstitution(id: string): Observable<any>;
}

@Injectable({
  providedIn: 'root',
})
export class InstitutionService
  extends BaseURI
  implements AbstractInstitutionService
{
  constructor(private http: HttpClient) {
    super();
  }

  RegisterInstitution(payload: any) {
    const {approvalFile} = payload
    console.log(payload)
    const body = new FormData()
    body.append('InstitutionTypeId', payload.institutionTypeId)
    body.append('InstitutionSectorId', payload.institutionSectorId)
    body.append('RegisteringBody', payload.RegisteringBody)
    body.append('InstitutionBodyId', payload.institutionBodyId)
    body.append('InstitutionName', payload.InstitutionName)
    body.append('DateOfIncorporation', payload.DateOfIncorporation)
    body.append('RegistrationNumber', payload.RegistrationNumber)
    body.append('LgaId', payload.LgaId)
    body.append('StateId', payload.StateId)
    body.append('Street', payload.Street)
    body.append('PhoneNumber', payload.PhoneNumber)
    body.append('EmailAddress', payload.EmailAddress)
    body.append('ApproverVM.Title', payload.Title)
    body.append('ApproverVM.FirstName', payload.FirstName)
    body.append('ApproverVM.LastName', payload.LastName)
    body.append('ApproverVM.Designation', payload.Designation)
    body.append('Documents', payload.Designation)
    for (let i = 0; i < approvalFile.length; i++) {
      body.append('Document[' + i + ']', approvalFile[i]);
    }
    return this.http.post<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Institution/RegisterInstitution`, body
    );
  }

  ValidateRegistrationCode(payload: any) {
    return this.http.post<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Institution/ValidateRegistrationCode`, payload
    );
  }

  getAllInstitutionBody() {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionBody/GetAllInstitutionBodies`
    );
  }
  getAllInstitutionType() {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionType/GetAllInstitutionTypes`
    );
  }

  getAllInstitutionSector() {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Sector/GetAllInstitutionSector`
    );
  }

  getAllInstitutionRecords(payload: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Institution/GetAllInstitutionRecords`, {params: payload}
    );
  }

  getAllInstitutions(
    institutionStatus: number,
    instituionTypeId: string,
    instituionSectorId: string,
    keyword: string,
    filter: string,
    pageIndex: number,
    pageSize: number,
    range?: string,
    fromDate?: string,
    toDate?: string
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Institution/AllInstitutions?Keyword=${keyword}&Filter=${filter}&PageIndex=${pageIndex}&PageSize=${pageSize}&InstitutionStatus=${institutionStatus}&instituionSectorId=${instituionSectorId}&TimeBoundSearchVm.TimeRange=${range}&TimeBoundSearchVm.FromDate=${fromDate}&TimeBoundSearchVm.ToDate=${toDate}`
    );
  }

  getAllInstitutionUsers(
    instituionId: string,
    keyword: string,
    filter: string,
    pageIndex: number,
    pageSize: number
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/InstitutionUser/InstitutionUsersAndRoles?InstitutionId=${instituionId}&Keyword=${keyword}&Filter=${filter}&PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
  }

  getAllAdminInstitutionTransaction(
    institutionId: string,
    keyword: string,
    filter: string,
    status: string,
    requestor: string,
    fromDate: string,
    toDate: string,
    pageIndex: number,
    pageSize: number
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Transaction/Admin-Transactions-Of-An-Institution?InstitutionId=${institutionId}&Keyword=${keyword}&Filter=${filter}&Status=${status}&Requestor=${requestor}&TimeBoundSearchVm.FromDate=${fromDate}&TimeBoundSearchVm.ToDate=${toDate}&PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
  }

  getSingleInstitution(id: string) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Institution/GetInstitution/${id}`
    );
  }

  getALlFacultiesInInstitution(id: string) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Institution/GetAllFacultiesInAnInstitution?InstitutionId=${id}`
    );
  }

  getALlDepartmentInInstitution(id: string) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Institution/GetAllDepartmeentsInAnInstitution?InstitutionId=${id}`
    );
  }

  getInstitutionConfiguration(id: any) {
    console.log(id)
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionConfiguration/InstitutionDocumentType/${id}`
    );
  }

  approveRejectInstitution(payload: any) {
    return this.http.post<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionApproval/Approval-Action`, payload
    );
  }

}
