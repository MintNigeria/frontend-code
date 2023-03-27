import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURI } from '../shared/baseURI.shared';

abstract class AbstractDashboardService {
  abstract getAllDashboard(
    dashBoardStatus: number,
    keyword: string,
    filter: string,
    pageSize: number,
    pageIndex: number,
  ): Observable<any>;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService
  extends BaseURI
  implements AbstractDashboardService
{
  constructor(private http: HttpClient) {
    super();
  }

  getAllDashboard(
    dashBoardStatus: number,
    keyword: string,
    filter: string,
    pageSize: number,
    pageIndex: number,
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-dashboard/api/v1/Dashboard/AllDashboards?Keyword=${keyword}&Filter=${filter}&PageIndex=${pageIndex}&PageSize=${pageSize}&DashboardStatus=${dashBoardStatus}`
    );
  }

  getAllDashboardInfoData(
    filter: any
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionDashboard/GetInstitutionTansactionAndRevenueInfo`, {params: filter}
    );
  }

  getDashboardRevenueAnalysis(
    filter: any
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionDashboard/GetInstitutionRevenueAnalysis`, {params: filter}
    );
  }
  

  getDashboardTopInstitutions(
    filter: any
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionDashboard/TopRequestsByOrganizations`, {params: filter}
    );
  }

  getOrganizationDashboardInfo(
    filter: any
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionDashboard/TopOrganizationDasboard`, {params: filter}
    );
  }

}
