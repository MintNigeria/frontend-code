import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { StorageService } from 'src/app/core/services/shared/storage.service';
import { AppResponseInterface } from 'src/app/types/appState.interface';
import { setAPIResponseMessage } from '../shared/app.action';

import {
  invokeLoginUser,
  loginSuccess,
  changePasswordUser,
  changePasswordSuccess,
  requestPasswordReset,
  requestPasswordResetSuccess,
  passwordReset,
  getUserProfileSuccess,
  getUserProfile,
  passwordResetSuccess,
} from './action';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private storage: StorageService,
    private appStore: Store<AppResponseInterface>,
    private notification: NotificationsService,
    private authService: AuthService
  ) {}

  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeLoginUser),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIResponseMessage({
            apiResponseMessage: {
              apiResponseMessage: '',
              isLoading: true,
              isApiSuccessful: false,
            },
          })
        );

        const { email, password } = action;
        loginSuccess({ accessToken: '' });
        return this.authService.login({ email, password }).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIResponseMessage({
                apiResponseMessage: {
                  apiResponseMessage: '',
                  isLoading: false,
                  isApiSuccessful: true,
                },
              })
            );
            this.storage.setItem('token', data.access_token);
            return loginSuccess({ accessToken: data.access_token });
          }),
          catchError((res) => {
            if (res.error)
              this.notification.publishMessages(
                'error',
                res.error.error_description || res.error.errorDescription
              );
            return of();
          })
        );
      })
    );
  });

  changePassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(changePasswordUser),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIResponseMessage({
            apiResponseMessage: {
              apiResponseMessage: '',
              isLoading: true,
              isApiSuccessful: false,
            },
          })
        );
        const { newPassword, confirmPassword, currentPassword } = action;
        return this.authService
          .changePassword({ newPassword, confirmPassword, currentPassword })
          .pipe(
            map((data) => {
              this.appStore.dispatch(
                setAPIResponseMessage({
                  apiResponseMessage: {
                    apiResponseMessage: '',
                    isLoading: false,
                    isApiSuccessful: true,
                  },
                })
              );
              // read data and update message
              return changePasswordSuccess({
                message: '',
              });
            })
          );
      })
    );
  });

  requestPasswordReset$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(requestPasswordReset),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIResponseMessage({
            apiResponseMessage: {
              apiResponseMessage: '',
              isLoading: true,
              isApiSuccessful: false,
            },
          })
        );

        return this.authService.forgotPassword(action.email).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIResponseMessage({
                apiResponseMessage: {
                  apiResponseMessage: '',
                  isLoading: false,
                  isApiSuccessful: true,
                },
              })
            );
            // read data and update message
            return requestPasswordResetSuccess({
              message: data.description,
            });
          })
        );
      })
    );
  });

  // resetPassword$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(passwordReset),
  //     switchMap((action) => {
  //       this.appStore.dispatch(
  //         setAPIResponseMessage({
  //           apiResponseMessage: {
  //             apiResponseMessage: '',
  //             isLoading: true,
  //             isApiSuccessful: false,
  //           },
  //         })
  //       );
  //       const { token, newPassword } = action.payload;
  //       return this.authService.passwordReset({ token, newPassword }).pipe(
  //         map((data) => {
  //           this.appStore.dispatch(
  //             setAPIResponseMessage({
  //               apiResponseMessage: {
  //                 apiResponseMessage: '',
  //                 isLoading: false,
  //                 isApiSuccessful: true,
  //               },
  //             })
  //           );
  //           // read data and update message
  //           return passwordResetSuccess({
  //             message: data.description,
  //           });
  //         })
  //       );
  //     })
  //   );
  // });

  // getBasicProfile$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(getUserProfile),
  //     switchMap(() => {
  //       this.appStore.dispatch(
  //         setAPIResponseMessage({
  //           apiResponseMessage: {
  //             apiResponseMessage: '',
  //             isLoading: true,
  //             isApiSuccessful: false,
  //           },
  //         })
  //       );

  //       return this.authService.getBasicProfile().pipe(
  //         map((data) => {
  //           this.appStore.dispatch(
  //             setAPIResponseMessage({
  //               apiResponseMessage: {
  //                 apiResponseMessage: '',
  //                 isLoading: false,
  //                 isApiSuccessful: true,
  //               },
  //             })
  //           );
  //           return getUserProfileSuccess({ user: data });
  //         })
  //       );
  //     })
  //   );
  // });
}
