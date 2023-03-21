import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGraduateApproveReject } from 'src/app/store/graduates/types/index.type';
import { BaseURI } from '../shared/baseURI.shared';


abstract class AbstractGraduateService {
  abstract getAllGraduates(
    keyword: string,
    filter: string,
    sort: string ,
    pageIndex: number,
    pageSize: number
  ): Observable<any>;
}

@Injectable({
  providedIn: 'root'
})
export class GraduatesService extends BaseURI implements AbstractGraduateService {

  constructor(private http: HttpClient) {
    super()
   }

   
   getAllGraduates(
    keyword: string,
    filter: string,
    sort: string ,
    pageSize: number,
    pageIndex: number
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/AllGraduates?Keyword=${keyword}&Filter=${filter}&Sort=${sort}&PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
  }

   getGraduateById(
    graduateId: string
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/Graduate/${graduateId}`
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


  declineGraduateRequest(
    payload: IGraduateApproveReject
  ) {
    return this.http.post<any>(
      `${this.baseUrl}mint-auth/api/v1/GraduateApproval/Decline-Request`, payload
    );
  }


  downloadCSV(
    payload: any
  ) {
    console.log(payload)
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/ExportAsCSV`, {params: payload}
    );
  }

  downloadExcel(
    payload: any
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/ExportAsExcel`, {params: payload}
    );
  }
}
