import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';

const selectFeature = (state: AppStateInterface) => state.configuration;

export const configurationSelector = createSelector(
  selectFeature,
  (state) => state.configuration
);

export const processingFeeDocument = createSelector(
  selectFeature,
  (state) => state.documentType
);

export const configurationMessage = createSelector(
  selectFeature,
  (state) => state.message
);

export const paymentPlan = createSelector(
  selectFeature,
  (state) => state.paymentPlan
);

export const institutionSelector = createSelector(
  selectFeature,
  (state) => state.selector
);


export const institutionType = createSelector(
  selectFeature,
  (state) => state.type
);

export const institutionBody = createSelector(
  selectFeature,
  (state) => state.body
);

export const institutionName = createSelector(
  selectFeature,
  (state) => state.name
);

export const organisationSector = createSelector(
  selectFeature,
  (state) => state.organisationSector
);

export const organisationIndustry = createSelector(
  selectFeature,
  (state) => state.organisationIndustry
);

export const institutionConfigSelector = createSelector(
  selectFeature,
  (state) => state.institutionConfig
);

