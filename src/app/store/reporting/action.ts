import { createAction, props } from '@ngrx/store';

export const invokeGetAllReport = createAction(
  '[Reporting] invoke get all reports',
  props<{
   payload: any
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

export const exportTransactionCSV = createAction(
  '[Reporting] export transaction CSV',
  props<{
    institutionId: string;
  }>()
);

export const exportTransactionCSVSuccess = createAction(
  '[Reporting] export transaction csv success',
  props<{
    payload: any;
  }>()
);

export const exportTransactionExcel = createAction(
  '[Reporting] export transaction Excel',
  props<{
    institutionId: string;
  }>()
);

export const exportTransactionExcelSuccess = createAction(
  '[Reporting] export transaction Excel success',
  props<{
    payload: any;
  }>()
);

export const exportReportCSV = createAction(
  '[Reporting] export Report CSV',
  props<{
    institutionId: string;
  }>()
);

export const exportReportCSVSuccess = createAction(
  '[Reporting] export Report csv success',
  props<{
    payload: any;
  }>()
);

export const exportReportExcel = createAction(
  '[Reporting] export Report Excel',
  props<{
    institutionId: string;
  }>()
);

export const exportReportExcelSuccess = createAction(
  '[Reporting] export Report Excel success',
  props<{
    payload: any;
  }>()
);
