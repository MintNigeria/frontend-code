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

}
