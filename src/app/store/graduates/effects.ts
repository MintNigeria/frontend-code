import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, switchMap, take } from 'rxjs';
import { GraduatesService } from 'src/app/core/services/graduates/graduates.service';
import { UploadsService } from 'src/app/core/services/uploads/uploads.service';
import { WalletService } from 'src/app/core/services/wallet/wallet.service';
import { AppResponseInterface } from 'src/app/types/appState.interface';
import { setAPIResponseMessage } from '../shared/app.action';
import { approvePendingGraduate, approveRejectPendingGraduateSuccess, createGraduateApplication, createGraduateApplicationSuccess, createGraduateRecord, createGraduateRecordSuccess, deleteHubItem, deleteHubItemSuccess, downloadCSV, downloadCSVSuccess, downloadExcel, downloadExcelSuccess, downloadRecordUploadFormat, downloadRecordUploadFormatSuccess, exportGraduateApplicationAsExcel, exportGraduateApplicationAsExcelSuccess, exportGraduateApplicationCSV, exportGraduateApplicationCSVSuccess, exportGraduateTransactionAsCSV, exportGraduateTransactionAsCSVSuccess, exportGraduateTransactionAsExcel, exportGraduateTransactionAsExcelSuccess, exportGraduateVerificationAsExcel, exportGraduateVerificationAsExcelSuccess, exportGraduateVerificationCSV, exportGraduateVerificationCSVSuccess, fundGraduateWallet, fundGraduateWalletSuccess, getActiveDeliveryOptions, getActiveDeliveryOptionsSuccess, getAllGraduateRequestDetailForGradaute, getAllGraduateRequestDetailForGradauteSuccess, getAllGraduateRequestForGradaute, getAllGraduateRequestForGradauteSuccess, getAllHubItem, getAllHubItemSuccess, getAllInstitutionUpload, getAllInstitutionUploadSuccess, getGraduateCertificateVerificationDetail, getGraduateCertificateVerificationDetailSuccess, getGraduateCertificateVerifications, getGraduateCertificateVerificationsSuccess, getGraduateInstitutions, getGraduateInstitutionsSuccess, getGraduateProfile, getGraduateProfileSuccess, getGraduateTransactionHistory, getGraduateTransactionHistorySuccess, getGraduateWalletId, getGraduateWalletIdSuccess, getMyInstitutionNotified, getMyInstitutionNotifiedSuccess, graduateDocumentTypeFilter, graduateDocumentTypeFilterSuccess, graduateTransactionTypeFilter, graduateTransactionTypeFilterSuccess, invokeGetAllGraduates, invokeGetAllGraduatesSuccess, invokeGetAllPendingGraduates, invokeGetAllPendingGraduatesSuccess, invokeGetGraduateDetails, invokeGetGraduateDetailsSuccess, notifyMyInstitution, notifyMyInstitutionSuccess, registerNewGraduate, registerNewGraduateSuccess, rejectPendingGraduate, searchGraduateRecords, searchGraduateRecordsSuccess, submitGraduateVerificationRequest, submitGraduateVerificationRequestSuccess, submitVerificationReasonForRequest, submitVerificationReasonForRequestSuccess, updateGraduateInstitutions, updateGraduateInstitutionsSuccess, updateGraduateProfile, updateGraduateProfileSuccess, uploadGraduateRecord, uploadGraduateRecordSuccess, uploadHubItem, uploadHubItemSuccess, validateGraduateRegistration, validateGraduateRegistrationSuccess } from './action';

@Injectable()
export class GraduatesEffects {
  constructor(
    private actions$: Actions,
    private graduateService : GraduatesService,
    private walletService: WalletService,
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

  getGraduateWalletId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getGraduateWalletId),
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
        
