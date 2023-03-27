import { createReducer, on } from '@ngrx/store';
import {
  approveOrganizationRequestSuccess,
  downloadOrganizationCSVSuccess,
  downloadOrganizationExcelSuccess,
  fundOrganizationWalletSuccess,
  getAllOrganizationSuccess,
  getOrganizationSubscriptionHistorySuccess,
  getOrganizationVerificationHistoryDataSuccess,
  getOrganizationVerificationHistorySuccess,
  getOrganizationWalletIdSuccess,
  invokeGetOrganizationSuccess,
  invokeGetOrganizationTransactionDetailsSuccess,
  invokeOrganizationTransactionsSuccess,
  makePaymentSuccess,
  organizationProfileSuccess,
  organizationSectorAndIndustrySuccess,
  reasonForRequestSuccess,
  registerOrganizationSuccess,
  validateOrganizationCodeSuccess,
  validateOrganizationFundWalletSuccess,
  verifyGraduateRecordSuccess,
  verifyHistoryInstitutionDropdownSuccess,
} from './action';
import { OrganizationStateInterface } from './types/index.types';

const initialState: OrganizationStateInterface = {
  organizations: { data: [], totalCount: 0 },
  organization: null,
  newOrganization: null,
  newOrganizationValidation: null,
  walletId: null,
  validateWalletPayment: null,
  subscriptionHistory: null,
  verificationHistory: null,
  verificationHistoryData: null,
  verifyRecord: null,
  historyInstitution: null,
  profile: null,
  requestReason: null,
  makePayment: null,
  orgIndustryAndSectorName: null,
  fundwallet: {},
  organizationTransaction: null,
  transactionDetails: null,
  message: '',
  downloadFile: {}
};

export const organizationReducer = createReducer(
  initialState,
  on(registerOrganizationSuccess, (state, { payload }) => {
    return {
      ...state,
      newOrganization: payload,
    };
  }),
  on(validateOrganizationCodeSuccess, (state, { payload }) => {
    return {
      ...state,
      newOrganizationValidation: payload,
    };
  }),
  on(getOrganizationWalletIdSuccess, (state, { payload }) => {
    return {
      ...state,
      walletId: payload,
    };
  }),
  on(fundOrganizationWalletSuccess, (state, { payload }) => {
    return {
      ...state,
      fundwallet: payload,
    };
  }),
  on(validateOrganizationFundWalletSuccess, (state, { payload }) => {
    return {
      ...state,
      validateWalletPayment: payload,
    };
  }),
  on(getOrganizationSubscriptionHistorySuccess, (state, { payload }) => {
    return {
      ...state,
      subscriptionHistory: payload,
    };
  }),
  on(getOrganizationVerificationHistorySuccess, (state, { payload }) => {
    return {
      ...state,
      verificationHistory: payload,
    };
  }),
  on(getOrganizationVerificationHistoryDataSuccess, (state, { payload }) => {
    return {
      ...state,
      verificationHistoryData: payload,
    };
  }),
  on(verifyGraduateRecordSuccess, (state, { payload }) => {
    return {
      ...state,
      verifyRecord: payload,
    };
  }),
  on(verifyHistoryInstitutionDropdownSuccess, (state, { payload }) => {
    return {
      ...state,
      historyInstitution: payload,
    };
  }),
  on(organizationProfileSuccess, (state, { payload }) => {
    return {
      ...state,
      profile: payload,
    };
  }),
  on(organizationSectorAndIndustrySuccess, (state, { payload }) => {
    return {
      ...state,
      orgIndustryAndSectorName: payload,
    };
  }),
  on(reasonForRequestSuccess, (state, { payload }) => {
    return {
      ...state,
      requestReason: payload,
    };
  }),
  on(makePaymentSuccess, (state, { payload }) => {
    return {
      ...state,
      makePayment: payload,
    };
  }),


  on(getAllOrganizationSuccess, (state, { payload }) => {
    return {
      ...state,
      organizations: payload,
    };
  }),
  on(invokeGetOrganizationSuccess, (state, { payload }) => {
    return {
      ...state,
      organization: payload,
    };
  }),
  on(invokeOrganizationTransactionsSuccess, (state, { payload }) => {
    return {
      ...state,
      organizationTransaction: payload,
    };
  }),
  on(invokeGetOrganizationTransactionDetailsSuccess, (state, { payload }) => {
    return {
      ...state,
      transactionDetails: payload,
    };
  }),
  on(approveOrganizationRequestSuccess, (state, { message }) => {
    return {
      ...state,
      message,
    };
  }),
  on(downloadOrganizationCSVSuccess, (state, { payload }) => {
    const link = document.createElement('a');
    link.download = `${payload.fileName}.csv`;
    link.href = 'data:image/png;base64,' + payload.base64String;
    link.click();
       return {
      ...state,
    };
  }),
  on(downloadOrganizationExcelSuccess, (state, { payload }) => {
    const link = document.createElement('a');
    link.download = `${payload.fileName}.csv`;
    link.href = 'data:image/png;base64,' + payload.base64String;
    link.click();
       return {
      ...state,
    };
  }),
);
