import { createAction, props } from '@ngrx/store';
import { IGraduateApproveReject } from './types/index.type';

export const invokeGetAllGraduates = createAction(
  '[graduates] invoke get all graduates',
  props<{
    institutionId: string,
    payload: any
  }>()
);

export const invokeGetAllGraduatesSuccess = createAction(
    '[graduates] report graduates',
    props<{
     payload : any
    }>()
  ); 

export const invokeGetAllPendingGraduates = createAction(
  '[graduates] invoke get all pending graduates',
  props<{
    keyword: string;
    filter: string;
    sort: string;
    pageSize: number;
    pageIndex: number;
  }>()
);

export const invokeGetGraduateDetails = createAction(
  '[graduates] get single graduate',
  props<{
    graduateId: string;
    institutionId: string;
  }>()
);


export const approvePendingGraduate = createAction(
  '[graduates] approve pending graduate',
  props<{
    payload: IGraduateApproveReject;
  }>()
);
export const rejectPendingGraduate = createAction(
  '[graduates] reject pending graduate',
  props<{
    payload: IGraduateApproveReject;
  }>()
);


export const invokeGetAllPendingGraduatesSuccess = createAction(
    '[graduates] report graduates',
    props<{
     payload : any
    }>()
  ); 

export const invokeGetGraduateDetailsSuccess = createAction(
    '[graduates] report graduates details success',
    props<{
     payload : any
    }>()
    ); 
    
    export const approveRejectPendingGraduateSuccess = createAction(
      '[graduates] approve or reject pending graduate success',
      props<{ message: string }>()

  );


  export const downloadCSV = createAction(
    '[graduates] download graduate CSV File',
    props<{
     payload : any
    }>()
    ); 

  export const downloadCSVSuccess = createAction(
    '[graduates] download graduate CSV File success',
    props<{
     payload : any
    }>()
    ); 

  export const downloadExcel = createAction(
    '[graduates] download graduate Excel File',
    props<{
     payload : any
    }>()
    ); 
  export const downloadExcelSuccess = createAction(
    '[graduates] download graduate Excel File success',
    props<{
     payload : any
    }>()
    ); 