import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, switchMap, take } from 'rxjs';
import { GraduatesService } from 'src/app/core/services/graduates/graduates.service';
import { AppResponseInterface } from 'src/app/types/appState.interface';
import { setAPIResponseMessage } from '../shared/app.action';
import { approvePendingGraduate, approveRejectPendingGraduateSuccess, downloadCSV, downloadCSVSuccess, downloadExcel, downloadExcelSuccess, invokeGetAllGraduates, invokeGetAllGraduatesSuccess, invokeGetAllPendingGraduates, invokeGetAllPendingGraduatesSuccess, invokeGetGraduateDetails, invokeGetGraduateDetailsSuccess, rejectPendingGraduate } from './action';

@Injectable()
export class GraduatesEffects {
  constructor(
    private actions$: Actions,
    private graduateService : GraduatesService,
    private appStore: Store<AppResponseInterface>
  ) {}



  getGraduates$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeGetAllGraduates),
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
        
        return this.graduateService.getAllInstitutionGraduates(
            action.institutionId, action.payload
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
              return invokeGetAllGraduatesSuccess({
                payload: { data: data.payload, totalCount: data.totalCount }
              });
            })
          );
      })
    );
  });
  getPendingGraduates$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeGetAllPendingGraduates),
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
        const { keyword, filter, sort, pageIndex, pageSize } =
          action;
        return this.graduateService.getAllPendingGraduates(
            keyword,
            filter,
            sort,
            pageIndex,
            pageSize,
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
              return invokeGetAllPendingGraduatesSuccess({
                payload: { data: data.payload, totalCount: data.totalCount }
              });
            })
          );
      })
    );
  });

  getGraduateDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeGetGraduateDetails),
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
        const { graduateId, institutionId } =
          action;
        return this.graduateService.getGraduateById(
            graduateId, institutionId
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
              return invokeGetGraduateDetailsSuccess({
                payload: data.payload
              });
            })
          );
      })
    );
  });

  approvePendingGraduate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(approvePendingGraduate),
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
        approveRejectPendingGraduateSuccess({ message: '' });

        return this.graduateService.approveGraduateRequest(
            action.payload
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
              return approveRejectPendingGraduateSuccess({
                message: data.description
              });
            })
          );
      })
    );
  });

  

  downloadCSV$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(downloadCSV),
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
        const {payload } =
          action;
        return this.graduateService.downloadCSV(
            payload
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
              return downloadCSVSuccess({
                payload: data.payload
              });
            })
          );
      })
    );
  });

  downloadExcel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(downloadExcel),
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
        const {payload } =
          action;
        return this.graduateService.downloadExcel(
            payload
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
              return downloadExcelSuccess({
                payload: data.payload
              });
            })
          );
      })
    );
  });
}
