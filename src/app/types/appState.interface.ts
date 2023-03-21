import { localStorageSync } from 'ngrx-store-localstorage';

import * as fromAuth from '../store/auth/reducers';
import * as fromShared from '../store/shared/app.reducer';
import * as fromInstitutions from '../store/institution/reducers';
import * as fromUtility from '../store/institution copy/reducers';


import {
  Action,
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { IAuthStateInterface } from '../store/auth/index.types';
import { IInstitutionStateInterface } from '../store/institution/types/index.type';
import { IUtilityStateInterface } from '../store/institution copy/types/index.type';

// all module state should be imported here
export interface AppStateInterface {
  auth: IAuthStateInterface;
  apiResponse: AppResponseInterface;
  // requests: RequestStateInterface;
  // organizations: OrganizationStateInterface;
  // dashboard: DashboardStateInterface,
  // configuration: ConfigurationStateInterface,
  // usersAndRoles: UsersAndRolesStateInterface
  // reporting : ReportingStateInterface,
  // graduates : GraduatesStateInterface,
  // auditLog : AuditLogStateInterface
  institutions: IInstitutionStateInterface;
  utility: IUtilityStateInterface;
}

export interface AppLoadingStateInterface {
  isLoading: boolean;
}

export interface AppResponseInterface extends AppLoadingStateInterface {
  apiResponseMessage: string | object;
  isApiSuccessful: boolean;
}

export const reducers: ActionReducerMap<AppStateInterface> = {
  auth: fromAuth.authReducers,
  apiResponse: fromShared.appReducer,
  institutions: fromInstitutions.institutionReducers,
  utility: fromUtility.utilityReducers,

};

const reducerKeys = ['auth', 'institutions', 'utility'];

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: reducerKeys })(reducer);
}

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppStateInterface>[] =
  !environment.production
    ? [debug, localStorageSyncReducer]
    : [localStorageSyncReducer];
