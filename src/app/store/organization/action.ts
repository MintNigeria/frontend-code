import { createAction, props } from '@ngrx/store';
import { IOrganizationApproveReject } from './types/index.types';

export const registerOrganization = createAction(
  '[organization] register new organization',
  props<{
   payload: any
  }>()
);

export const registerOrganizationSuccess = createAction(
  '[organization] register new organization success',
  props<{
   payload: any
  }>()
);

export const updateOrganization = createAction(
  '[organization] update organization',
  props<{
   payload: any
  }>()
);

export const updateOrganizationSuccess = createAction(
  '[organization] update organization success',
  props<{
   payload: any
  }>()
);

export const validateOrganizationCode = createAction(
  '[organization] validate new organization OTP',
  props<{
   payload: any
  }>()
);

export const validateOrganizationCodeSuccess = createAction(
  '[organization] validate new organization OTP success',
  props<{
   payload: any
  }>()
);

export const getOrganizationWalletId = createAction(
  '[organization] get organization wallet id',
  props<{
    id: string;
  }>()
);
export const getOrganizationWalletIdSuccess = createAction(
  '[organization] get organization wallet id success',
  props<{ payload: any }>()
);

export const fundOrganizationWallet = createAction(
  '[organization] fund organization wallet',
  props<{
    payload: any;
  }>()
);
export const fundOrganizationWalletSuccess = createAction(
  '[organization] fund organization wallet success',
  props<{ payload: any }>()
);
export const validateOrganizationFundWallet = createAction(
  '[organization] validate fund organization wallet',
  props<{
    payload: any;
  }>()
);

export const validateOrganizationFundWalletSuccess = createAction(
  '[organization] validate fund organization wallet success',
  props<{ payload: any }>()
);
export const getOrganizationSubscriptionHistory = createAction(
  '[organization] get organization subscription history',
  props<{
    payload: any;
  }>()
);

export const getOrganizationSubscriptionHistorySuccess = createAction(
  '[organization] get organization subscription history success',
  props<{ payload: any }>()
);

export const getOrganizationVerificationHistory = createAction(
  '[organization] get organization verification history',
  props<{
    payload: any;
  }>()
);

export const getOrganizationVerificationHistorySuccess = createAction(
  '[organization] get organization verification history success',
  props<{ payload: any }>()
);

export const getOrganizationVerificationHistoryData = createAction(
  '[organization] get organization verification history data',
  props<{
    id: any;
  }>()
);

export const getOrganizationVerificationHistoryDataSuccess = createAction(
  '[organization] get organization verification history data success',
  props<{ payload: any }>()
);

export const verifyGraduateRecord = createAction(
  '[organization] verify graduate record',
  props<{
    payload: any;
  }>()
);

export const verifyGraduateRecordSuccess = createAction(
  '[organization] verify graduate record success',
  props<{ payload: any }>()
);

export const organizationProfile = createAction(
  '[organization] get organization profile',
  props<{
    id: any;
  }>()
);

export const organizationProfileSuccess = createAction(
  '[organization] get organization profile success',
  props<{ payload: any }>()
);

export const verifyHistoryInstitutionDropdown = createAction(
  '[organization] get institution list for verification history',
  props<{
    id: any;
  }>()
);

export const verifyHistoryInstitutionDropdownSuccess = createAction(
  '[organization] get institution list for verification history success',
  props<{ payload: any }>()
);

export const organizationSectorAndIndustry = createAction(
  '[organization] get organization industry and sector name for verification purpose',
  props<{
    id: any;
  }>()
);

export const organizationSectorAndIndustrySuccess = createAction(
  '[organization] get organization industry and sector name for verification purpose success',
  props<{ payload: any }>()
);

export const reasonForRequest = createAction(
  '[organization] reason for request',
 
);

export const reasonForRequestSuccess = createAction(
  '[organization] reason for request success',
  props<{ payload: any }>()
  );
  
  export const makePayment = createAction(
    '[organization] Make payment',
    props<{ payload: any }>()
 
);

