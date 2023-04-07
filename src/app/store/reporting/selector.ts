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

export const excelExportSelector = createSelector(
  selectFeature,
  (state) => state.excelExport
);

export const csvExportSelector = createSelector(
  selectFeature,
  (state) => state.csvExport
);

export const ReportexcelExportSelector = createSelector(
  selectFeature,
  (state) => state.excelExportReport
);

export const ReportcsvExportSelector = createSelector(
  selectFeature,
  (state) => state.csvExportReport
);
