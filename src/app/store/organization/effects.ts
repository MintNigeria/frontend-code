import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, from, map, mergeMap, switchMap, take } from 'rxjs';
import { OrganizationService } from 'src/app/core/services/organization/organization.service';
import { WalletService } from 'src/app/core/services/wallet/wallet.service';
import { AppResponseInterface } from 'src/app/types/appState.interface';
import { setAPIResponseMessage } from '../shared/app.action';
import {
  approveOrganizationRequest,
  approveOrganizationRequestSuccess,
  declineOrganizationRequest,
  declineOrganizationRequestSuccess,
  downloadOrganizationCSV,
  downloadOrganizationCSVSuccess,
  downloadOrganizationExcel,
  downloadOrganizationExcelSuccess,
  fundOrganizationWallet,
  fundOrganizationWalletSuccess,
  getAllOrganization,
  getAllOrganizationSuccess,
  getAllPendingOrganization,
  getOrganizationSubscriptionHistory,
  getOrganizationSubscriptionHistorySuccess,
  getOrganizationVerificationHistory,
  getOrganizationVerificationHistoryData,
  getOrganizationVerificationHistoryDataSuccess,
  getOrganizationVerificationHistorySuccess,
  getOrganizationWalletId,
  getOrganizationWalletIdSuccess,
  invokeGetOrganization,
  invokeGetOrganizationSuccess,
  invokeGetOrganizationTransactionDetails,
  invokeGetOrganizationTransactionDetailsSuccess,
  invokeOrganizationTransactions,
  invokeOrganizationTransactionsSuccess,
  makePayment,
  makePaymentSuccess,
  organizationProfile,
  organizationProfileSuccess,
  organizationSectorAndIndustry,
  organizationSectorAndIndustrySuccess,
  reasonForRequest,
  reasonForRequestSuccess,
  registerOrganization,
  registerOrganizationSuccess,
  validateOrganizationCode,
  validateOrganizationCodeSuccess,
  validateOrganizationFundWallet,
  verifyGraduateRecord,
  verifyGraduateRecordSuccess,
  verifyHistoryInstitutionDropdown,
  verifyHistoryInstitutionDropdownSuccess,
} from './action';

@Injectable()
export class OrganizationEffects {
  constructor(
    private action$: Actions,
    private organizationService: OrganizationService,
    private walletService: WalletService,
    private appStore: Store<AppResponseInterface>
  ) {}
  // ;

