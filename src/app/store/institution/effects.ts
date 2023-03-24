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
  getInstitutionConfiguration,
  getInstitutionConfigurationSuccess,
  getALlFacultiesInInstitutionSuccess,
  getALlFacultiesInInstitution,
  getALlDepartmentInInstitutionSuccess,
  getALlDepartmentInInstitution,
  getAllInstitutionRecords,
  getAllInstitutionRecordsSuccess,
  getAllInstitutionDegreeType,
  getAllInstitutionDegreeTypeSuccess,
  createDegreeTypeInInstitution,
  createDegreeTypeInInstitutionSuccess,
  createFacultyInInstitution,
  createFacultyInInstitutionSuccess,
  createDepartmentInInstitution,
  createDepartmentInInstitutionSuccess,
  updateDepartmentInInstitution,
  updateDepartmentInInstitutionSuccess,
  updateFacultyInInstitution,
  updateFacultyInInstitutionSuccess,
  updateDegreeTypeInInstitution,
  updateDegreeTypeInInstitutionSuccess,
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

  createFacultyInInstitution$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createFacultyInInstitution),
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
          .createFaculty(action.payload)
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
              return createFacultyInInstitutionSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });

  updateFacultyInInstitution$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateFacultyInInstitution),
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
          .updateFaculty(action.payload)
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
              return updateFacultyInInstitutionSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });

  getALlFacultiesInInstitution$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getALlFacultiesInInstitution),
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
        return this.institutionService.getALlFacultiesInInstitution(id).pipe(
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
            return getALlFacultiesInInstitutionSuccess({
              payload: data.payload,
            });
          })
        );
      })
    );
  });

  createDepartmentInInstitution$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createDepartmentInInstitution),
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
          .createDepartment(action.payload)
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
              return createDepartmentInInstitutionSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });

  updateDepartmentInInstitution$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateDepartmentInInstitution),
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
          .updateDepartment(action.payload)
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
              return updateDepartmentInInstitutionSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });

  getALlDepartmentInInstitution$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getALlDepartmentInInstitution),
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
        return this.institutionService.getALlDepartmentInInstitution(id).pipe(
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
            return getALlDepartmentInInstitutionSuccess({
              payload: data.payload,
            });
          })
        );
      })
    );
  });

 
  getInstitutionConfiguration$ = createEffect(() => {
    return this.actions$.pipe(
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
        const { id } = action;
        return this.institutionService.getInstitutionConfiguration(id).pipe(
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
          payload
        } = action;
        getAllInstitutionUsersSuccess({
          payload: { data: [], totalCount: 0 },
        });
        return this.institutionService
          .getAllInstitutionUsers(
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

  getAllInstitutionRecords$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllInstitutionRecords),
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
          .getAllInstitutionRecords(action.payload)
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
              return getAllInstitutionRecordsSuccess({
                payload: {data: data.payload}
                  
              });
            })
          );
      })
    );
  });

  getAllInstitutionDegreeType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllInstitutionDegreeType),
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
          .getAllInstitutionDegreeType(action.payload)
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
              return getAllInstitutionDegreeTypeSuccess({
                payload: {data: data.payload, totalCount: data.totalCount}
                  
              });
            })
          );
      })
    );
  });

  createDegreeTypeInInstitution$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createDegreeTypeInInstitution),
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
          .createDegreeType(action.payload)
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
              return createDegreeTypeInInstitutionSuccess({
                payload: data
                  
              });
            })
          );
      })
    );
  });
  updateDegreeTypeInInstitution$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateDegreeTypeInInstitution),
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
          .updateDegreeType(action.payload)
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
              return updateDegreeTypeInInstitutionSuccess({
                payload: data
                  
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