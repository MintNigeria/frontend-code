import { createReducer, on } from '@ngrx/store';
import { approveRejectPendingGraduateSuccess, createGraduateRecordSuccess, downloadCSVSuccess, downloadExcelSuccess, downloadRecordUploadFormatSuccess, getAllGraduateRequestForGradauteSuccess, getAllInstitutionUploadSuccess, invokeGetAllGraduatesSuccess, invokeGetAllPendingGraduatesSuccess, invokeGetGraduateDetails, invokeGetGraduateDetailsSuccess, uploadGraduateRecordSuccess } from './action';
import {GraduatesStateInterface} from './types/index.type';


const initialState: GraduatesStateInterface  = {
    gradautes: { data: [], totalCount: 0 },
    pendingGradautes: { data: [], totalCount: 0 },
    graduateDetail: {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      userType: 0,
      address: '' ,
      gender: 0,
      stateId: 0,
      state: '',
      lgaId: 0,
      lga: '',
      profileImagePath: '',
      genderString: '',
      dateOfBirth: '',
      is2FAEnabled: false,
      imei: null,
      serialNumber: null,
      device: null,
      ipAddress: null
  },
  downloadFile: {},
  recorduploads: null,
  graduateRecord: null,
  graduateRecordUploadFormat: null,
  uploadRecord: null,
  createGraduaterecord: null,
  graduateRequestRecord: null,
  graduateRequestDetailsRecord: null,

};

export const graduatesReducer = createReducer(
  initialState,
  on(invokeGetAllGraduatesSuccess, (state, { payload }) => {
    return {
      ...state,
      gradautes: payload,
    };
  }),
  on(invokeGetAllPendingGraduatesSuccess, (state, { payload }) => {
    return {
      ...state,
      pendingGradautes: payload,
    };
  }),
  on(invokeGetGraduateDetailsSuccess, (state, { payload }) => {
    return {
      ...state,
      graduateDetail: payload,
    };
  }),

  on(approveRejectPendingGraduateSuccess, (state, { message }) => {
    return {
      ...state,
     message
    };
  }),
  on(downloadCSVSuccess, (state, { payload }) => {
    return {
      ...state,
     downloadFile: payload
    };
  }),
  on(downloadExcelSuccess, (state, { payload }) => {
    return {
      ...state,
      downloadFile: payload
    };
  }),
  on(getAllInstitutionUploadSuccess, (state, { payload }) => {
    return {
      ...state,
      recorduploads: payload
    };
  }),
  on(downloadRecordUploadFormatSuccess, (state, { payload }) => {
    return {
      ...state,
      graduateRecordUploadFormat: payload
    };
  }),
  on(uploadGraduateRecordSuccess, (state, { payload }) => {
    return {
      ...state,
      graduateRecordUploadFormat: payload
    };
  }),
  on(createGraduateRecordSuccess, (state, { payload }) => {
    return {
      ...state,
      createGraduaterecord: payload
    };
  }),
  on(getAllGraduateRequestForGradauteSuccess, (state, { payload }) => {
    return {
      ...state,
      graduateRequestDetailsRecord: payload
    };
  }),

);
