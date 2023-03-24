import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURI } from '../shared/baseURI.shared';


abstract class AbstractUploadsService {
  abstract getAllInstitutionUploads(
    filter: any
  ): Observable<any>;
}

@Injectable({
  providedIn: 'root'
})
export class UploadsService extends BaseURI implements AbstractUploadsService {

  constructor(private http: HttpClient) {
    super()
   }

   
   getAllInstitutionUploads(
    filter: any
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionGraduate/GetAllUploads`, {params: filter}
    );
  }

}