  registerOrganization$ = createEffect(() => {
    return this.action$.pipe(
      ofType(registerOrganization),
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
        
        const { payload } = action;
        return this.organizationService
          .registerOrganization(payload)
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

              return registerOrganizationSuccess({
                payload: data,
              });
            })
          );
      })
    );
  });

  validateOrganizationCode$ = createEffect(() => {
    return this.action$.pipe(
      ofType(validateOrganizationCode),
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
        
        const { payload } = action;
        return this.organizationService
          .validateOrganizationCode(payload)
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

              return validateOrganizationCodeSuccess({
                payload: data,
              });
            })
          );
      })
    );
  });

  getOrganizationWalletId$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getOrganizationWalletId),
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
        return this.walletService
          .getOrganizationWalletId(id)
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

              return getOrganizationWalletIdSuccess({
                payload: data.payload,
              });
            })
          );
      })
    );
  });

  fundOrganizationWallet$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fundOrganizationWallet),
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
        
        const { payload } = action;
        return this.walletService
          .fundOrganizationWallet(payload)
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

              return fundOrganizationWalletSuccess({
                payload: data,
              });
            })
          );
      })
    );
  });

  validateOrganizationFundWallet$ = createEffect(() => {
    return this.action$.pipe(
      ofType(validateOrganizationFundWallet),
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
        
        const { payload } = action;
        return this.walletService
          .validateOrganizationFundWallet(payload)
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

              return fundOrganizationWalletSuccess({
                payload: data,
              });
            })
          );
      })
    );
  });

  getOrganizationSubscriptionHistory$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getOrganizationSubscriptionHistory),
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
        
        const { payload } = action;
        return this.organizationService
          .getOrganizationSubscriptionHistory(payload)
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

              return getOrganizationSubscriptionHistorySuccess({
                payload: data,
              });
            })
          );
      })
    );
  });

  getOrganizationVerificationHistory$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getOrganizationVerificationHistory),
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
        
        const { payload } = action;
        return this.organizationService
          .getOrganizationVerificationHistory(payload)
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

              return getOrganizationVerificationHistorySuccess({
                payload: data,
              });
            })
          );
      })
    );
  });

  getOrganizationVerificationHistoryData$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getOrganizationVerificationHistoryData),
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
        return this.organizationService
          .getOrganizationVerificationHistoryData(id)
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

              return getOrganizationVerificationHistoryDataSuccess({
                payload: data,
              });
            })
          );
      })
    );
  });

  verifyGraduateRecord$ = createEffect(() => {
    return this.action$.pipe(
      ofType(verifyGraduateRecord),
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
        
        const { payload } = action;
        return this.organizationService
          .verifyGraduateRecord(payload)
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

              return verifyGraduateRecordSuccess({
                payload: data,
              });
            })
          );
      })
    );
  });

  verifyHistoryInstitutionDropdown$ = createEffect(() => {
    return this.action$.pipe(
      ofType(verifyHistoryInstitutionDropdown),
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
        return this.organizationService
          .verifyHistoryInstitutionDropdown(id)
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

              return verifyHistoryInstitutionDropdownSuccess({
                payload: data,
              });
            })
          );
      })
    );
  });

  organizationProfile$ = createEffect(() => {
    return this.action$.pipe(
      ofType(organizationProfile),
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
        return this.organizationService
          .organizationProfile(id)
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

              return organizationProfileSuccess({
                payload: data,
              });
            })
          );
      })
    );
  });

  organizationSectorAndIndustry$ = createEffect(() => {
    return this.action$.pipe(
      ofType(organizationSectorAndIndustry),
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
        return this.organizationService
          .organizationSectorAndIndustry(id)
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

              return organizationSectorAndIndustrySuccess({
                payload: data.payload,
              });
            })
          );
      })
    );
  });

  reasonForRequest$ = createEffect(() => {
    return this.action$.pipe(
      ofType(reasonForRequest),
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
        
        return this.organizationService
          .reasonForRequest()
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

              return reasonForRequestSuccess({
                payload: data.payload,
              });
            })
          );
      })
    );
  });

  makePayment$ = createEffect(() => {
    return this.action$.pipe(
      ofType(makePayment),
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
        return this.walletService
          .makePayment(payload)
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

              return makePaymentSuccess({
                payload: data,
              });
            })
          );
      })
    );
  });


  getOrganizationsTransaction$ = createEffect(() => {
    return this.action$.pipe(
      ofType(invokeOrganizationTransactions),
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
        invokeOrganizationTransactionsSuccess({
          payload: null,
        });
        const { id, keyword, filter, pageSize, pageIndex } = action;
        return this.organizationService
          .getOrganizationTransaction(id, keyword, filter, pageSize, pageIndex)
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

              return invokeOrganizationTransactionsSuccess({
                payload: data.payload,
              });
            })
          );
      })
    );
  });

  getOrganizations$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getAllOrganization),
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
        getAllOrganizationSuccess({ payload: { data: [], totalCount: 0 } });
        const { organizationStatus, keyword, filter, pageSize, pageIndex } =
          action;
        return this.organizationService
          .getAllOrganization(
            organizationStatus,
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
              return getAllOrganizationSuccess({
                payload: data.payload
                  ? { data: data.payload, totalCount: data.totalCount }
                  : { data: [], totalCount: 0 },
              });
            })
          );
      })
    );
  });

  getSingleOrganization$ = createEffect(() => {
    return this.action$.pipe(
      ofType(invokeGetOrganization),
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
        invokeGetOrganizationSuccess({ payload: null });
        const { id } = action;
        return this.organizationService.getSingleOrganization(id).pipe(
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
            return invokeGetOrganizationSuccess({
              payload: data.payload,
            });
          })
        );
      })
    );
  });

  getSingleOrganizationTransactionDetails$ = createEffect(() => {
    return this.action$.pipe(
      ofType(invokeGetOrganizationTransactionDetails),
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
        invokeGetOrganizationTransactionDetailsSuccess({ payload: null });
        const { id } = action;
        return this.organizationService
          .getSingleOrganizationTransactionDetails(id)
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
              return invokeGetOrganizationTransactionDetailsSuccess({
                payload: data.payload,
              });
            })
          );
      })
    );
  });

  getAllPendingOrganization$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getAllPendingOrganization),
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
        getAllOrganizationSuccess({ payload: { data: [], totalCount: 0 } });
        const { keyword, filter, pageSize, pageIndex } = action;
        return this.organizationService
          .getAllPendingOrganizations(keyword, filter, pageSize, pageIndex)
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
              return getAllOrganizationSuccess({
                payload: data.payload
                  ? { data: data.payload, totalCount: data.totalCount }
                  : { data: [], totalCount: 0 },
              });
            })
          );
      })
    );
  });

  approveOrganizationRequest$ = createEffect(() => {
    return this.action$.pipe(
      ofType(approveOrganizationRequest),
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
        approveOrganizationRequestSuccess({ message: '' });
        const { payload } = action;
        return this.organizationService
          .approvePendingOrganizationRequest(payload)
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
              return approveOrganizationRequestSuccess({
                message: data.description,
              });
            })
          );
      })
    );
  });

  declineOrganizationRequest$ = createEffect(() => {
    return this.action$.pipe(
      ofType(declineOrganizationRequest),
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
        approveOrganizationRequestSuccess({ message: '' });
        const { payload } = action;
        return this.organizationService
          .declinePendingOrganizationRequest(payload)
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
              return declineOrganizationRequestSuccess({
                message: data.description,
              });
            })
          );
      })
    );
  });


  // exportOrganizationAsCSV$ = createEffect(() => {
  //   return this.action$.pipe(
  //     ofType(downloadOrganizationCSV),
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
  //       const { payload } =
  //         action;
  //       return this.organizationService.downloadOrganizationCSV(
  //         payload
  //         )
  //         .pipe(
  //           map((data) => {
  //             this.appStore.dispatch(
  //               setAPIResponseMessage({
  //                 apiResponseMessage: {
  //                   apiResponseMessage: '',
  //                   isLoading: false,
  //                   isApiSuccessful: true,
  //                 },
  //               })
  //             );
  //             // read data and update payload
  //             return downloadOrganizationCSVSuccess({
  //               payload:  data.payload               
  //             });
  //           })
  //         );
  //     })
  //   );
  // });

  // exportOrganizationAsExcel$ = createEffect(() => {
  //   return this.action$.pipe(
  //     ofType(downloadOrganizationExcel),
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
  //       const { payload } =
  //         action;
  //       return this.organizationService.downloadOrganizationExcel(
  //         payload
  //         )
  //         .pipe(
  //           map((data) => {
  //             this.appStore.dispatch(
  //               setAPIResponseMessage({
  //                 apiResponseMessage: {
  //                   apiResponseMessage: '',
  //                   isLoading: false,
  //                   isApiSuccessful: true,
  //                 },
  //               })
  //             );
  //             // read data and update payload
  //             return downloadOrganizationExcelSuccess({
  //               payload:  data.payload               
  //             });
  //           })
  //         );
  //     })
  //   );
  // });

}
