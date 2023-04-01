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


  export const getAllInstitutionUpload = createAction(
    '[graduates] get all institution uploads',
    props<{
     payload : any
    }>()
    ); 

  export const getAllInstitutionUploadSuccess = createAction(
    '[graduates] get all institution upload Success',
    props<{
     payload : any
    }>()
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

    export const downloadRecordUploadFormat = createAction(
      '[Graduates] download graduate record upload file ',
      props<{
        payload: any;
      }>()
    );
    
    export const downloadRecordUploadFormatSuccess = createAction(
      '[Graduates] download graduate record upload file success',
      props<{ payload: any }>()
    );
    export const uploadGraduateRecord = createAction(
      '[Graduates] upload graduate records file ',
      props<{
        payload: any;
      }>()
    );
    
    export const uploadGraduateRecordSuccess = createAction(
      '[Graduates] upload graduate records file success',
      props<{ payload: any }>()
    );

    export const createGraduateRecord = createAction(
      '[Graduates] create graduate records ',
      props<{
        payload: any;
      }>()
    );
    
    export const createGraduateRecordSuccess = createAction(
      '[Graduates] create graduate records success',
      props<{ payload: any }>()
    );

    export const getAllGraduateRequestForGradaute = createAction(
      '[Graduates] get graduate request records for graduate ',
      props<{
        payload: any;
      }>()
    );
    
    export const getAllGraduateRequestForGradauteSuccess = createAction(
      '[Graduates] get graduate request records for graduate success',
      props<{ payload: any }>()
    );

    export const getAllGraduateRequestDetailForGradaute = createAction(
      '[Graduates] get graduate request detail records for graduate ',
      props<{
        requestId: any;
      }>()
    );
    
    export const getAllGraduateRequestDetailForGradauteSuccess = createAction(
      '[Graduates] get graduate request detail records for graduate success',
      props<{ payload: any }>()
    );

    export const getGraduateWalletId = createAction(
      '[Graduates] get graduate wallet ',
    );
    
    export const getGraduateWalletIdSuccess = createAction(
      '[Graduates] get graduate wallet success',
      props<{ payload: any }>()
      );
      
      export const getGraduateTransactionHistory = createAction(
        '[Graduates] get graduate transaction history wallet ',
        props<{ payload: any }>()
    );
    
    export const getGraduateTransactionHistorySuccess = createAction(
      '[Graduates] get graduate transaction history wallet success',
      props<{ payload: any }>()
    );
      
      export const registerNewGraduate = createAction(
        '[Graduates] create new graduate ',
        props<{ payload: any }>()
    );
    
    export const registerNewGraduateSuccess = createAction(
      '[Graduates] create new graduate success',
      props<{ payload: any }>()
    );
      
      export const validateGraduateRegistration = createAction(
        '[Graduates] validate graduate registration ',
        props<{ payload: any }>()
    );
    
    export const validateGraduateRegistrationSuccess = createAction(
      '[Graduates] validate graduate registration success',
      props<{ payload: any }>()
    );
      
      export const fundGraduateWallet = createAction(
        '[Graduates] fund graduate wallet ',
        props<{ payload: any }>()
    );
    
    export const fundGraduateWalletSuccess = createAction(
      '[Graduates] fund graduate wallet success',
      props<{ payload: any }>()
    );
      
      export const uploadHubItem = createAction(
        '[Graduates] upload  hub item ',
        props<{ payload: any }>()
    );
    
    export const uploadHubItemSuccess = createAction(
      '[Graduates] upload  hub item success',
      props<{ payload: any }>()
    );
      
      export const getAllHubItem = createAction(
        '[Graduates] get all hub item ',
        props<{ payload: any }>()
    );
    
    export const getAllHubItemSuccess = createAction(
      '[Graduates] get all hub item success',
      props<{ payload: any }>()
    );
      
      export const notifyMyInstitution = createAction(
        '[Graduates] notify my institution ',
        props<{ payload: any }>()
    );
    
    export const notifyMyInstitutionSuccess = createAction(
      '[Graduates] notify my institution success',
      props<{ payload: any }>()
    );
      
      export const getMyInstitutionNotified = createAction(
        '[Graduates] get my notification to my institution ',
        props<{ id: any }>()
    );
    
    export const getMyInstitutionNotifiedSuccess = createAction(
      '[Graduates] get my notification to my institution success',
      props<{ payload: any }>()
    );
      
      export const getGraduateInstitutions = createAction(
        '[Graduates] get graduate institutions ',
        props<{ id: any }>()
    );
    
    export const getGraduateInstitutionsSuccess = createAction(
      '[Graduates] get graduate institutions success',
      props<{ payload: any }>()
    );
      
      export const getGraduateProfile = createAction(
        '[Graduates] get graduate profile ',
        props<{ id: any }>()
    );
    
    export const getGraduateProfileSuccess = createAction(
      '[Graduates] get graduate profile success',
      props<{ payload: any }>()
    );
      
      export const updateGraduateInstitutions = createAction(
        '[Graduates] update graduate institution ',
        props<{ payload: any, id: any }>()
    );
    
    export const updateGraduateInstitutionsSuccess = createAction(
      '[Graduates] update graduate institution success',
      props<{ payload: any }>()
    );
      
      export const updateGraduateProfile = createAction(
        '[Graduates] update graduate profile ',
        props<{ payload: any }>()
    );
    
    export const updateGraduateProfileSuccess = createAction(
      '[Graduates] update graduate profile success',
      props<{ payload: any }>()
    );
      
      export const getGraduateCertificateVerifications = createAction(
        '[Graduates] get graduate certificate verifications ',
        props<{ payload: any }>()
    );
    
    export const getGraduateCertificateVerificationsSuccess = createAction(
      '[Graduates] get graduate certificate verifications success',
      props<{ payload: any }>()
    );