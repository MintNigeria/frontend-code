import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IInstitutionStateInterface } from './types/index.type';

import * as storage from '../storage';
import {
  approveRejectInstitutionSuccess,
  createNewInstitutionSuccess,
  getAllAdminInstitutionTransactionSuccess,
  getAllInstitutionUsersSuccess,
  getInstitutionBodySuccess,
  getInstitutionConfigurationSuccess,
  getInstitutionSectorSuccess,
  getInstitutionTypeSuccess,
  invokeGetInstitutionsSuccess,
  invokeGetInstitutionSuccess,
  ValidateRegistrationCodeSuccess,
} from './action';

const initialState: IInstitutionStateInterface = {
  institutions: storage.getItem('institutions')
    ? storage.getItem('institutions').user
    : { data: [], totalCount: 0 },
  institution: null,
  institutionUsers: null,
  institutionAdminTransaction: null,
  institutionType: null,
  institutionSector: null,
  institutionBody: null,
  institutionRegistration: null,
  otpVerification: null,
  institutionConfiguration: null,
};

export const institutionReducers = createReducer(
  initialState,
  on(invokeGetInstitutionsSuccess, (state, { payload }) => {
    return {
      ...state,
      institutions: payload,
    };
  }),
  on(invokeGetInstitutionSuccess, (state, { payload }) => {
    return {
      ...state,
      institution: payload,
    };
  }),
  on(approveRejectInstitutionSuccess, (state, { payload }) => {
    return {
      ...state,
      institution: payload,
    };
  }),
  on(getAllInstitutionUsersSuccess, (state, { payload }) => {
    return {
      ...state,
      institutionUsers: payload,
    };
  }),

  on(getAllAdminInstitutionTransactionSuccess, (state, { payload }) => {
    return {
      ...state,
      institutionAdminTransaction: payload,
    };
  }),

  on(getInstitutionTypeSuccess, (state, { payload }) => {
    return {
      ...state,
      institutionType: payload
    };
  }),

  on(getInstitutionSectorSuccess, (state, { payload }) => {
    return {
      ...state,
      institutionSector: payload
    };
  }),

  on(getInstitutionBodySuccess, (state, { payload }) => {
    return {
      ...state,
      institutionBody: payload
    };
  }),

  on(createNewInstitutionSuccess, (state, { payload }) => {
    return {
      ...state,
      institutionRegistration: payload
    };
  }),

  on(ValidateRegistrationCodeSuccess, (state, { payload }) => {
    return {
      ...state,
      otpVerification: payload
    };
  }),

  on(getInstitutionConfigurationSuccess, (state, { payload }) => {
    return {
      ...state,
      otpVerification: payload
    };
  }),

);
