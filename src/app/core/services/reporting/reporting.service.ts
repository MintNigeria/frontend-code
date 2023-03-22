import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURI } from '../shared/baseURI.shared';

abstract class AbstractReportingService {
  abstract getAllReports(
    keyword: string,
    filter: string,
    pageSize: number,
    pageIndex: number
  ): Observable<any>;
  abstract getTransactionsReports(
    keyword: string,
    filter: string,
    pageSize: number,
    pageIndex: number
  ): Observable<any>;
}

@Injectable({
  providedIn: 'root',
})
export class ReportingService
  extends BaseURI
  implements AbstractReportingService
{
  constructor(private http: HttpClient) {
    super();
  }

  getAllReports(
    keyword: string,
    filter: string,
    pageSize: number,
    pageIndex: number
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionRequest/AllRequestsReport?Keyword=${keyword}&Filter=${filter}&PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
  }

  getTransactionsReports(
    keyword: string,
    filter: string,
    pageSize: number,
    pageIndex: number
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Transaction/Institutions?Keyword=${keyword}&Filter=${filter}&PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
  }
  getInstitutionTransactions(
    institutionId: any,
    payload: any
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Transaction/Institution/${institutionId}`, {params: payload}
    );
  }
  
  exportTransactionCSV(
    institutionId: any,
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Transaction/ExportAsCSV?institutionId=${institutionId}`
    );
  }
  
  exportTransactionExcel(
    institutionId: any,
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Transaction/ExportAsExcel?institutionId=${institutionId}`
    );
  }
}
