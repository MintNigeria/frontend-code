import { localStorageSync } from 'ngrx-store-localstorage';

import * as fromAuth from '../store/auth/reducers';
import * as fromShared from '../store/shared/app.reducer';
import * as fromInstitutions from '../store/institution/reducers';
import * as fromUtility from '../store/institution copy/reducers';
import * as fromReporting from '../store/reporting/reducers';
import * as fromRequest from '../store/request/reducers'
import * as fromGraduates from '../store/graduates/reducers'
import * as fromConfiguration from '../store/configuration/reducers'
import * as fromUsersAndRoles from '../store/users-and-roles/reducer'
import * as fromDashboard from '../store/dashboard/reducer'
import * as fromOrganization from '../store/organization/reducers'


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
import { ReportingStateInterface } from '../store/reporting/types/index.types';
import { RequestStateInterface } from '../store/request/types/index.types';
import { GraduatesStateInterface } from '../store/graduates/types/index.type';
import { ConfigurationStateInterface } from '../store/configuration/types/index.types';
import { UsersAndRolesStateInterface } from '../store/users-and-roles/types/index.types';
import { DashboardStateInterface } from '../store/dashboard/types/index.types';
import { OrganizationStateInterface } from '../store/organization/types/index.types';


// all module state should be imported here
export interface AppStateInterface {
  auth: IAuthStateInterface;
  apiResponse: AppResponseInterface;
  requests: RequestStateInterface;
  organizations: OrganizationStateInterface;
  dashboard: DashboardStateInterface,
  configuration: ConfigurationStateInterface,
  usersAndRoles: UsersAndRolesStateInterface
  reporting : ReportingStateInterface,
  graduates : GraduatesStateInterface,
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
  requests: fromRequest.requestReducer,
  organizations: fromOrganization.organizationReducer,
  institutions: fromInstitutions.institutionReducers,
  utility: fromUtility.utilityReducers,
  reporting : fromReporting.reportingReducer,
  graduates : fromGraduates.graduatesReducer,
  configuration: fromConfiguration.configurationReducer,
  usersAndRoles: fromUsersAndRoles.usersAndRolesReducer,
  dashboard: fromDashboard.dashboardReducer,



};

const reducerKeys = ['auth', 'requests', 'institutions', 'utility', 'dashboard', 'reporting', 'graduates', 'configuration', 'usersAndRoles', 'dashboard', 'organizations' ];

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
