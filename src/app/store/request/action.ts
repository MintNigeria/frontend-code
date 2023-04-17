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
export const getAllInstitutionGraduateRequest = createAction (
  '[request] get all institution graduate request',
  props<{payload: any}>()
)
export const getAllInstitutionGraduateRequestSuccess = createAction (
  '[request] get all institution graduate request Success',
  props<{payload: any}>()
)
export const getAllInstitutionOrganizationRequest = createAction (
  '[request] get all institution Organization request',
  props<{payload: any}>()
)
export const getAllInstitutionOrganizationRequestSuccess = createAction (
  '[request] get all institution Organization request Success',
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
   
export const updateInstitutionRequest = createAction(
  '[request] update request details status',
  props<{
    payload: any;
  }>()
);


export const updateInstitutionRequestSuccess = createAction(
  '[request] update request details status success',
  props<{
   payload : any
  }>()
  ); 

  export const exportInstitutionGraduateRequestCSV = createAction(
    '[request] export institution graduate request',
    props<{
      payload : any
    }>()
  )
  
  export const exportInstitutionGraduateRequestCSVSuccess = createAction(
    '[request] export institution graduate request success',
    props<{
      payload : any
    }>()
  )

  export const exportInstitutionGraduateRequestExcel = createAction(
    '[request] export institution graduate request Excel',
    props<{
      payload : any
    }>()
  )
  
  export const exportInstitutionGraduateRequestExcelSuccess = createAction(
    '[request] export institution graduate request success Excel',
    props<{
      payload : any
    }>()
  )
    export const exportInstitutionOrganizationRequestCSV = createAction(
      '[request] export institution organization request',
      props<{
        payload : any
      }>()
    )
    
    export const exportInstitutionOrganizationRequestCSVSuccess = createAction(
      '[request] export institution organization request success',
      props<{
        payload : any
      }>()
  )

  export const exportInstitutionOrganizationRequestExcel = createAction(
    '[request] export institution organization request excel',
    props<{
      payload : any
    }>()
  )
  
  export const exportInstitutionOrganizationRequestExcelSuccess = createAction(
    '[request] export institution organization request success excel',
    props<{
      payload : any
    }>()
)
  




