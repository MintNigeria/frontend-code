import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  ɵHttpInterceptingHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpHandler,
  HttpResponse,
} from '@angular/common/http';
import { throwError, Observable, BehaviorSubject, of } from 'rxjs';
import {
  catchError,
  filter,
  take,
  switchMap,
  finalize,
  tap,
} from 'rxjs/operators';
import { StorageService } from '../services/shared/storage.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService, private router: Router) {}
  private AUTH_HEADER = 'Authorization';
  private token = this.storageService.getItem('token');
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.get('skip')) {
      req = req.clone({
        headers: req.headers.delete('skip'),
      });
      return next.handle(req);
    }
    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`,
        },
        headers: req.headers.set('Content-Type', 'application/json'),
      });
    }
    req = this.addAuthenticationToken(req);
    return next.handle(req).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          if (evt.status >= 200 && evt.status <= 226) {
            if (evt.body.code && evt.body.code !== 1) {
              //   use notification here
            }
          }
        }
      }),
      catchError((_error: HttpErrorResponse) => {
        if (_error) {
          if (_error.status === 401) {
            this.storageService.removeItem('token');
            //     //   use notification here with message "your session has expired you need to login again"

            this.router.navigate(['auth']);
          }
          if (_error.status === 403) {
            this.storageService.removeItem('token');
            //  use notification here with message "You don't view this application"
            this.router.navigate(['auth']);
          }
          if (_error.status === 400) {
            const { errors, errorMessages } = _error.error;
            if (typeof errors === 'object') {
              let value = Object.values(errors);
              //       //   notification value.toString()
            } else {
              //       //   notification errors.toString() || errorMessages.toString()
            }
          }

          // this requires authentication. you can add unique logics here depending on your use case.
          if (this.refreshTokenInProgress) {
            return this.refreshTokenSubject.pipe(
              filter((result) => result !== null),
              take(1),
              switchMap(() => next.handle(this.addAuthenticationToken(req)))
            );
          } else {
            this.refreshTokenInProgress = true; // disable patch
            // set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
            this.refreshTokenSubject.next(null);
            return this.refreshAccessToken().pipe(
              switchMap((success: boolean) => {
                this.refreshTokenSubject.next(success);
                return next.handle(this.addAuthenticationToken(req));
              }),
              // when the call to refreshToken completes we reset the refreshTokenInProgress to false
              // for thr next time the token needs to be refreshed
              finalize(() => (this.refreshTokenInProgress = false))
            );
          }
        } else {
          return throwError(_error);
        }
      })
    );
  }

  private refreshAccessToken(): Observable<any> {
    return of(this.storageService.getItem('refreshToken'));
  }
  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    if (!this.token) return request;
    if (!request.url.match(/www.example.com\//)) return request;
    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, 'Bearer ' + this.token),
    });
  }
}

// Add ${FlexLayoutModule.forRoot()} to the @NgModule imports section
