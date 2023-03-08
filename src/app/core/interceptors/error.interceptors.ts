import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoaderService } from '../services/shared/loader.service';
import { NotificationsService } from '../services/shared/notifications.service';

import { Router } from '@angular/router';
import { StorageService } from '../services/shared/storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private loaderService: LoaderService,
    private notificationService: NotificationsService,
    private localStorage: StorageService,
    private router: Router
  ) {}
  errorMessage: any = [];

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.show();
    return next.handle(request).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          if (evt.status >= 200 && evt.status <= 226) {
            if (evt.body.code && evt.body.code !== 1) {
              this.notificationService.publishMessages(
                evt.body.errors.toString() || evt.body.description,
                'danger',
              );
            }
          }
        }
      }),
      catchError((err) => {
        if (err.error instanceof ErrorEvent) {
          this.errorMessage = err.error.message;
          this.notificationService.publishMessages(
            this.errorMessage,
            'danger'
          );
        } else if (err.status === 400) {
          this.notificationService.publishMessages(
            err.error.title,
            'danger',
          );

          } else if (err.status === 401) {
          this.localStorage.removeItem('token');
          this.notificationService.publishMessages(
            'Your session has expired you need to login again',
            'danger'
          );
          this.router.navigateByUrl('/auth');
        } else if (err.status === 403) {
          this.localStorage.removeItem('token');
          this.notificationService.publishMessages(
            'You don"t have the right permission to access this Route',
            'danger',
          );
        } else if (err.error.errorDescription ) {
          this.notificationService.publishMessages(
            err.error.errorDescription,
            'danger',
          );
        }
        return throwError(err);
      })
    );
  }
}