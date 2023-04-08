import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, switchMap, take } from 'rxjs';
import { InstitutionService } from 'src/app/core/services/institution/institution.service';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { StorageService } from 'src/app/core/services/shared/storage.service';
import { AppResponseInterface } from 'src/app/types/appState.interface';
import { setAPIResponseMessage } from '../shared/app.action';
import { getNotification, getNotificationSuccess } from './action';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

@Injectable()
export class NotificationEffects {
  constructor(
    private actions$: Actions,
    private storage: StorageService,
    private appStore: Store<AppResponseInterface>,
    private notification: UtilityService,
    private institutionService: InstitutionService
  ) {}

  getInstitutions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getNotification),
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
        const {
          entityId,
          userType
        } = action;
        return this.notification.getNotification(entityId, userType)
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
              return getNotificationSuccess({
                payload: data.payload
              });
            })
          );
      })
    );
  });

}