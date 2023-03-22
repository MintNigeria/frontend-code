import { createAction, props } from '@ngrx/store';

export const invokeGetInstitutions = createAction(
  '[institutions] get all institutions',
  props<{
    institutionStatus: number;
    instituionTypeId: string;
    instituionSectorId: string,
    keyword: string;
    filter: string;
    pageSize: number;
    pageIndex: number;
    range?: string,
    fromDate?: string,
    toDate?: string
  }>()
);

export const invokeGetInstitutionsSuccess = createAction(
  '[institutions] get all institutions success',
  props<{ payload: { data: any[]; totalCount: number } }>()
);

export const invokeGetInstitution = createAction(
  '[institutions] get single institution',
  props<{
    id: string;
  }>()
);
export const invokeGetInstitutionSuccess = createAction(
  '[institutions] get single institution success',
  props<{ payload: any }>()
);
export const approveRejectInstitution = createAction(
  '[institutions] approve or reject institution',
  props<{
    payload: any;
  }>()
);
export const approveRejectInstitutionSuccess = createAction(
  '[institutions] approve or reject  institution success',
  props<{ payload: any }>()
);
export const getAllInstitutionUsers = createAction(
  '[institutions] get all institution users',
  props<{
    institutionId: string;
    keyword: string;
    filter: string;
    pageSize: number;
    pageIndex: number;
  }>()
);
export const getAllInstitutionUsersSuccess = createAction(
  '[institutions] get all  institution users success',
  props<{ payload: any }>()
);

export const getAllAdminInstitutionTransaction = createAction(
  '[institutions] get all admininstitution transaction',
  props<{
    institutionId: string,
    keyword: string,
    filter: string,
    status: string,
    requestor: string,
    fromDate: string,
    toDate: string,
    pageIndex: number,
    pageSize: number
  }>()
);
export const getAllAdminInstitutionTransactionSuccess = createAction(
  '[institutions] get all admininstitution transaction success',
  props<{ payload: any }>()
);

export const getInstitutionTypes = createAction(
  '[institutions] get all institution types',
);

export const getInstitutionTypeSuccess = createAction(
  '[institutions] get all institution types transaction success',
  props<{ payload: any }>()
);

export const getInstitutionSector = createAction(
  '[institutions] get all institution Sector',
);
export const getInstitutionSectorSuccess = createAction(
  '[institutions] get all institution Sector transaction success',
  props<{ payload: any }>()
);

export const getInstitutionBody = createAction(
  '[institutions] get all institution Body',
);
export const getInstitutionBodySuccess = createAction(
  '[institutions] get all institution Body  success',
  props<{ payload: any }>()
);
export const getAllInstitutionRecords = createAction(
  '[institutions] get all institution records',
  props<{ payload: any }>()
);
export const getAllInstitutionRecordsSuccess = createAction(
  '[institutions] get all institution records  success',
  props<{ payload: any }>()
);

export const createNewInstitution = createAction(
  '[institutions] create institution',
  props<{ payload: any }>()
);

export const createNewInstitutionSuccess = createAction(
  '[institutions] create institution',
  props<{ payload: any }>()
);

export const ValidateRegistrationCode = createAction(
  '[institutions] validate otp code',
  props<{ payload: any }>()
);

export const ValidateRegistrationCodeSuccess = createAction(
  '[institutions] validate otp success',
  props<{ payload: any }>()
);


export const getInstitutionConfiguration = createAction(
  '[institutions] get institution configuration success',
  props<{
    id: any;
  }>()
);

export const getInstitutionConfigurationSuccess = createAction(
  '[institutions] get institution configuration success',
  props<{ payload: any }>()
);

export const getALlDepartmentInInstitution = createAction(
  '[institutions] get institution departments ',
  props<{
    id: any;
  }>()
);

export const getALlDepartmentInInstitutionSuccess = createAction(
  '[institutions] get institution departments success',
  props<{ payload: any }>()
);

export const getALlFacultiesInInstitution = createAction(
  '[institutions] get institution departments ',
  props<{
    id: any;
  }>()
);

export const getALlFacultiesInInstitutionSuccess = createAction(
  '[institutions] get institution departments success',
  props<{ payload: any }>()
);