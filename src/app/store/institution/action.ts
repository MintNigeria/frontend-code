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
    payload: any
  }>()
);
export const getAllInstitutionUsersSuccess = createAction(
  '[institutions] get all  institution users success',
  props<{ payload: any }>()
);


export const getInstitutionTypes = createAction(
  '[institutions] get all institution types',
);

export const getInstitutionTypeSuccess = createAction(
  '[institutions] get all institution types transaction success',
  props<{ payload: any }>()
  );
  
  export const getAllInstitutionTypeLinkedToBody = createAction(
    '[institutions] get all institution types linked to a body',
    props<{ id: any }>()
);

export const getAllInstitutionTypeLinkedToBodySuccess = createAction(
  '[institutions] get all institution types linked to a body success',
  props<{ payload: any }>()
);

export const getInstitutionSector = createAction(
  '[institutions] get all institution Sector',
);
export const getInstitutionSectorSuccess = createAction(
  '[institutions] get all institution Sector transaction success',
  props<{ payload: any }>()
);

export const getAllInstitutionsDropdown = createAction(
  '[institutions] get all institution name dropdown',
  props<{ payload: any }>()
);
export const getAllInstitutionsDropdownSuccess = createAction(
  '[institutions] get all institution name dropdown success',
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
export const getAllInstitutionsRecordsAllNames = createAction(
  '[institutions] get all institution names',
);
export const getAllInstitutionsRecordsAllNamesSuccess = createAction(
  '[institutions] get all institution names  success',
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

export const updatedInstitution = createAction(
  '[institutions] update institution profile',
  props<{ payload: any, id: any }>()
);

export const updatedInstitutionSuccess = createAction(
  '[institutions] update institution profile success',
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
  
  export const getInstitutionUserInfo = createAction(
    '[institutions] get institution user info',
    props<{
      id: any;
    }>()
  );
  
  export const getInstitutionUserInfoSuccess = createAction(
    '[institutions] get institution user info success',
    props<{
      payload: any;
    }>()
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

export const createDepartmentInInstitution = createAction(
  '[institutions] create institution Department type ',
  props<{
    payload: any;
  }>()
);

export const createDepartmentInInstitutionSuccess = createAction(
  '[institutions] create institution Department type success',
  props<{ payload: any }>()
);

export const updateDepartmentInInstitution = createAction(
  '[institutions] update institution Department type ',
  props<{
    payload: any;
  }>()
);

export const updateDepartmentInInstitutionSuccess = createAction(
  '[institutions] update institution Department type success',
  props<{ payload: any }>()
);

export const getALlFacultiesInInstitution = createAction(
  '[institutions] get faculty departments ',
  props<{
    id: any;
  }>()
);

export const getALlFacultiesInInstitutionSuccess = createAction(
  '[institutions] get institution faculty success',
  props<{ payload: any }>()
);

export const createFacultyInInstitution = createAction(
  '[institutions] create institution faculty ',
  props<{
    payload: any;
  }>()
);

export const createFacultyInInstitutionSuccess = createAction(
  '[institutions] create institution faculty success',
  props<{ payload: any }>()
);

export const updateFacultyInInstitution = createAction(
  '[institutions] update institution faculty ',
  props<{
    payload: any;
  }>()
);

export const updateFacultyInInstitutionSuccess = createAction(
  '[institutions] update institution faculty success',
  props<{ payload: any }>()
);

export const getAllInstitutionDegreeType = createAction(
  '[institutions] get institution degree type ',
  props<{
    payload: any;
  }>()
);

export const getAllInstitutionDegreeTypeSuccess = createAction(
  '[institutions] get institution degree type success',
  props<{ payload: any }>()
);
export const createDegreeTypeInInstitution = createAction(
  '[institutions] create institution degree type ',
  props<{
    payload: any;
  }>()
);

export const createDegreeTypeInInstitutionSuccess = createAction(
  '[institutions] create institution degree type success',
  props<{ payload: any }>()
);
export const updateDegreeTypeInInstitution = createAction(
  '[institutions] update institution degree type ',
  props<{
    payload: any;
  }>()
);

export const updateDegreeTypeInInstitutionSuccess = createAction(
  '[institutions] update institution degree type success',
  props<{ payload: any }>()
);

export const getAllInstitutionGrade = createAction(
  '[institutions] get institution grade ',
  props<{
    payload: any;
  }>()
);

export const getAllInstitutionGradeSuccess = createAction(
  '[institutions] get institution grade success',
  props<{ payload: any }>()
);
export const createGradeInInstitution = createAction(
  '[institutions] create institution grade ',
  props<{
    payload: any;
  }>()
);

export const createGradeInInstitutionSuccess = createAction(
  '[institutions] create institution grade success',
  props<{ payload: any }>()
);
export const updateGradeInInstitution = createAction(
  '[institutions] update institution grade ',
  props<{
    payload: any;
  }>()
);

export const updateGradeInInstitutionSuccess = createAction(
  '[institutions] update institution grade success',
  props<{ payload: any }>()
);

export const getFacultyAndDepartmentByInstitutionName = createAction(
  '[institutions] get faculty and department by institution name ',
  props<{
    payload: any;
  }>()
);

export const getFacultyAndDepartmentByInstitutionNameSuccess = createAction(
  '[institutions] get faculty and department by institution name success',
  props<{ payload: any }>()
);

export const getDegreeTypeWithInstitutionName = createAction(
  '[institutions] get degree type by institution name ',
  props<{
    name: any;
  }>()
);

export const getDegreeTypeWithInstitutionNameSuccess = createAction(
  '[institutions] get degree type by institution name success',
  props<{ payload: any }>()
);

export const getInstitutionTransactionTypeFilter = createAction(
  '[institutions] get Institution transaction type filter ',
  
);

export const getInstitutionTransactionTypeFilterSuccess = createAction(
  '[institutions] get Institution transaction type filter success',
  props<{ payload: any }>()
);

