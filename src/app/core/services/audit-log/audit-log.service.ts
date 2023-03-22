import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURI } from '../shared/baseURI.shared';

abstract class AbstractAuditLogService {
  abstract getAllAuditLog(
    keyword: string,
    filter: string,
    pageIndex: number,
    pageSize: number
  ): Observable<any>;
}

@Injectable({
  providedIn: 'root',
})
export class AuditLogService
  extends BaseURI
  implements AbstractAuditLogService
{
  constructor(private http: HttpClient) {
    super();
  }

  getAllAuditLog(
    keyword: string,
    filter: string,
    pageIndex: number,
    pageSize: number
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-report/api/Audit?Keyword=${keyword}&Filter=${filter}&PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
  }
}
