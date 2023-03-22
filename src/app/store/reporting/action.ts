import { createAction, props } from '@ngrx/store';

export const invokeGetAllReport = createAction(
  '[Reporting] invoke get all reports',
  props<{
    keyword: string;
    filter: string;
    pageSize: number;
    pageIndex: number;
  }>()
);

export const invokeGetAllReportSuccess = createAction(
  '[Reporting] report success',
  props<{
    payload: any;
  }>()
);

export const invokeGetTransactions = createAction(
  '[Reporting] invoke get all transactions',
  props<{
    institutionId: string;
    payload: any;
  }>()
);

export const invokeGetTransactionsSuccess = createAction(
  '[Reporting] invoke get all transactions success',
  props<{
    payload: any;
  }>()
);
