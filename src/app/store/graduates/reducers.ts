import { createReducer, on } from '@ngrx/store';
import { approveRejectPendingGraduateSuccess, createGraduateApplicationSuccess, createGraduateRecordSuccess, deleteHubItemSuccess, downloadCSVSuccess, downloadExcelSuccess, downloadRecordUploadFormatSuccess, exportGraduateApplicationAsExcelSuccess, exportGraduateApplicationCSVSuccess, exportGraduateVerificationAsExcel, exportGraduateVerificationAsExcelSuccess, exportGraduateVerificationCSVSuccess, fundGraduateWalletSuccess, getActiveDeliveryOptionsSuccess, getAllGraduateRequestForGradauteSuccess, getAllHubItemSuccess, getAllInstitutionUploadSuccess, getGraduateCertificateVerificationDetailSuccess, getGraduateCertificateVerificationsSuccess, getGraduateInstitutionsSuccess, getGraduateProfileSuccess, getGraduateTransactionHistorySuccess, getGraduateWalletIdSuccess, getMyInstitutionNotifiedSuccess, getMyInstitutionsNotifiedStatusSuccess, graduateDocumentTypeFilterSuccess, graduateTransactionTypeFilterSuccess, invokeGetAllGraduatesSuccess, invokeGetAllPendingGraduatesSuccess, invokeGetGraduateDetails, invokeGetGraduateDetailsSuccess, notifyMyInstitutionSuccess, registerNewGraduateSuccess, retryApplicationVarificationPaymentSuccess, searchGraduateRecordsSuccess, submitGraduateVerificationRequestSuccess, submitVerificationReasonForRequestSuccess, updateGraduateInstitutionsSuccess, updateGraduateProfileSuccess, uploadGraduateRecordSuccess, uploadHubItemSuccess, validateGraduateRegistrationSuccess } from './action';
import {GraduatesStateInterface} from './types/index.type';
import { exportTransactionCSVSuccess, exportTransactionExcelSuccess } from '../reporting/action';


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
  graduatewallet: null,
  graduateTransactionHistory: null,
  registerGraduate: null,
  validateRegistration: null,
  fundwallet: null,
  hubItems: null,
  uploadHubItems: null,
  notifyInstitutition: null,
  institutionNotified: null,
  institutionNotifiedStatus: null,
  graduateInstitutions: null,
  graduateProfile: null,
  updateprofile: null,
  updateInstitutions: null,
  gradauteVerifications: null,
  deleteHubItems: null,
  verificationDetails: null,
  searchRecord: null,
  transactionType: null,
  documentType: null,
  retryPayment: null,
  submitverificationRequest: null,
  submitVerificationRequest: null,
  exportApplicationExcel: null,
  exportApplicationCSV: null,
  exportVerificationExcel: null,
  exportVerificationCSV: null,
  exportTransactionExcel: null,
  exportTransactionCSV: null,
  activeDeliveryoptions: null,
  createGraduateApplication: null,
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
  on(getGraduateWalletIdSuccess, (state, { payload }) => {
    return {
      ...state,
      graduatewallet: payload
    };
  }),
  on(getGraduateTransactionHistorySuccess, (state, { payload }) => {
    return {
      ...state,
      graduateTransactionHistory: payload
    };
  }),
  on(registerNewGraduateSuccess, (state, { payload }) => {
    return {
      ...state,
      registerGraduate: payload
    };
  }),
  on(validateGraduateRegistrationSuccess, (state, { payload }) => {
    return {
      ...state,
      validateRegistration: payload
    };
  }),
  on(fundGraduateWalletSuccess, (state, { payload }) => {
    return {
      ...state,
      fundwallet: payload
    };
  }),
  on(getAllHubItemSuccess, (state, { payload }) => {
    return {
      ...state,
      hubItems: payload
    };
  }),
  on(uploadHubItemSuccess, (state, { payload }) => {
    return {
      ...state,
      uploadHubItems: payload
    };
  }),
  on(notifyMyInstitutionSuccess, (state, { payload }) => {
    return {
      ...state,
      notifyInstitutition: payload
    };
  }),
  on(getMyInstitutionNotifiedSuccess, (state, { payload }) => {
    return {
      ...state,
      institutionNotified: payload
    };
  }),
  on(getMyInstitutionsNotifiedStatusSuccess, (state, { payload }) => {
    return {
      ...state,
      institutionNotifiedStatus: payload
    };
  }),
  on(getGraduateInstitutionsSuccess, (state, { payload }) => {
    return {
      ...state,
      graduateInstitutions: payload
    };
  }),
  on(getGraduateProfileSuccess, (state, { payload }) => {
    return {
      ...state,
      graduateProfile: payload
    };
  }),
  on(updateGraduateInstitutionsSuccess, (state, { payload }) => {
    return {
      ...state,
      updateInstitutions: payload
    };
  }),
  on(updateGraduateProfileSuccess, (state, { payload }) => {
    return {
      ...state,
      updateprofile: payload
    };
  }),
  on(getGraduateCertificateVerificationsSuccess, (state, { payload }) => {
    return {
      ...state,
      gradauteVerifications: payload
    };
  }),
  on(deleteHubItemSuccess, (state, { payload }) => {
    return {
      ...state,
      deleteHubItems: payload
    };
  }),
  on(getGraduateCertificateVerificationDetailSuccess, (state, { payload }) => {
    return {
      ...state,
      verificationDetails: payload
    };
  }),
  on(searchGraduateRecordsSuccess, (state, { payload }) => {
    return {
      ...state,
      searchRecord: payload
    };
  }),
  on(submitGraduateVerificationRequestSuccess, (state, { payload }) => {
    return {
      ...state,
      submitVerificationRequest: payload
    };
  }),
  on(getGraduateCertificateVerificationDetailSuccess, (state, { payload }) => {
    return {
      ...state,
      verificationDetails: payload
    };
  }),
  on(exportGraduateApplicationAsExcelSuccess, (state, { payload }) => {
    return {
      ...state,
      exportApplicationExcel: payload
    };
  }),
  on(exportGraduateApplicationCSVSuccess, (state, { payload }) => {
    return {
      ...state,
      exportApplicationCSV: payload
    };
  }),
  on(exportGraduateVerificationAsExcelSuccess, (state, { payload }) => {
    return {
      ...state,
      exportVerificationExcel: payload
    };
  }),
  on(exportGraduateVerificationCSVSuccess, (state, { payload }) => {
    return {
      ...state,
      exportVerificationCSV: payload
    };
  }),
  on(exportTransactionExcelSuccess, (state, { payload }) => {
    return {
      ...state,
      exportVerificationExcel: payload
    };
  }),
  on(exportGraduateVerificationCSVSuccess, (state, { payload }) => {
    return {
      ...state,
      exportTransactionExcel: payload
    };
  }),
  on(exportTransactionCSVSuccess, (state, { payload }) => {
    return {
      ...state,
      exportTransactionCSV: payload
    };
  }),
  on(graduateTransactionTypeFilterSuccess, (state, { payload }) => {
    return {
      ...state,
      transactionType: payload
    };
  }),
  on(graduateDocumentTypeFilterSuccess, (state, { payload }) => {
    return {
      ...state,
      documentType: payload
    };
  }),
  on(retryApplicationVarificationPaymentSuccess, (state, { payload }) => {
    return {
      ...state,
      retryPament: payload
    };
  }),
  on(submitVerificationReasonForRequestSuccess, (state, { payload }) => {
    return {
      ...state,
      submitVerificationRequest: payload
    };
  }),
  on(getActiveDeliveryOptionsSuccess, (state, { payload }) => {
    return {
      ...state,
      activeDeliveryoptions: payload
    };
  }),
  on(createGraduateApplicationSuccess, (state, { payload }) => {
    return {
      ...state,
      createGraduateApplication: payload
    };
  }),

);
