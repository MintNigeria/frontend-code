import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IInstitutionStateInterface } from './types/index.type';

import * as storage from '../storage';
import {
  approveRejectInstitutionSuccess,
  createDegreeTypeInInstitutionSuccess,
  createDepartmentInInstitutionSuccess,
  createFacultyInInstitutionSuccess,
  createGradeInInstitutionSuccess,
  createNewInstitutionSuccess,
  getALlDepartmentInInstitutionSuccess,
  getALlFacultiesInInstitutionSuccess,
  getAllInstitutionDegreeTypeSuccess,
  getAllInstitutionGradeSuccess,
  getAllInstitutionRecordsSuccess,
  getAllInstitutionsDropdownSuccess,
  getAllInstitutionsRecordsAllNamesSuccess,
  getAllInstitutionTypeLinkedToBodySuccess,
  getAllInstitutionUsersSuccess,
  getDegreeTypeWithInstitutionNameSuccess,
  getFacultyAndDepartmentByInstitutionNameSuccess,
  getInstitutionBodySuccess,
  getInstitutionConfigurationSuccess,
  getInstitutionDataEncryptionDecryptionSuccess,
  getInstitutionDataSourceSuccess,
  getInstitutionEndpointSuccess,
  getInstitutionSectorSuccess,
  getInstitutionTransactionTypeFilterSuccess,
  getInstitutionTypeSuccess,
  getInstitutionUserInfoSuccess,
  invokeGetInstitutionsSuccess,
  invokeGetInstitutionSuccess,
  setInstitutionDataEncryptionDecryptionSuccess,
  setInstitutionDataSourceSuccess,
  setInstitutionEndpointSuccess,
  updateDegreeTypeInInstitutionSuccess,
  updateDepartmentInInstitutionSuccess,
  updatedInstitutionSuccess,
  updateFacultyInInstitutionSuccess,
  updateGradeInInstitutionSuccess,
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
  institutionTypeLinkedToBody: null,
  institutionSector: null,
  institutionBody: null,
  institutionRegistration: null,
  otpVerification: null,
  institutionConfiguration: null,
  userInfo: null,
  institutionFaculty: null,
  institutionDepartment: null,
  institutionRecord: null,
  institutionRecordNames: null,
  institutionDegreeType: null,
  institutiongrade: null,
  newDegreeType: null,
  newgrade: null,
  newDepartment: null,
  newFaculty: null,
  updateDegreeType: null,
  updategrade: null,
  updateRegistration: null,
  updateDepartment: null,
  updateFaculty: null,
  faultyAndDepartmentName: null,
  dropdown: null,
  degreeTypeByName: null,
  transactionTypeFilter: null,
  getDataSource: null,
  setDataSource: null,
  getDataEncryptionDecryption: null,
  setDataEncryptionDecryption: null,
  setEndpoint: null,
  getEndpoint: null,
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

  on(getInstitutionTypeSuccess, (state, { payload }) => {
    return {
      ...state,
      institutionType: payload,
    };
  }),

  on(getAllInstitutionTypeLinkedToBodySuccess, (state, { payload }) => {
    return {
      ...state,
      institutionType: payload,
    };
  }),

  on(getInstitutionSectorSuccess, (state, { payload }) => {
    return {
      ...state,
      institutionSector: payload,
    };
  }),

  on(getInstitutionBodySuccess, (state, { payload }) => {
    return {
      ...state,
      institutionBody: payload,
    };
  }),

  on(createNewInstitutionSuccess, (state, { payload }) => {
    return {
      ...state,
      institutionRegistration: payload,
    };
  }),

  on(updatedInstitutionSuccess, (state, { payload }) => {
    return {
      ...state,
      updateRegistration: payload,
    };
  }),

  on(ValidateRegistrationCodeSuccess, (state, { payload }) => {
    return {
      ...state,
      otpVerification: payload,
    };
  }),

  on(getInstitutionConfigurationSuccess, (state, { payload }) => {
    return {
      ...state,
      otpVerification: payload,
    };
  }),

  on(getInstitutionUserInfoSuccess, (state, { payload }) => {
    return {
      ...state,
      userInfo: payload,
    };
  }),

  on(getALlDepartmentInInstitutionSuccess, (state, { payload }) => {
    return {
      ...state,
      institutionDepartment: payload,
    };
  }),

  on(getALlFacultiesInInstitutionSuccess, (state, { payload }) => {
    return {
      ...state,
      institutionFaculty: payload,
    };
  }),

  on(getAllInstitutionRecordsSuccess, (state, { payload }) => {
    return {
      ...state,
      institutionRecord: payload,
    };
  }),

  on(getAllInstitutionsRecordsAllNamesSuccess, (state, { payload }) => {
    return {
      ...state,
      institutionRecordNames: payload,
    };
  }),

  on(getAllInstitutionDegreeTypeSuccess, (state, { payload }) => {
    return {
      ...state,
      institutionDegreeType: payload,
    };
  }),

  on(createDegreeTypeInInstitutionSuccess, (state, { payload }) => {
    return {
      ...state,
      newDegreeType: payload,
    };
  }),

  on(updateDegreeTypeInInstitutionSuccess, (state, { payload }) => {
    return {
      ...state,
      updateDegreeType: payload,
    };
  }),

  on(getAllInstitutionGradeSuccess, (state, { payload }) => {
    return {
      ...state,
      institutiongrade: payload,
    };
  }),

  on(createGradeInInstitutionSuccess, (state, { payload }) => {
    return {
      ...state,
      newgrade: payload,
    };
  }),

  on(updateGradeInInstitutionSuccess, (state, { payload }) => {
    return {
      ...state,
      updategrade: payload,
    };
  }),

  on(createDepartmentInInstitutionSuccess, (state, { payload }) => {
    return {
      ...state,
      newDepartment: payload,
    };
  }),

  on(updateDepartmentInInstitutionSuccess, (state, { payload }) => {
    return {
      ...state,
      updateDepartment: payload,
    };
  }),

  on(createFacultyInInstitutionSuccess, (state, { payload }) => {
    return {
      ...state,
      newFaculty: payload,
    };
  }),

  on(updateFacultyInInstitutionSuccess, (state, { payload }) => {
    return {
      ...state,
      updateFaculty: payload,
    };
  }),

  on(getFacultyAndDepartmentByInstitutionNameSuccess, (state, { payload }) => {
    return {
      ...state,
      faultyAndDepartmentName: payload,
    };
  }),

  on(getAllInstitutionsDropdownSuccess, (state, { payload }) => {
    return {
      ...state,
      dropdown: payload,
    };
  }),

  on(getDegreeTypeWithInstitutionNameSuccess, (state, { payload }) => {
    return {
      ...state,
      degreeTypeByName: payload,
    };
  }),

  on(getInstitutionTransactionTypeFilterSuccess, (state, { payload }) => {
    return {
      ...state,
      transactionTypeFilter: payload,
    };
  }),

  on(getInstitutionDataSourceSuccess, (state, { payload }) => {
    return {
      ...state,
      getDataSource: payload,
    };
  }),

  on(setInstitutionDataSourceSuccess, (state, { payload }) => {
    return {
      ...state,
      setDataSource: payload,
    };
  }),

  on(getInstitutionDataEncryptionDecryptionSuccess, (state, { payload }) => {
    return {
      ...state,
      getDataEncryptionDecryption: payload,
    };
  }),

  on(setInstitutionDataEncryptionDecryptionSuccess, (state, { payload }) => {
    return {
      ...state,
      setDataEncryptionDecryption: payload,
    };
  }),

  on(getInstitutionEndpointSuccess, (state, { payload }) => {
    return {
      ...state,
      getEndpoint: payload,
    };
  }),

  on(setInstitutionEndpointSuccess, (state, { payload }) => {
    return {
      ...state,
      setEndpoint: payload,
    };
  })
);
