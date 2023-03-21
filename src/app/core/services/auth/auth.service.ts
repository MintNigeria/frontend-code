import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IChangePassword, ILogin } from 'src/app/store/auth/index.types';
import { BaseURI } from '../shared/baseURI.shared';

abstract class AbstractAuthService {
  abstract login(data: ILogin): Observable<any>;
  abstract changePassword(payload: IChangePassword): Observable<any>;
  abstract forgotPassword(email: string): Observable<any>;
  abstract sendTwoFactorCode(email: string): Observable<any>;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseURI implements AbstractAuthService {
  constructor(private http: HttpClient) {
    super();
  }

  login(payload: ILogin) {
    const httpParams = new HttpParams({
      fromObject: {
        username: payload.email,
        password: payload.password,
        grant_type: 'password',
        scope: 'offline_access openid',
      },
    });

    return this.http
      .post<any>(
        `${this.baseUrl}mint-auth/api/v1/authentication/token`,
        httpParams,
        {
          headers: { skip: 'true' },
        }
      )
      .pipe(map((res) => res));
  }

  changePassword(payload: IChangePassword) {
    return this.http.post(
      `${this.baseUrl}mint-auth/api/v1/authentication/changePassword`,
      payload
    );
  }
  forgotPassword(email: string) {
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/authentication/ForgetPassword/${email}`
    );
  }
  sendTwoFactorCode(email: string) {
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/authentication/ForgetPassword/${email}`
    );
  }
}
