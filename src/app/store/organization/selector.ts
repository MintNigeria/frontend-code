import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';

const selectFeature = (state: AppStateInterface) => state.organizations;

export const organizationsSelector = createSelector(
  selectFeature,
  (state) => state.organizations
);

export const organizationSelector = createSelector(
  selectFeature,
  (state) => state.organization
);

export const organizationTransactionSelector = createSelector(
  selectFeature,
  (state) => state.organizationTransaction
);

export const organizationTransactionDetailsSelector = createSelector(
  selectFeature,
  (state) => state.transactionDetails
);

export const messageSelector = createSelector(
  selectFeature,
  (state) => state.message
);
