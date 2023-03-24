import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IInstitutionStateInterface } from './types/index.type';

import * as storage from '../storage';
import {
  approveRejectInstitutionSuccess,
  createDegreeTypeInInstitutionSuccess,
  createDepartmentInInstitutionSuccess,
  createFacultyInInstitutionSuccess,
  createNewInstitutionSuccess,
  getAllAdminInstitutionTransactionSuccess,
  getALlDepartmentInInstitutionSuccess,
  getALlFacultiesInInstitutionSuccess,
  getAllInstitutionDegreeTypeSuccess,
  getAllInstitutionRecordsSuccess,
  getAllInstitutionUsersSuccess,
  getInstitutionBodySuccess,
  getInstitutionConfigurationSuccess,
  getInstitutionSectorSuccess,
  getInstitutionTypeSuccess,
  invokeGetInstitutionsSuccess,
  invokeGetInstitutionSuccess,
  updateDegreeTypeInInstitutionSuccess,
  updateDepartmentInInstitutionSuccess,
  updateFacultyInInstitutionSuccess,
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
  institutionFaculty: null,
  institutionDepartment: null,
  institutionRecord: null,
  institutionDegreeType: null,
  newDegreeType: null,
  newDepartment: null,
  newFaculty: null,
  updateDegreeType: null,
  updateDepartment: null,
  updateFaculty: null,
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

  on(getALlDepartmentInInstitutionSuccess, (state, { payload }) => {
    return {
      ...state,
      institutionDepartment: payload
    };
  }),

  on(getALlFacultiesInInstitutionSuccess, (state, { payload }) => {
    return {
      ...state,
      institutionFaculty: payload
    };
  }),

  on(getAllInstitutionRecordsSuccess, (state, { payload }) => {
    return {
      ...state,
      institutionRecord: payload
    };
  }),
  
  on(getAllInstitutionDegreeTypeSuccess, (state, { payload }) => {
    return {
      ...state,
      institutionDegreeType: payload
    };
  }),
  
  on(createDegreeTypeInInstitutionSuccess, (state, { payload }) => {
    return {
      ...state,
      newDegreeType: payload
    };
  }),

  on(updateDegreeTypeInInstitutionSuccess, (state, { payload }) => {
    return {
      ...state,
      updateDegreeType: payload
    };
  }),
  
  on(createDepartmentInInstitutionSuccess, (state, { payload }) => {
    return {
      ...state,
      newDepartment: payload
    };
  }),
  
  on(updateDepartmentInInstitutionSuccess, (state, { payload }) => {
    return {
      ...state,
      updateDepartment: payload
    };
  }),
  
  on(createFacultyInInstitutionSuccess, (state, { payload }) => {
    return {
      ...state,
      newFaculty: payload
    };
  }),
  
  on(updateFacultyInInstitutionSuccess, (state, { payload }) => {
    return {
      ...state,
      updateFaculty: payload
    };
  }),

);
