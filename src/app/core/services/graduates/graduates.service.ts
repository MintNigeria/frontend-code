import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURI } from '../shared/baseURI.shared';


abstract class AbstractGraduateService {
  abstract getAllInstitutionGraduates(
    institutionId: string,
    filter: any
  ): Observable<any>;
}

@Injectable({
  providedIn: 'root'
})
export class GraduatesService extends BaseURI implements AbstractGraduateService {

  constructor(private http: HttpClient) {
    super()
   }

   
   registerNewGraduate(payload: any) {
    const {approvalFile} = payload
    const body = new FormData()
    body.append('FirstName', payload.FirstName)
    body.append('LastName', payload.LastName)
    body.append('PhoneNumber', payload.PhoneNumber)
    body.append('Email', payload.Email)
    body.append('Address', payload.Address)
    body.append('Gender', payload.Gender)
    body.append('City', payload.City)
    body.append('Country', payload.Country)
    body.append('State', payload.State)
    body.append('ZipCode', payload.ZipCode)
    body.append('IdType', payload.IdType)
    body.append('IdNumber', payload.IdNumber)
    body.append('InstitutionAttendedVMs[0].InstitutionTypeId', payload.institutionTypeId)
    body.append('InstitutionAttendedVMs[0].InstitutionSectorId', payload.institutionSectorId)
    body.append('InstitutionAttendedVMs[0].InstitutionBodyId', payload.institutionBodyId)
    body.append('InstitutionAttendedVMs[0].InstitutionName', payload.InstitutionName)
    body.append('Documents', payload.Designation)
    for (let i = 0; i < approvalFile.length; i++) {
      body.append('Document[' + i + ']', approvalFile[i]);
    }
    return this.http.post<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/CreateGraduate`, body
    );
  }

  validateGraduateRegistration(payload: any) {
    return this.http.post<any>(
      `${this.baseUrl}mint-auth/api/v1/Authentication/EmailVerification`, payload
    );
  }
   getAllInstitutionGraduates(
    institutionId: string,
    filter: any
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionGraduate/InstitutionGraduates?InstitutionId=${institutionId}`, {params: filter}
    );
  }

   getGraduateById(
    graduateId: string,
    institutionId: string
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionGraduate/InstitutionGraduate?institutionId=${institutionId}&graduateId=${graduateId}`
    );
  }
  
  

   getAllPendingGraduates(
    keyword: string,
    filter: string,
    sort: string ,
    pageIndex: number,
    pageSize: number
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/ApprovalRequest?Keyword=${keyword}&Filter=${filter}&Sort=${sort}&PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
  } 
  
  approveGraduateRequest(
    payload: any
  ) {
    return this.http.post<any>(
      `${this.baseUrl}mint-auth/api/v1/GraduateApproval/Approve-Request`, payload
    );
  }



// this will be changed, not sure who uses it
  downloadANotherCSV(
    payload: any
  ) {
    ////console.log(payload)
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/ExportAsCSV`, {params: payload}
    );
  }

  downloadANotherExcel(
    payload: any
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/ExportAsExcel`, {params: payload}
    );
  }

// this is export for graduate records
  downloadCSV(
    payload: any
  ) {
    ////console.log(payload)
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionGraduate/ExportAsCSV`, {params: payload}
    );
  }

  downloadExcel(
    payload: any
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionGraduate/ExportAsExcel`, {params: payload}
    );
  }

  uploadGraduateRecord(payload: any) {
    const body = new FormData()
    body.append('InstitutionId', payload.institutionId)
    body.append('FacultyId', payload.faculty)
    body.append('DepartmentId', payload.department)
    body.append('DegreeTypeId', payload.degreeType)
    body.append('YearOfGraduation', payload.yearOfGraduation)
    body.append('File', payload.Document)
    return this.http.post<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionGraduate/UploadGraduates`, body
    );
  }

  createGraduateRecord(payload: any) {
    return this.http.post<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionGraduate/CreateGraduates`, payload
    );
  }
  
  downloadRecordUploadFormat(payload: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionGraduate/DownloadUploadFormat`, {params: payload}
    );
  }

  getAllGraduateRequestForGradaute(payload: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/GraduateRequest/Requests`, {params: payload}
    );
  }

  getAllGraduateRequestDetailForGradaute(requestId: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/GraduateRequest/${requestId}`
    );
  }

  getGraduateTransactionHistory(payload: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/GraduateRequest/Graduate-Transaction-History`, {params: payload}
    );
  }

  getAllHubItem(payload: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/ViewHubItems`, {params: payload}
    );
  }

  notifyMyInstitution(payload: any) {
    return this.http.post<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/NotifyMyInstitution`, payload
    );
  }

  getMyInstitutionNotified(id: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/MyInstitutionToNotify/${id}`
    );
  }

  getGraduateProfile(id: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/GetGraduateProfile/${id}`
    );
  }

  getGraduateInstitutions(id: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/GraduateInstitutions/${id}`
    );
  }

  updateGraduateInstitutions(id: any, payload: any) {
    return this.http.put<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/GraduateInstitutions/${id}`, payload
    );
  }

  updateGraduateProfile(payload: any) {
    const body = new FormData()
    body.append('FirstName', payload.firstName)
    body.append('LastName', payload.lastName)
    body.append('PhoneNumber', payload.phone)
    body.append('DateOfBirth', payload.dateOfBirth)
    body.append('Country', payload.country)
    body.append('State', payload.state)
    body.append('City', payload.city)
    body.append('ZipCode', payload.zipCode)
    body.append('Twitter', payload.twitter)
    body.append('Facebook', payload.facebook)
    body.append('LinkedIn', payload.linkedIn)
    body.append('ProfileImage', payload.profileImage)
    body.append('Device', payload.device)
    body.append('IpAddress', payload.ipAddress)
    body.append('IMEI', payload.imei)
    body.append('SerialNumber', payload.serialNumber)
    return this.http.put<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/GraduateProfile`, body
    );
  }
  uploadHubItem(payload: any) {
    const body = new FormData()
    body.append('File', payload.file)
    body.append('DocumentName', payload.documentName)
    body.append('IssuerName', payload.Issuer)
    body.append('DateIssued', payload.date)
    body.append('IMEI', payload.imei)
    body.append('SerialNumber', payload.serialNumber)
    body.append('Device', payload.device)
    body.append('IpAddress', payload.ipAddress)
    return this.http.post<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/UploadHubItem`, body
    );
  }

}