export const makePaymentSuccess = createAction(
  '[organization] Make payment success',
  props<{ payload: any }>()
);
  
  export const getAlltalentSearchPool = createAction(
    '[organization] get talent search pool',
    props<{ payload: any }>()
 
);

export const getAlltalentSearchPoolSuccess = createAction(
  '[organization] get talent search pool success',
  props<{ payload: any }>()
);
  
  export const getAlltalentSearchPoolResult = createAction(
    '[organization] get talent search pool result',
    props<{ payload: any }>()
 
);

export const getAlltalentSearchPoolResultSuccess = createAction(
  '[organization] get talent search pool result success',
  props<{ payload: any }>()
);
  
  export const getDepartmentGrades = createAction(
    '[organization] get institution department grades',
    props<{ institutionId: any, departmentId: any }>()
 
);

export const getDepartmentGradesSuccess = createAction(
  '[organization] get institution department grades success',
  props<{ payload: any }>()
);
  
  export const newTalentPoolSearch = createAction(
    '[organization] new talent pool search',
    props<{payload: any }>()
 
);

export const newTalentPoolSearchSuccess = createAction(
  '[organization] new talent pool search success',
  props<{ payload: any }>()
);

// ///////////////////////

export const getAllOrganization = createAction(
  '[organization] get all organization',
  props<{
    organizationStatus: number;
    keyword: string;
    filter: string;
    pageSize: number;
    pageIndex: number;
  }>()
);

export const getAllOrganizationSuccess = createAction(
  '[organization] get all organization Success',
  props<{ payload: { data: any[]; totalCount: number } }>()
);

export const invokeGetOrganization = createAction(
  '[organization] get single organization',
  props<{
    id: string;
  }>()
);
export const invokeGetOrganizationSuccess = createAction(
  '[organization] get single organization success',
  props<{ payload: any }>()
);



export const invokeOrganizationTransactions = createAction(
  '[transaction] get all organization transactions',
  props<{
    id: string;
    keyword: string;
    filter: string;
    pageSize: number;
    pageIndex: number;
  }>()
);

export const invokeOrganizationTransactionsSuccess = createAction(
  '[transaction] get all organization transactions Success',
  props<{ payload: any }>()
);

export const invokeGetOrganizationTransactionDetails = createAction(
  '[transaction] get single organization transaction details',
  props<{
    id: string;
  }>()
);

export const invokeGetOrganizationTransactionDetailsSuccess = createAction(
  '[transaction] get single organization transaction details Success',
  props<{ payload: any }>()
);

export const getAllPendingOrganization = createAction(
  '[organization] get all pending organization',
  props<{
    keyword: string;
    filter: string;
    pageSize: number;
    pageIndex: number;
  }>()
);

export const approveOrganizationRequest = createAction(
  '[organization] approve pending organization request',
  props<{ payload: IOrganizationApproveReject }>()
);

export const approveOrganizationRequestSuccess = createAction(
  '[organization] approve pending organization request',
  props<{ message: string }>()
);

export const declineOrganizationRequest = createAction(
  '[organization] decline pending organization request',
  props<{ payload: IOrganizationApproveReject }>()
);

export const declineOrganizationRequestSuccess = createAction(
  '[organization] decline pending organization request',
  props<{ message: string }>()
);

export const downloadOrganizationCSV = createAction(
  '[organization] download organization CSV File',
  props<{
   payload : any
  }>()
  ); 

export const downloadOrganizationCSVSuccess = createAction(
  '[orgnization] download organization CSV File success',
  props<{
   payload : any
  }>()
  );

  export const downloadOrganizationExcel = createAction(
    '[organization] download organization Excel File',
    props<{
     payload : any
    }>()
    ); 
  
  export const downloadOrganizationExcelSuccess = createAction(
    '[orgnization] download organization Excel File success',
    props<{
     payload : any
    }>()
    );
  
