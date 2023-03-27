import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, from, map, mergeMap, switchMap, take } from 'rxjs';
import { RequestService } from 'src/app/core/services/request/request.service';
import { AppResponseInterface } from 'src/app/types/appState.interface';
import { setAPIResponseMessage } from '../shared/app.action';
import { getAllInstitutionGraduateRequest, getAllInstitutionGraduateRequestSuccess, getAllInstitutionOrganizationRequest, getAllInstitutionOrganizationRequestSuccess, getAllOrganisationRequest, getAllOrganisationRequestSuccess, getAllRequest, getAllRequestSuccess, invokeGetRequestDetails, invokeGetRequestDetailsSuccess, updateInstitutionRequest, updateInstitutionRequestSuccess } from './action';

@Injectable()
export class RequestEffects {
  constructor(
    private action$: Actions,
    private requestService: RequestService,
    private appStore: Store<AppResponseInterface>
  ) {}

  getRequests$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getAllRequest),
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
          institutionType ,
          documentType ,
          selector ,
          status,
          StartDate ,
          EndDate ,
          keyword, 
          filter, 
          pageSize, 
          pageIndex } = action;
        return this.requestService
          .getAllRequest(
            institutionType ,
            documentType ,
            selector ,
            status,
            StartDate ,
            EndDate ,
            keyword,
            filter,
            pageSize,
            pageIndex
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
              return getAllRequestSuccess({
                payload: { data: data.payload, totalCount: data.totalCount }
              });
            })
          );
      })
    );
  });

  getAllInstitutionGraduateRequest$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getAllInstitutionGraduateRequest),
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
          payload } = action;
        return this.requestService
          .getAllInstitutionGraduateRequest(
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
              return getAllInstitutionGraduateRequestSuccess({
                payload: { data: data.payload, totalCount: data.totalCount }
              });
            })
          );
      })
    );
  });

  getAllInstitutionOrganizationRequest$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getAllInstitutionOrganizationRequest),
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
          payload } = action;
        return this.requestService
          .getAllInstitutionOrganizationRequest(
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
              return getAllInstitutionOrganizationRequestSuccess({
                payload: { data: data.payload, totalCount: data.totalCount }
              });
            })
          );
      })
    );
  });

  updateInstitutionRequest$ = createEffect(() => {
    return this.action$.pipe(
      ofType(updateInstitutionRequest),
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
          payload } = action;
        return this.requestService
          .updateInstitutionRequest(
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
              return updateInstitutionRequestSuccess({
                payload: data.payload
              });
            })
          );
      })
    );
  });

  
  getOrganisationRequests$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getAllOrganisationRequest),
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
          range,
          organisationIndustry,
          organisationSelector,
          documentType,
          status,
          StartDate ,
          EndDate ,
          keyword,
          filter,
          pageSize,
          pageIndex, } = action;
        return this.requestService
          .getAllOrganisationRequest(
            range,
            organisationIndustry,
            organisationSelector,
            documentType,
            status,
            StartDate ,
            EndDate ,
            keyword,
            filter,
            pageSize,
            pageIndex,
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
              return getAllOrganisationRequestSuccess({
                payload: { data: data.payload, totalCount: data.totalCount }
              });
            })
          );
      })
    );
  });

  getGraduateDetails$ = createEffect(() => {
    return this.action$.pipe(
      ofType(invokeGetRequestDetails),
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
        const { id } =
          action;
        return this.requestService.getRequestDetailsByRequestId(
            id
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
              return invokeGetRequestDetailsSuccess({
                payload: data.payload
              });
            })
          );
      })
    );
  });
}
