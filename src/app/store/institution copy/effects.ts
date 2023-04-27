import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, switchMap, take } from 'rxjs';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { StorageService } from 'src/app/core/services/shared/storage.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { AppResponseInterface } from 'src/app/types/appState.interface';
import { setAPIResponseMessage } from '../shared/app.action';
import { contactUs, contactUsSuccess, invokeGetStateAndLGA, invokeGetStateAndLGASuccess } from './action';


@Injectable()
export class UtilityEffects {
  constructor(
    private action$: Actions,
    private storage: StorageService,
    private appStore: Store<AppResponseInterface>,
    private notification: NotificationsService,
    private utilityService: UtilityService
  ) {}

  getStateAndLGA$ = createEffect(() => {
    return this.action$.pipe(
      ofType(invokeGetStateAndLGA),
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
        const {   } =
          action;
        return this.utilityService.getLocalGovernment()
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
              // read data and update payload
              return invokeGetStateAndLGASuccess({
               payload: data.payload
              });
            })
          );
      })
    );
  });

  contactUs$ = createEffect(() => {
    return this.action$.pipe(
      ofType(contactUs),
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
        const { payload } =
          action;
        return this.utilityService.contactUs(payload)
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
              // read data and update payload
              return contactUsSuccess({
               payload: data
              });
            })
          );
      })
    );
  });
}
