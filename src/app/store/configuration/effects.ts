import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, from, map, mergeMap, switchMap, take } from 'rxjs';
import { AppResponseInterface } from 'src/app/types/appState.interface';
import { setAPIResponseMessage } from '../shared/app.action';
import {
  createDocumentType,
  createInstitutionBody,
  createInstitutionBodySuccess,
  createInstitutionRecord,
  createInstitutionRecordSuccess,
  createInstitutionSector,
  createInstitutionSectorSuccess,
  createInstitutionType,
  createInstitutionTypeSuccess,
  createOrganisationIndustry,
  createOrganisationIndustrySuccess,
  createOrganisationSector,
  createOrganisationSectorSuccess,
  createProcessingFeeDocumentType,
  createProcessingFeeDocumentTypeSuccess,
  getAllConfiguration,
  getAllConfigurationSuccess,
  getAllDocumentType,
  getAllDocumentTypeSuccess,
  getAllPaymentPlans,
  getAllPaymentPlansSuccess,
  getAllProcessingFee,
  getAllProcessingFeeSuccess,
  getInstitutionbody,
  getInstitutionbodySuccess,
  getInstitutionConfiguration,
  getInstitutionConfigurationSuccess,
  getInstitutionName,
  getInstitutionNameSuccess,
  getInstitutionSelector,
  getInstitutionSelectorSuccess,
  getInstitutiontype,
  getInstitutiontypeSuccess,
  getOrganisationIndustry,
  getOrganisationIndustrySuccess,
  getOrganisationSector,
  getOrganisationSectorSuccess,
  getSuccessMessage,
  sendProcessingFeeForApproval,
  sendProcessingFeeForApprovalSuccess,
  sendverificationFeeForApproval,
  sendverificationFeeForApprovalSuccess,
  updateInstitutionBody,
  updateInstitutionBodySuccess,
  updateInstitutionSector,
  updateInstitutionSectorSuccess,
  updateInstitutionType,
  updateInstitutionTypeSuccess,
  updateOrganisationIndustry,
  updateOrganisationIndustrySuccess,
  updateOrganisationSector,
  updateOrganisationSectorSuccess,
  updatePaymentPlans,
} from './action';
import { ConfigurationService } from 'src/app/core/services/configuration/configuration.service';

@Injectable()
export class ConfigurationEffects {
  constructor(
    private action$: Actions,
    private configurationService: ConfigurationService,
    private appStore: Store<AppResponseInterface>
  ) {}

