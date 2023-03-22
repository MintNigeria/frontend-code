import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';

const selectFeature = (state: AppStateInterface) => state.reporting;

export const reportingSelector = createSelector(
  selectFeature,
  (state) => state.reports
);

export const transactionSelector = createSelector(
  selectFeature,
  (state) => state.transactions
);
