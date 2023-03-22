import { createReducer, on } from '@ngrx/store';
import {
  exportTransactionCSVSuccess,
  exportTransactionExcelSuccess,
  invokeGetAllReportSuccess,
  invokeGetTransactionsSuccess,
} from './action';
import { ReportingStateInterface } from './types/index.types';

const initialState: ReportingStateInterface = {
  reports: { data: [], totalCount: 0 },
  transactions: { data: null, totalCount: 0 },
  excelExport: null,
  csvExport: null,
};

export const reportingReducer = createReducer(
  initialState,
  on(invokeGetAllReportSuccess, (state, { payload }) => {
    return {
      ...state,
      reports: payload,
    };
  }),
  on(invokeGetTransactionsSuccess, (state, { payload }) => {
    return {
      ...state,
      transactions: payload,
    };
  }),
  on(exportTransactionCSVSuccess, (state, { payload }) => {
    return {
      ...state,
      csvExport: payload,
    };
  }),
  on(exportTransactionExcelSuccess, (state, { payload }) => {
    return {
      ...state,
      excelExport: payload,
    };
  })
);
