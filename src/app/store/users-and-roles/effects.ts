import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, from, map, mergeMap, switchMap, take } from 'rxjs';
import { AppResponseInterface } from 'src/app/types/appState.interface';
import { setAPIResponseMessage } from '../shared/app.action';
import { changePasswordUserRole, changePasswordUserRoleSuccess, getAllUsersAndRoles, getAllUsersAndRolesSuccess, getGlobalAdminUser, getGlobalAdminUserSuccess, getAllGlobalUsersAndRoles, getAllGlobalUsersAndRolesSuccess, updateGlobalAdminUser, updateGlobalAdminUserSuccess, invokeGlobalAdminRole, invokeGlobalAdminRoleSuccess, invokePermissionAndRoles, invokePermissionAndRoleSuccess, invokeAdminUsersInRole, invokeAdminUsersInRoleSuccess,  invokeRolePermission, invokeRolePermissionSuccess, invokeGetStates, invokeGetStatesSuccess, invokeGetLGA, invokeGetLGASuccess, getInstitutionRoles, getInstitutionRolesSuccess, createInstitutionUserWithRoleSuccess, createInstitutionUserWithRole,  } from './actions';
import { UsersAndRolesService } from 'src/app/core/services/users-and-roles/users-and-roles.service';

@Injectable()
export class UsersAndRolesEffects {
  constructor(
    private action$: Actions,
    private usersAndRolesService: UsersAndRolesService,
    private appStore: Store<AppResponseInterface>
  ) {}

  getUsersAndRoles$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getAllUsersAndRoles),
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
        const {  keyword, filter, pageSize, pageIndex } =
          action;
        return this.usersAndRolesService
          .getAllUsersAndRoles(
           
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
              return getAllUsersAndRolesSuccess({
                payload: data.payload
                  ? { defaultRoles: data.payload.defaultRoles, customRoles :data.payload.customRoles }
                  : { defaultRoles: [], customRoles: []},
              });
            })
          );
      })
    );
  });

  getAdminUsersInRoles$ = createEffect(() => {
    return this.action$.pipe(
      ofType(invokeAdminUsersInRole),
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
        const { roleId, keyword, filter, pageSize, pageIndex } =
          action;
        return this.usersAndRolesService
          .getAdminUsersInRole(
            roleId,
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
              return invokeAdminUsersInRoleSuccess({
                payload: { data: data.payload, totalCount: data.totalCount }
              });
            })
          );
      })
    );
  });

  changePassword$ = createEffect(() => {
    return this.action$.pipe(
      ofType(changePasswordUserRole),
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
        return this.usersAndRolesService
          .changePassword( payload )
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
              // read data and update message
              return changePasswordUserRoleSuccess({
                message: data,
              });
            })
          );
      })
    );
  });

  getInstitutionRoles$  = createEffect(() => {
    return this.action$.pipe(
      ofType( getInstitutionRoles),
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
        const { id } = action
        return this.usersAndRolesService.getInsitutionRoles(
            id
        )
          .pipe(
            map((data: any) => {
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
              return getInstitutionRolesSuccess({
                payload: data?.payload,
              });
            })
          );
      })
    );
  });

  getGlobalAdminUserById$  = createEffect(() => {
    return this.action$.pipe(
      ofType( getGlobalAdminUser),
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
        const { userId } = action
        return this.usersAndRolesService.getGlobalAdminUser(
            userId
        )
          .pipe(
            map((data: any) => {
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
              return getGlobalAdminUserSuccess({
                payload: data?.payload,
              });
            })
          );
      })
    );
  });

  getRolePermissionById$  = createEffect(() => {
    return this.action$.pipe(
      ofType( invokeRolePermission ),
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
        const { roleId } = action
        return this.usersAndRolesService.getRolePermission(
            roleId
        )
          .pipe(
            map((data: any) => {
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
              return invokeRolePermissionSuccess({
                payload: data?.payload,
              });
            })
          );
      })
    );
  });

 

  getGlobalUsersAndRoles$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getAllGlobalUsersAndRoles),
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
        const {  keyword, filter, pageSize, pageIndex } =
          action;
        return this.usersAndRolesService
          .getAllGlobalUsersAndRoles(
           
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
              return getAllGlobalUsersAndRolesSuccess({
                payload: data.payload
                  ? { data: data.payload, totalCount: data.totalCount }
                  : { data: [], totalCount: 0 },
              });
            })
          );
      })
    );
  });

  updateGlobalAdminUser$ = createEffect(() => {
    return this.action$.pipe(
      ofType(updateGlobalAdminUser),
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
        return this.usersAndRolesService
          .updateGlobalAdminUser( payload )
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
              // read data and update message
              return updateGlobalAdminUserSuccess({
                message: '',
              });
            })
          );
      })
    );
  });

  createGlobalAdminRole$ = createEffect(() => {
    return this.action$.pipe(
      ofType(invokeGlobalAdminRole),
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
        return this.usersAndRolesService
          .createAdminRole( payload )
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
              // read data and update message
              return invokeGlobalAdminRoleSuccess({
                message: '',
              });
            })
          );
      })
    );
  });

  createInstitutionUserWithRole$ = createEffect(() => {
    return this.action$.pipe(
      ofType(createInstitutionUserWithRole),
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
        return this.usersAndRolesService
          .createInstitutionUserWithRole( payload )
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
              // read data and update message
              return createInstitutionUserWithRoleSuccess({
                payload: data,
              });
            })
          );
      })
    );
  });

  getRolesAndPermission$ = createEffect(() => {
    return this.action$.pipe(
      ofType(invokePermissionAndRoles),
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
        const {   } =
          action;
        return this.usersAndRolesService
          .getAllGlobalPermissions( 
           
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
              return invokePermissionAndRoleSuccess({
               payload: data.payload
              });
            })
          );
      })
    );
  });

  getStates$ = createEffect(() => {
    return this.action$.pipe(
      ofType(invokeGetStates),
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
        const {   } =
          action;
        return this.usersAndRolesService
          .getStates( 
           
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
              return invokeGetStatesSuccess({
               payload: data.payload
              });
            })
          );
      })
    );
  });

  getLGA$ = createEffect(() => {
    return this.action$.pipe(
      ofType(invokeGetLGA),
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
        const {   } =
          action;
        return this.usersAndRolesService
          .getLocalGovernment()
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
              return invokeGetLGASuccess({
               payload: data.payload
              });
            })
          );
      })
    );
  });
  
}
