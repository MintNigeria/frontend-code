import { createReducer, on } from '@ngrx/store';
import {
  invokeGetAllReportSuccess,
  invokeGetTransactionsSuccess,
} from './action';
import { ReportingStateInterface } from './types/index.types';

const initialState: ReportingStateInterface = {
  reports: { data: [], totalCount: 0 },
  transactions: { data: null, totalCount: 0 },
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
  })
);
