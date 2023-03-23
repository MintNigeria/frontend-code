import { createAction, props } from '@ngrx/store';
import { ICreateInstitutionType, IUpdateInstitutionType } from './types/index.types';

export const getAllConfiguration = createAction(
  '[configuration] get all configuration',
  props<{
    configurationStatus: number;
    keyword: string;
    filter: string;
    pageSize: number;
    pageIndex: number;
  }>()
);

export const getAllConfigurationSuccess = createAction(
  '[configuration] get all configuration Success',
  props<{ payload: any }>()
);

export const getAllDocumentType = createAction(
  '[configuration] get all document type'
);

export const getAllDocumentTypeSuccess = createAction(
  '[configuration] get all document type Success',
  props<{ payload: any[] }>()
);

export const createDocumentType = createAction(
  '[configuration] create document type',
  props<{
    documentName: string;
    description: string;
    deliveryOptions: number[];
  }>()
);

export const getSuccessMessage = createAction(
  '[configuration] get success message',
  props<{ message: string }>()
);

export const getAllPaymentPlans = createAction(
  '[configuration] get all payment plan'
);

export const getAllPaymentPlansSuccess = createAction(
  '[configuration] get all payment plan Success',
  props<{ payload: any[] }>()
);

export const updatePaymentPlans = createAction(
  '[configuration] update payment plan',
  props<{ payload: any[] }>()
);

export const getInstitutionSelector = createAction(
  '[configuration] get all institution selector'
);

export const getInstitutionSelectorSuccess = createAction(
  '[configuration] get all institution selector success',
  props<{payload : any}>()
);

export const getInstitutiontype = createAction(
  '[configuration] get all institution type'
);

export const getInstitutiontypeSuccess = createAction(
  '[configuration] get all institution type success',
  props<{payload : any}>()
);
export const getInstitutionbody = createAction(
  '[configuration] get all institution body'
);

export const getInstitutionbodySuccess = createAction(
  '[configuration] get all institution body success',
  props<{payload : any}>()
);

export const getInstitutionName = createAction(
  '[configuration] get all institution Name'
);

export const getInstitutionNameSuccess = createAction(
  '[configuration] get all institution Name success',
  props<{payload : any}>()
);

export const createInstitutionRecord = createAction(
  '[configuration] create institution Record',
  props<{payload : any}>()
)

export const createInstitutionRecordSuccess = createAction(
  '[configuration] create institution Record success' ,
  props<{payload : any}>()
)

export const updateInstitutionRecord = createAction(
  '[configuration] update institution Record',
  props<{payload : any}>()
)

export const updateInstitutionRecordSuccess = createAction(
  '[configuration] update institution Record success' ,
  props<{payload : any}>()
)


export const createInstitutionType = createAction(
  '[configuration] create institution type',
  props<{payload : ICreateInstitutionType}>()
)

export const createInstitutionTypeSuccess = createAction(
  '[configuration] create institution type success' ,
  props<{payload : any}>()
)

export const updateInstitutionType = createAction(
  '[configuration] update institution type',
  props<{payload : IUpdateInstitutionType}>()
)

export const updateInstitutionTypeSuccess = createAction(
  '[configuration] update institution type success' ,
  props<{payload : any}>()
)



export const createInstitutionBody = createAction(
  '[configuration] create institution body',
  props<{payload : ICreateInstitutionType}>()
)

export const createInstitutionBodySuccess = createAction(
  '[configuration] create institution body success' ,
  props<{payload : any}>()
)

export const updateInstitutionBody = createAction(
  '[configuration] update institution body',
  props<{payload : IUpdateInstitutionType}>()
)

export const updateInstitutionBodySuccess = createAction(
  '[configuration] update institution body success' ,
  props<{payload : any}>()
)


export const createInstitutionSector = createAction(
  '[configuration] create institution sector',
  props<{payload : ICreateInstitutionType}>()
)

export const createInstitutionSectorSuccess = createAction(
  '[configuration] create institution Sector success' ,
  props<{payload : any}>()
)
export const updateInstitutionSector = createAction(
  '[configuration] update institution sector',
  props<{payload : IUpdateInstitutionType}>()
)

export const updateInstitutionSectorSuccess = createAction(
  '[configuration] update institution sector success' ,
  props<{payload : any}>()
)




export const createOrganisationIndustry = createAction(
  '[configuration] create institution Industry industry',
  props<{payload : ICreateInstitutionType}>()
)

export const createOrganisationIndustrySuccess = createAction(
  '[configuration] create Organisation Industry success' ,
  props<{payload : any}>()
)
export const updateOrganisationIndustry = createAction(
  '[configuration] update Organisation Industry',
  props<{payload : IUpdateInstitutionType}>()
)

export const updateOrganisationIndustrySuccess = createAction(
  '[configuration] update institution Industry success' ,
  props<{payload : any}>()
)
export const getOrganisationIndustry = createAction(
  '[configuration] get organisation industry'
)

export const getOrganisationIndustrySuccess = createAction(
  '[configuration] get organisation industry Success',
  props<{payload : any}>()
)

export const createOrganisationSector = createAction(
  '[configuration] create organisation sector',
  props<{payload : ICreateInstitutionType}>()
)

export const createOrganisationSectorSuccess = createAction(
  '[configuration] create Organisation Sector success' ,
  props<{payload : any}>()
)
export const updateOrganisationSector = createAction(
  '[configuration] update Organisation sector',
  props<{payload : IUpdateInstitutionType}>()
)

export const updateOrganisationSectorSuccess = createAction(
  '[configuration] update institution sector success' ,
  props<{payload : any}>()
)

export const getOrganisationSector = createAction(
  '[configuration] get organisation sector'
)

export const getOrganisationSectorSuccess = createAction(
  '[configuration] get organisation sector Success',
  props<{payload : any}>()
)

export const getInstitutionConfiguration = createAction(
  '[configuration] get institution configuration',
  props<{ institutionId: any }>()
);

export const getInstitutionConfigurationSuccess = createAction(
  '[configuration] gget institution configuration Success',
  props<{payload : any}>()
)
