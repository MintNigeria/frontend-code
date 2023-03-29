import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, switchMap, take } from 'rxjs';
import { GraduatesService } from 'src/app/core/services/graduates/graduates.service';
import { UploadsService } from 'src/app/core/services/uploads/uploads.service';
import { AppResponseInterface } from 'src/app/types/appState.interface';
import { setAPIResponseMessage } from '../shared/app.action';
import { approvePendingGraduate, approveRejectPendingGraduateSuccess, createGraduateRecord, createGraduateRecordSuccess, downloadCSV, downloadCSVSuccess, downloadExcel, downloadExcelSuccess, downloadRecordUploadFormat, downloadRecordUploadFormatSuccess, getAllGraduateRequestDetailForGradaute, getAllGraduateRequestDetailForGradauteSuccess, getAllGraduateRequestForGradaute, getAllGraduateRequestForGradauteSuccess, getAllInstitutionUpload, getAllInstitutionUploadSuccess, invokeGetAllGraduates, invokeGetAllGraduatesSuccess, invokeGetAllPendingGraduates, invokeGetAllPendingGraduatesSuccess, invokeGetGraduateDetails, invokeGetGraduateDetailsSuccess, rejectPendingGraduate, uploadGraduateRecord, uploadGraduateRecordSuccess } from './action';

@Injectable()
export class GraduatesEffects {
  constructor(
    private actions$: Actions,
    private graduateService : GraduatesService,
    private uploadService : UploadsService,
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

  getAllInstitutionUpload$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllInstitutionUpload),
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
        return this.uploadService.getAllInstitutionUploads(
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
              return getAllInstitutionUploadSuccess({
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

  downloadRecordUploadFormat$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(downloadRecordUploadFormat),
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
        
        return this.graduateService
          .downloadRecordUploadFormat(action.payload)
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
              return downloadRecordUploadFormatSuccess({
                payload: data.payload
                  
              });
            })
          );
      })
    );
  });

  uploadGraduateRecord$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(uploadGraduateRecord),
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
        
        return this.graduateService
          .uploadGraduateRecord(action.payload)
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
              return uploadGraduateRecordSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });

  createGraduateRecord$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createGraduateRecord),
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
        
        return this.graduateService
          .createGraduateRecord(action.payload)
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
              return createGraduateRecordSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });

  getAllGraduateRequestForGradaute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllGraduateRequestForGradaute),
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
        
        return this.graduateService
          .getAllGraduateRequestForGradaute(action.payload)
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
              return getAllGraduateRequestForGradauteSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });

  getAllGraduateRequestDetailForGradaute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllGraduateRequestDetailForGradaute),
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
        
        return this.graduateService
          .getAllGraduateRequestDetailForGradaute(action.requestId)
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
              return getAllGraduateRequestDetailForGradauteSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });
}