  getConfiguration$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getAllConfiguration),
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
        getSuccessMessage({ message: '' });
        const { configurationStatus, keyword, filter, pageSize, pageIndex } =
          action;
        getAllConfigurationSuccess({ payload: { data: [], totalCount: 0 } });
        return this.configurationService
          .getAllConfiguration(
            configurationStatus,
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
              return getAllConfigurationSuccess({
                payload: data.payload
                  ? { data: data.payload, totalCount: data.totalCount }
                  : { data: [], totalCount: 0 },
              });
            })
          );
      })
    );
  });

  getAllDocumentType$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getAllDocumentType),
      switchMap(() => {
        this.appStore.dispatch(
          setAPIResponseMessage({
            apiResponseMessage: {
              apiResponseMessage: '',
              isLoading: true,
              isApiSuccessful: false,
            },
          })
        );
        getSuccessMessage({ message: '' });

        return this.configurationService.getAllProcessingDocument().pipe(
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
            return getAllDocumentTypeSuccess({
              payload: data.payload ? data.payload : [],
            });
          })
        );
      })
    );
  });

  // ;

  updatePaymentPlans$ = createEffect(() => {
    return this.action$.pipe(
      ofType(updatePaymentPlans),
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

        getSuccessMessage({ message: '' });
        return this.configurationService.updatePaymentPlans(payload).pipe(
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
            return getSuccessMessage({
              message: data.description,
            });
          })
        );
      })
    );
  });

  createDocumentType$ = createEffect(() => {
    return this.action$.pipe(
      ofType(createDocumentType),
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
        const { documentName, description, deliveryOptions } = action;

        getSuccessMessage({ message: '' });
        return this.configurationService
          .createProcessingDocument(documentName, description, deliveryOptions)
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
              return getSuccessMessage({
                message: data.description,
              });
            })
          );
      })
    );
  });

  getAllPaymentPlan$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getAllPaymentPlans),
      switchMap(() => {
        this.appStore.dispatch(
          setAPIResponseMessage({
            apiResponseMessage: {
              apiResponseMessage: '',
              isLoading: true,
              isApiSuccessful: false,
            },
          })
        );

        return this.configurationService.getAllPaymentPlans().pipe(
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
            return getAllPaymentPlansSuccess({
              payload: data.payload ? data.payload : [],
            });
          })
        );
      })
    );
  });

  getInstitutionSelector$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getInstitutionSelector),
      switchMap(() => {
        this.appStore.dispatch(
          setAPIResponseMessage({
            apiResponseMessage: {
              apiResponseMessage: '',
              isLoading: true,
              isApiSuccessful: false,
            },
          })
        );
        getSuccessMessage({ message: '' });

        return this.configurationService.getInstitutionSelector().pipe(
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
            return getInstitutionSelectorSuccess({
              payload: data.payload ? data.payload : [],
            });
          })
        );
      })
    );
  });

  getInstitutionType$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getInstitutiontype),
      switchMap(() => {
        this.appStore.dispatch(
          setAPIResponseMessage({
            apiResponseMessage: {
              apiResponseMessage: '',
              isLoading: true,
              isApiSuccessful: false,
            },
          })
        );
        getSuccessMessage({ message: '' });

        return this.configurationService.getInstitutionType().pipe(
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
            return getInstitutiontypeSuccess({
              payload: data.payload ? data.payload : [],
            });
          })
        );
      })
    );
  });

  getInstitutionBody$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getInstitutionbody),
      switchMap(() => {
        this.appStore.dispatch(
          setAPIResponseMessage({
            apiResponseMessage: {
              apiResponseMessage: '',
              isLoading: true,
              isApiSuccessful: false,
            },
          })
        );
        getSuccessMessage({ message: '' });

        return this.configurationService.getInstitutionBody().pipe(
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
            return getInstitutionbodySuccess({
              payload: data.payload ? data.payload : [],
            });
          })
        );
      })
    );
  });

  createInstitutionRecord$ = createEffect(() => {
    return this.action$.pipe(
      ofType(createInstitutionRecord),
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
        getSuccessMessage({ message: '' });
          const {payload } = action
        return this.configurationService.createInstitutionName(payload).pipe(
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
            return createInstitutionRecordSuccess({
              payload: data.payload ? data.payload : [],
            });
          })
        );
      })
    );
  });

  // updateInstitutionRecord$ = createEffect(() => {
  //   return this.action$.pipe(
  //     ofType(updateInstitutionType),
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
  //       getSuccessMessage({ message: '' });
  //         const {payload } = action
  //       return this.configurationService.updateInstitutionType(payload).pipe(
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
  //           // read data and update payload
  //           return updateInstitutionTypeSuccess({
  //             payload: data.description,
  //           });
  //         })
  //       );
  //     })
  //   );
  // });



  getInstitutionName$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getInstitutionName),
      switchMap(() => {
        this.appStore.dispatch(
          setAPIResponseMessage({
            apiResponseMessage: {
              apiResponseMessage: '',
              isLoading: true,
              isApiSuccessful: false,
            },
          })
        );
        getSuccessMessage({ message: '' });

        return this.configurationService.getInstitutionName().pipe(
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
            return getInstitutionNameSuccess({
              payload: data.payload ? data.payload : [],
            });
          })
        );
      })
    );
  });

  getOrganisationSector$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getOrganisationSector),
      switchMap(() => {
        this.appStore.dispatch(
          setAPIResponseMessage({
            apiResponseMessage: {
              apiResponseMessage: '',
              isLoading: true,
              isApiSuccessful: false,
            },
          })
        );
        getSuccessMessage({ message: '' });

        return this.configurationService.getOrganaisationSector().pipe(
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
            return getOrganisationSectorSuccess({
              payload: data.payload ? data.payload : [],
            });
          })
        );
      })
    );
  });

  getOrganisationIndustry$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getOrganisationIndustry),
      switchMap(() => {
        this.appStore.dispatch(
          setAPIResponseMessage({
            apiResponseMessage: {
              apiResponseMessage: '',
              isLoading: true,
              isApiSuccessful: false,
            },
          })
        );
        getSuccessMessage({ message: '' });

        return this.configurationService.getOrganaisationIndustry().pipe(
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
            return getOrganisationIndustrySuccess({
              payload: data.payload ? data.payload : [],
            });
          })
        );
      })
    );
  });

  createInstitutionType$ = createEffect(() => {
    return this.action$.pipe(
      ofType(createInstitutionType),
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
        getSuccessMessage({ message: '' });
          const {payload } = action
        return this.configurationService.createInstitutionType(payload).pipe(
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
            return createInstitutionTypeSuccess({
              payload: data.payload ? data.payload : [],
            });
          })
        );
      })
    );
  });

  updateInstitutionType$ = createEffect(() => {
    return this.action$.pipe(
      ofType(updateInstitutionType),
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
        getSuccessMessage({ message: '' });
          const {payload } = action
        return this.configurationService.updateInstitutionType(payload).pipe(
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
            return updateInstitutionTypeSuccess({
              payload: data.description,
            });
          })
        );
      })
    );
  });

  createInstitutionBody$ = createEffect(() => {
    return this.action$.pipe(
      ofType(createInstitutionBody),
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
        getSuccessMessage({ message: '' });
          const {payload } = action
        return this.configurationService.createInstitutionBody(payload).pipe(
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
            return createInstitutionBodySuccess({
              payload: data.description,
            });
          })
        );
      })
    );
  });

  updateInstitutionBody$ = createEffect(() => {
    return this.action$.pipe(
      ofType(updateInstitutionBody),
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
        getSuccessMessage({ message: '' });
          const {payload } = action
        return this.configurationService.updateInstitutionBody(payload).pipe(
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
            return updateInstitutionBodySuccess({
              payload: data.description,
            });
          })
        );
      })
    );
  });

  createInstitutionSector$ = createEffect(() => {
    return this.action$.pipe(
      ofType(createInstitutionSector),
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
        getSuccessMessage({ message: '' });
          const {payload } = action
        return this.configurationService.createInstitutionSector(payload).pipe(
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
            return createInstitutionSectorSuccess({
              payload: data.description,
            });
          })
        );
      })
    );
  });

  updateInstitutionSector$ = createEffect(() => {
    return this.action$.pipe(
      ofType(updateInstitutionSector),
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
        getSuccessMessage({ message: '' });
          const {payload } = action
        return this.configurationService.updateInstitutionSector(payload).pipe(
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
            return updateInstitutionSectorSuccess({
              payload: data.description,
            });
          })
        );
      })
    );
  });


  createOrganisationSector$ = createEffect(() => {
    return this.action$.pipe(
      ofType(createOrganisationSector),
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
        getSuccessMessage({ message: '' });
          const {payload } = action
        return this.configurationService.createOrganisationSector(payload).pipe(
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
            return createOrganisationSectorSuccess({
              payload: data.description,
            });
          })
        );
      })
    );
  });

  updateOrganisationSector$ = createEffect(() => {
    return this.action$.pipe(
      ofType(updateOrganisationSector),
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
        getSuccessMessage({ message: '' });
          const {payload } = action
        return this.configurationService.updateOrganisationSector(payload).pipe(
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
            return updateOrganisationSectorSuccess({
              payload: data.description,
            });
          })
        );
      })
    );
  });

  
  createOrganisationIndustry$ = createEffect(() => {
    return this.action$.pipe(
      ofType(createOrganisationIndustry),
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
        getSuccessMessage({ message: '' });
          const {payload } = action
        return this.configurationService.createOrganisationIndustry(payload).pipe(
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
            return createOrganisationIndustrySuccess({
              payload: data.description,
            });
          })
        );
      })
    );
  });

  updateOrganisationIndustry$ = createEffect(() => {
    return this.action$.pipe(
      ofType(updateOrganisationIndustry),
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
        getSuccessMessage({ message: '' });
          const {payload } = action
        return this.configurationService.updateOrganisationIndustry(payload).pipe(
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
            return updateOrganisationIndustrySuccess({
              payload: data.description,
            });
          })
        );
      })
    );
  });

  getInstitutionConfiguration$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getInstitutionConfiguration),
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
        getSuccessMessage({ message: '' });
          const {institutionId } = action
        return this.configurationService.getInstitutionConfiguration(institutionId).pipe(
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
            return getInstitutionConfigurationSuccess({
              payload: data.payload,
            });
          })
        );
      })
    );
  });

  getAllProcessingFee$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getAllProcessingFee),
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
        
        return this.configurationService.getAllProcessingDocument().pipe(
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
            return getAllProcessingFeeSuccess({
              payload: data.payload,
            });
          })
        );
      })
    );
  });

  createProcessingFeeDocumentType$ = createEffect(() => {
    return this.action$.pipe(
      ofType(createProcessingFeeDocumentType),
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
        
        return this.configurationService.createProcessingFeeDocumentType(action.institutionId, action.payload).pipe(
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
            return createProcessingFeeDocumentTypeSuccess({
              payload: data,
            });
          })
        );
      })
    );
  });

  sendProcessingFeeForApproval$ = createEffect(() => {
    return this.action$.pipe(
      ofType(sendProcessingFeeForApproval),
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
        
        return this.configurationService.sendProcessingFeeForApproval(action.institutionId, action.payload).pipe(
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
            return sendProcessingFeeForApprovalSuccess({
              payload: data,
            });
          })
        );
      })
    );
  });

  sendverificationFeeForApproval$ = createEffect(() => {
    return this.action$.pipe(
      ofType(sendverificationFeeForApproval),
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
        
        return this.configurationService.sendverificationFeeForApproval(action.institutionId, action.payload).pipe(
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
            return sendverificationFeeForApprovalSuccess({
              payload: data,
            });
          })
        );
      })
    );
  });

}
