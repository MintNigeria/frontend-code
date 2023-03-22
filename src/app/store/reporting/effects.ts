import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, switchMap, take } from 'rxjs';
import { ReportingService } from 'src/app/core/services/reporting/reporting.service';
import { AppResponseInterface } from 'src/app/types/appState.interface';
import { setAPIResponseMessage } from '../shared/app.action';
import {
  invokeGetAllReport,
  invokeGetAllReportSuccess,
  invokeGetTransactions,
  invokeGetTransactionsSuccess,
} from './action';

@Injectable()
export class ReportingEffects {
  constructor(
    private actions$: Actions,
    private reportingService: ReportingService,
    private appStore: Store<AppResponseInterface>
  ) {}

  getReporting$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeGetAllReport),
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
        const { keyword, filter, pageIndex, pageSize } = action;
        return this.reportingService
          .getAllReports(keyword, filter, pageSize, pageIndex)
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
              return invokeGetAllReportSuccess({
                payload: { data: data.payload, totalCount: data.totalCount },
              });
            })
          );
      })
    );
  });

  invokeGetTransactions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeGetTransactions),
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
        
        return this.reportingService
          .getInstitutionTransactions(action.institutionId, action.payload)
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
              return invokeGetTransactionsSuccess({
                payload: {data: data.payload, totalCount: data.totalCount},
              });
            })
          );
      })
    );
  });
}
