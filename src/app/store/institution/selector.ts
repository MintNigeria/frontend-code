import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';

export const selectFeature = (state: AppStateInterface) => state.institutions;

export const institutions = createSelector(
  selectFeature,
  (state) => state.institutions
);

export const singleInstitution = createSelector(
  selectFeature,
  (state) => state.institution
);
export const institutionUsersSelector = createSelector(
  selectFeature,
  (state) => state.institutionUsers
);

export const institutionAdminTransactionSelector = createSelector(
  selectFeature,
  (state) => state.institutionAdminTransaction
);

export const institutionTypeSelector = createSelector(
  selectFeature,
  (state) => state.institutionType
);

export const institutionSectorSelector = createSelector(
  selectFeature,
  (state) => state.institutionSector
);

export const institutionBodySelector = createSelector(
  selectFeature,
  (state) => state.institutionBody
);

export const institutionregistrationSelector = createSelector(
  selectFeature,
  (state) => state.institutionRegistration
);

export const institutionConfigurationSelector = createSelector(
  selectFeature,
  (state) => state.institutionConfiguration
);
