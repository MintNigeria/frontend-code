import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, switchMap, take } from 'rxjs';
import { InstitutionService } from 'src/app/core/services/institution/institution.service';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { StorageService } from 'src/app/core/services/shared/storage.service';
import { AppResponseInterface } from 'src/app/types/appState.interface';
import { setAPIResponseMessage } from '../shared/app.action';

import {
  invokeGetInstitutions,
  invokeGetInstitution,
  invokeGetInstitutionsSuccess,
  invokeGetInstitutionSuccess,
  approveRejectInstitution,
  approveRejectInstitutionSuccess,
  getAllInstitutionUsers,
  getAllInstitutionUsersSuccess,
  getAllAdminInstitutionTransaction,
  getAllAdminInstitutionTransactionSuccess,
  getInstitutionTypeSuccess,
  getInstitutionTypes,
  getInstitutionSector,
  getInstitutionSectorSuccess,
  getInstitutionBody,
  getInstitutionBodySuccess,
  createNewInstitution,
  createNewInstitutionSuccess,
  ValidateRegistrationCode,
  ValidateRegistrationCodeSuccess,
} from './action';

@Injectable()
export class InstitutionEffects {
  constructor(
    private actions$: Actions,
    private storage: StorageService,
    private appStore: Store<AppResponseInterface>,
    private notification: NotificationsService,
    private institutionService: InstitutionService
  ) {}



  getSingleInstitution$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeGetInstitution),
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
        const { id } = action;
        return this.institutionService.getSingleInstitution(id).pipe(
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
            return invokeGetInstitutionSuccess({
              payload: data.payload,
            });
          })
        );
      })
    );
  });

 

  getAllInstitutionUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllInstitutionUsers),
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
          institutionId,
          keyword,
          filter,
          pageIndex,
          pageSize,
        } = action;
        getAllInstitutionUsersSuccess({
          payload: { data: [], totalCount: 0 },
        });
        return this.institutionService
          .getAllInstitutionUsers(
            institutionId,
            keyword,
            filter,
            pageIndex,
            pageSize
          )
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
              return getAllInstitutionUsersSuccess({
                payload: {data: data.payload, totalCount: data.totalCount}
                  
              });
            })
          );
      })
    );
  });


 

  getAllInstitutionType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getInstitutionTypes),
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
        
        return this.institutionService
          .getAllInstitutionType()
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
              return getInstitutionTypeSuccess({
                payload: {data: data.payload, totalCount: data.totalCount}
                  
              });
            })
          );
      })
    );
  });

  getAllInstitutionSector$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getInstitutionSector),
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
        
        return this.institutionService
          .getAllInstitutionSector()
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
              return getInstitutionSectorSuccess({
                payload: {data: data.payload, totalCount: data.totalCount}
                  
              });
            })
          );
      })
    );
  });

  getAllInstitutionBodu$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getInstitutionBody),
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
        
        return this.institutionService
          .getAllInstitutionBody()
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
              return getInstitutionBodySuccess({
                payload: {data: data.payload, totalCount: data.totalCount}
                  
              });
            })
          );
      })
    );
  });

  createNewInstitution$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createNewInstitution),
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
        
        return this.institutionService.RegisterInstitution(action.payload)
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
              return createNewInstitutionSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });

  ValidateOTP$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ValidateRegistrationCode),
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
        
        return this.institutionService.ValidateRegistrationCode(action.payload)
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
              return ValidateRegistrationCodeSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });
}
