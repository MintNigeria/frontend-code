import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IChangeRolePassword } from 'src/app/store/users-and-roles/types/index.types';
import { BaseURI } from '../shared/baseURI.shared';

abstract class AbstractUsersAndRolesService {
  abstract getAllUsersAndRoles(

    keyword: string,
    filter: string,
    pageSize: number,
    pageIndex: number,
  ): Observable<any>;

  abstract changePassword(payload: IChangeRolePassword): Observable<any>;

  abstract getGlobalAdminUser(id: string): Observable<any>

  abstract addGlobalAdminUser(payload: any): Observable<any>;

  abstract createAdminRole(payload: any): Observable<any>;

  abstract updateGlobalAdminUser(payload: any): Observable<any>;

  abstract getAllGlobalPermissions(payload: any): Observable<any>;

  abstract getAllGlobalUsersAndRoles( 
    keyword: string,
    filter: string,
    pageSize: number,
    pageIndex: number,): Observable<any>;

    
    abstract getAdminUsersInRole( 
      roleId: string,
      keyword: string,
      filter: string,
      pageSize: number,
      pageIndex: number): Observable<any>;

     abstract activateOrDeactivateUsers(payload: any): Observable<any>;

     abstract getRolePermission(id: string): Observable<any>;

     abstract getStates(payload: any): Observable<any>;

     abstract getLocalGovernment(): Observable<any>;
}




@Injectable({
  providedIn: 'root',
})
export class UsersAndRolesService
  extends BaseURI
  implements AbstractUsersAndRolesService
{
  constructor(private http: HttpClient) {
    super();
  }

  getAllUsersAndRoles(

    keyword: string,
    filter: string,
    pageSize: number,
    pageIndex: number,
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/Role/GlobalAdminRoles?Keyword=${keyword}&Filter=${filter}&PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
  }

  changePassword(payload: IChangeRolePassword): Observable<any>{
    return this.http.post(
   `${this.baseUrl}mint-auth/api/v1/Authentication/ChangePassword`, 
   payload
    );
  }

  getGlobalAdminUser(id: string){
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/GlobalAdminUser/GlobalAdminUser/${id}`
    )
  }

  getInsitutionRoles(id: string){
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/Role/InstitutionRoles/${id}`
    )
  }

  createInstitutionUserWithRole(payload: any): Observable<any> {
    
    return this.http.post(
      `${this.baseUrl}mint-auth/api/v1/InstitutionUser/CreateInstitutionUserWithRole`, payload
    )
  }
  addGlobalAdminUser(payload: any): Observable<any> {
    const formData = new FormData();
    let payload_ = payload as any;
    for (let key in payload_) {
      formData.append(key, payload_[key]);
    }
    return this.http.post(
      `${this.baseUrl}mint-auth/api/v1/GlobalAdminUser/AddGlobalAdminUserWithARole`, formData
    )
  }

  updateGlobalAdminUser(payload: any): Observable<any> {
    return this.http.put(
      `${this.baseUrl}mint-auth/api/v1/Role/UpdateGlobalAdminUserAndRole`, payload
    )
  }

  getAllGlobalUsersAndRoles(
    keyword: string,
    filter: string,
    pageSize: number,
    pageIndex: number,
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/GlobalAdminUser/GlobalAdminUsersAndRoles?Keyword=${keyword}&Filter=${filter}&PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
  }

  getAllGlobalPermissions(){
    return this.http.get<any>(
   `${this.baseUrl}mint-auth/api/v1/Role/GetAllGlobalAdminPermissions`
    )
    
  }

  createAdminRole(payload: any){
    
    return this.http.post<any>(
      `${this.baseUrl}mint-auth/api/v1/Role/CreateAdminRole`, payload
    )
  }


  getAdminUsersInRole( 
    roleId: string,
    keyword: string,
    filter: string,
    pageSize: number,
    pageIndex: number,
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/Role/GlobalAdminUsersInRole?RoleId=${roleId}&Keyword=${keyword}&Filter=${filter}&PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
  }
  

  activateOrDeactivateUsers(payload: any){
    return this.http.post<any>(
      `${this.baseUrl}mint-auth/api/v1/Authentication/ActivateOrDeactivateUsers`, payload
    )
  }


  getRolePermission(id: string){
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/Role/RolePermission/${id}`
    )
  }

  getStates(){
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Utility/States`
    )
  }

  getLocalGovernment(){
    return this.http.get<any> (
      `${this.baseUrl}mint-higherinstitution/api/v1/Utility/StatesAndLocalGovts`
    )
  }

}



