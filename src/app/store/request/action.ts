import { createAction, props } from '@ngrx/store';


export const getAllRequest = createAction (
  '[request] get all request',
  props<{
    institutionType? : string,
    documentType? : string,
    selector? : string,
    status? : string,
    StartDate? : string,
    EndDate? : string,
    keyword?: string;
    filter?: string;
    pageSize?: number;
    pageIndex?: number;
  }>()
)

export const getAllRequestSuccess = createAction (
  '[request] get all request Success',
  props<{payload: any}>()
)

export const getAllOrganisationRequest = createAction (
  '[request] get all Organisation request',
  props<{
    range: number,
    organisationIndustry : string,
    organisationSelector : string,
    documentType : string,
    status : string,
    StartDate : string,
    EndDate : string,
    keyword: string,
    filter: string,
    pageSize: number,
    pageIndex: number,
  }>()
)

export const getAllOrganisationRequestSuccess = createAction (
  '[request] get all Organisation request Success',
  props<{payload: any}>()
)

export const invokeGetRequestDetails = createAction(
  '[graduates] get single request details',
  props<{
    id: string;
  }>()
);


export const invokeGetRequestDetailsSuccess = createAction(
  '[graduates] report request details success',
  props<{
   payload : any
  }>()
  ); 
  




