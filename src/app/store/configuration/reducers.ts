import { createReducer, on } from '@ngrx/store';
import {
  createInstitutionBodySuccess,
  createInstitutionRecordSuccess,
  createInstitutionSectorSuccess,
  createInstitutionTypeSuccess,
  createOrganisationIndustrySuccess,
  createOrganisationSectorSuccess,
  getAllConfigurationSuccess,
  getAllDocumentTypeSuccess,
  getAllPaymentPlansSuccess,
  getInstitutionbodySuccess,
  getInstitutionConfigurationSuccess,
  getInstitutionNameSuccess,
  getInstitutionSelectorSuccess,
  getInstitutiontypeSuccess,
  getOrganisationIndustrySuccess,
  getOrganisationSectorSuccess,
  getSuccessMessage,
  updateInstitutionBodySuccess,
  updateInstitutionSectorSuccess,
  updateInstitutionTypeSuccess,
  updateOrganisationIndustrySuccess,
  updateOrganisationSectorSuccess,
} from './action';
import { ConfigurationStateInterface } from './types/index.types';

const initialState: ConfigurationStateInterface = {
  configuration: { data: [], totalCount: 0 },
  paymentPlan: [],
  documentType: [],
  selector : [],
  type : [],
  body : [],
  name : [],
  organisationSector : [],
  organisationIndustry : [],
  message: '',
  institutionConfig : null
};

export const configurationReducer = createReducer(
  initialState,
  on(getAllConfigurationSuccess, (state, { payload }) => {
    return {
      ...state,
      configuration: payload,
    };
  }),
  on(getAllDocumentTypeSuccess, (state, { payload }) => {
    return {
      ...state,
      documentType: payload,
    };
  }),
  on(getSuccessMessage, (state, { message }) => {
    return {
      ...state,
      message,
    };
  }),
  on(getAllPaymentPlansSuccess, (state, { payload }) => {
    return {
      ...state,
      paymentPlan: payload,
    };
  }),
  on(getInstitutionSelectorSuccess, (state, { payload }) => {
    return {
      ...state,
      selector: payload,
    };
  }),
  on(getInstitutiontypeSuccess, (state, { payload }) => {
    return {
      ...state,
      type: payload,
    };
  }),
  on(getInstitutionbodySuccess, (state, { payload }) => {
    return {
      ...state,
      body: payload,
    };
  }),
  on(getInstitutionNameSuccess, (state, { payload }) => {
    return {
      ...state,
      name: payload,
    };
  }),
  on(createInstitutionBodySuccess, (state, { payload }) => {
    return {
      ...state,
      message: payload,
    };
  }),
  on(updateInstitutionBodySuccess, (state, { payload }) => {
    return {
      ...state,
      message: payload,
    };
  }),
  on(updateInstitutionSectorSuccess, (state, { payload }) => {
    return {
      ...state,
      message: payload,
    };
  }),
  on(createInstitutionSectorSuccess, (state, { payload }) => {
    return {
      ...state,
      message: payload,
    };
  }),
  on(createInstitutionTypeSuccess, (state, { payload }) => {
    return {
      ...state,
      message: payload,
    };
  }),
  on(updateInstitutionTypeSuccess, (state, { payload }) => {
    return {
      ...state,
      message: payload,
    };
  }),
  on(getOrganisationSectorSuccess, (state, { payload }) => {
    return {
      ...state,
      organisationSector: payload,
    };
  }),
  on(getOrganisationIndustrySuccess, (state, { payload }) => {
    return {
      ...state,
      organisationIndustry: payload,
    };
  }),
  on(updateOrganisationIndustrySuccess, (state, { payload }) => {
    return {
      ...state,
      message: payload,
    };
  }),
  on(createOrganisationIndustrySuccess, (state, { payload }) => {
    return {
      ...state,
      message: payload,
    };
  }),
  on(createOrganisationSectorSuccess, (state, { payload }) => {
    return {
      ...state,
      message: payload,
    };
  }),
  on(updateOrganisationSectorSuccess, (state, { payload }) => {
    return {
      ...state,
      message: payload,
    };
  }),
  on(createInstitutionRecordSuccess, (state, { payload }) => {
    return {
      ...state,
      message: payload,
    };
  }),
  on(getInstitutionConfigurationSuccess, (state, { payload }) => {
    return {
      ...state,
      institutionConfig: payload,
    };
  }),
 
);
