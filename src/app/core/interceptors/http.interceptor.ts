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
  retry,
} from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { NotificationsService } from '../services/shared/notifications.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private token: any = '';

  constructor(
    private storageService: StorageService,
    private router: Router,
    private _notificationService: NotificationsService
  ) {}

  private AUTH_HEADER = 'Authorization';
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    ////console.log(req);
    // ////console.log(this.token);
    if (req.headers.get('skip')) {
      req = req.clone({
        headers: req.headers.delete('skip'),
      });
      return next.handle(req);
    }
    this.token = this.storageService.getItem('token');
    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    }
    req = this.addAuthenticationToken(req);
    return next.handle(req).pipe(
      retry(1),
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          if (evt.status >= 200 && evt.status <= 226) {
            if (
              evt.body.code &&
              evt.body.code !== 1 &&
              evt.body.code !== 'OK'
            ) {
              this._notificationService.publishMessages(
                'error',
                evt.body.errors.toString() || evt.body.description || evt.body.errors
              );
            } 
            }
        }
      }),
      catchError((_error: HttpErrorResponse) => {
        // ////console.log(_error.status);
        if (_error) {
          if (_error.status === 401) {
            localStorage.clear();

            // this.storageService.removeItem('token');
            //     //   use notification here with message "your session has expired you need to login again"
            this._notificationService.publishMessages(
              'error',
              'Your session has expired you need to login again'
            );

            // this.router.navigate(['/']);
            location.href = '/';
          }
          if (_error.status === 403) {
            localStorage.clear();

            this._notificationService.publishMessages(
              'error',
              'You don"t have access to view this application'
            );
            //  use notification here with message "You don't view this application"
            this.router.navigate(['/']);
          }
          if (_error.status === 400) {
            // ////console.log(_error);
            const {
              error,
              errorMessages,
              error_description,
              errorDescription,
            } = _error.error;
            ////console.log(_error.error);
            // ////console.log(error);
            // ////console.log(error_description);
            if (typeof error === 'object') {
              let value = Object.values(error);
              this._notificationService.publishMessages(
                'error',
                value.toString()
              );
              //       //   notification value.toString()
            } else {
              this._notificationService.publishMessages(
                'error',
                error_description.toString() ||
                  error.toString() ||
                  errorMessages.toString() ||
                  errorDescription.toString()
              );
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
    // ////console.log(this.token);
    if (!this.token) return request;
    if (!request.url.match(/www.example.com\//)) return request;
    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, 'Bearer ' + this.token),
    });
  }
}

// Add ${FlexLayoutModule.forRoot()} to the @NgModule imports section