        return this.walletService
          .getGraduateWalletId()
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
              return getGraduateWalletIdSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });

  getGraduateTransactionHistory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getGraduateTransactionHistory),
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
          .getGraduateTransactionHistory(action.payload)
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
              return getGraduateTransactionHistorySuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });

  registerNewGraduate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registerNewGraduate),
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
          .registerNewGraduate(action.payload)
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
              return registerNewGraduateSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });

  validateGraduateRegistration$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(validateGraduateRegistration),
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
          .validateGraduateRegistration(action.payload)
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
              return validateGraduateRegistrationSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });

  fundGraduateWallet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fundGraduateWallet),
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
        
        return this.walletService
          .fundGraduateWallet(action.payload)
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
              return fundGraduateWalletSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });

  getAllHubItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllHubItem),
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
          .getAllHubItem(action.payload)
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
              return getAllHubItemSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });

  uploadHubItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(uploadHubItem),
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
          .uploadHubItem(action.payload)
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
              return uploadHubItemSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });

  notifyMyInstitution$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(notifyMyInstitution),
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
          .notifyMyInstitution(action.payload)
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
              return notifyMyInstitutionSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });

  getMyInstitutionNotified$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getMyInstitutionNotified),
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
          .getMyInstitutionNotified(action.id)
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
              return getMyInstitutionNotifiedSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });

  getGraduateInstitutions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getGraduateInstitutions),
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
          .getGraduateInstitutions(action.id)
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
              return getGraduateInstitutionsSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });

  getGraduateProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getGraduateProfile),
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
          .getGraduateProfile(action.id)
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
              return getGraduateProfileSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });

  updateGraduateInstitutions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateGraduateInstitutions),
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
        const {payload, id} = action
        return this.graduateService
          .updateGraduateInstitutions(payload, id)
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
              return updateGraduateInstitutionsSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });

  updateGraduateProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateGraduateProfile),
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
        const {payload} = action
        return this.graduateService
          .updateGraduateProfile(payload)
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
              return updateGraduateProfileSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });

  getGraduateCertificateVerifications$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getGraduateCertificateVerifications),
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
        const {payload} = action
        return this.graduateService
          .getGraduateCertificateVerifications(payload)
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
              return getGraduateCertificateVerificationsSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });


  deleteHubItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteHubItem),
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
        const {payload} = action
        return this.graduateService
          .deleteHubItem(payload)
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
              return deleteHubItemSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });

  searchGraduateRecords$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchGraduateRecords),
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
        const {payload} = action
        return this.graduateService
          .searchGraduateRecords(payload)
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
              return searchGraduateRecordsSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });

  submitGraduateVerificationRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(submitGraduateVerificationRequest),
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
        const {payload} = action
        return this.graduateService
          .submitGraduateVerificationRequest(payload)
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
              return submitGraduateVerificationRequestSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });

  getGraduateCertificateVerificationDetail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getGraduateCertificateVerificationDetail),
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
        const {id} = action
        return this.graduateService
          .getGraduateCertificateVerificationDetail(id)
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
              return getGraduateCertificateVerificationDetailSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });

  exportGraduateApplicationAsExcel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(exportGraduateApplicationAsExcel),
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
        const {payload} = action
        return this.graduateService
          .exportGraduateApplicationAsExcel(payload)
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
              return exportGraduateApplicationAsExcelSuccess({
                payload: data.payload
                  
              });
            })
          );
      })
    );
  });

  exportGraduateApplicationCSV$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(exportGraduateApplicationCSV),
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
        const {payload} = action
        return this.graduateService
          .exportGraduateApplicationCSV(payload)
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
              return exportGraduateApplicationCSVSuccess({
                payload: data.payload
                  
              });
            })
          );
      })
    );
  });

  exportGraduateVerificationAsExcel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(exportGraduateVerificationAsExcel),
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
        const {payload} = action
        return this.graduateService
          .exportGraduateVerificationAsExcel(payload)
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
              return exportGraduateVerificationAsExcelSuccess({
                payload: data.payload
                  
              });
            })
          );
      })
    );
  });

  exportGraduateVerificationCSV$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(exportGraduateVerificationCSV),
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
        const {payload} = action
        return this.graduateService
          .exportGraduateVerificationCSV(payload)
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
              return exportGraduateVerificationCSVSuccess({
                payload: data.payload
                  
              });
            })
          );
      })
    );
  });

  exportGraduateTransactionAsExcel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(exportGraduateTransactionAsExcel),
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
        const {payload} = action
        return this.graduateService
          .exportGraduateTransactionAsExcel(payload)
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
              return exportGraduateTransactionAsExcelSuccess({
                payload: data.payload
                  
              });
            })
          );
      })
    );
  });

  exportGraduateTransactionAsCSV$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(exportGraduateTransactionAsCSV),
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
        const {payload} = action
        return this.graduateService
          .exportGraduateTransactionAsCSV(payload)
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
              return exportGraduateTransactionAsCSVSuccess({
                payload: data.payload
                  
              });
            })
          );
      })
    );
  });

  graduateTransactionTypeFilter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(graduateTransactionTypeFilter),
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
          .graduateTransactionTypeFilter()
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
              return graduateTransactionTypeFilterSuccess({
                payload: data.payload
                  
              });
            })
          );
      })
    );
  });

  graduateDocumentTypeFilter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(graduateDocumentTypeFilter),
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
          .graduateDocumentTypeFilter(action.id)
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
              return graduateDocumentTypeFilterSuccess({
                payload: data.payload
                  
              });
            })
          );
      })
    );
  });

  submitVerificationReasonForRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(submitVerificationReasonForRequest),
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
          .submitVerificationReasonForRequest(action.payload)
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
              return submitVerificationReasonForRequestSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });

  getActiveDeliveryOptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getActiveDeliveryOptions),
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
          .getActiveDeliveryOptions(action.id)
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
              return getActiveDeliveryOptionsSuccess({
                payload: data.payload
                  
              });
            })
          );
      })
    );
  });

  createGraduateApplication$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createGraduateApplication),
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
          .createGraduateApplication(action.payload)
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
              return createGraduateApplicationSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });


}
