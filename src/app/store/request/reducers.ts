import { createReducer, on } from '@ngrx/store';
import { getAllInstitutionGraduateRequestSuccess, getAllInstitutionOrganizationRequestSuccess, getAllOrganisationRequestSuccess, getAllRequestSuccess, invokeGetRequestDetailsSuccess } from './action';
import { RequestStateInterface } from './types/index.types';


const initialState: RequestStateInterface = {
  request: {
    data:
    {
      totalGraduateRequests: 0,
      completedRequests: 0,
      pendingRequests: 0,
      processingRequests: 0,
      graduatesRequests: []
    }, totalCount: 0
  },

  organisationRequest: {
    data: {
      totalOrganisationRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      organisationRequests: []
    },
    totalCount: 0
  },
  requestDetails : {
    dateRequested: '',
  requestId: 0,
  institutionId: 0,
  requestor: 1,
  requestorId: 0,
  profileImagePath: '',
  requestType: '',
  status: 0,
  paymentStatus: 1,
  copies: 0,
  graduteFullName: '',
  institutionName: '',
  programme: '',
  facultyName: '',
  department: '',
  degree: '',
  grade: '',
  yearOfEntry: '',
  yearOfGraduation: '',
  organisationName: '',
  organisationSector: '',
  organisationIndustry: '',
  destination: '',
  city: '',
  matricNo: '',
  documentType: '',
  deliveryOption: '',
  hardCopyDeliveryOptionVM: {
    id: 0,
    country: '',
    state: '',
    city: '',
    postalOrZipCode: '',
    destinationAddress: '',
    dispatchMethod: ''
  },
  fileUploadDeliveryOptionVM: {
    id: 0,
    urlAddress: '',
    loginUsername: '',
    loginPassword: ''
  },
  requestSupportingDocumentVM: [
    {
      supportingDocumentType: '',
      fileUploadVM: {
        id: '',
        name: '',
        path: '',
        contentType: ''
      },
      createdOn: '',
    }
  ],
  reasonForRequest: '',
  }

  

}

export const requestReducer = createReducer(
  initialState,
  on(getAllInstitutionGraduateRequestSuccess, (state, { payload }) => {
    return {
      ...state,
      request: payload
    }
  }),
  on(getAllInstitutionOrganizationRequestSuccess, (state, { payload }) => {
    return {
      ...state,
      organisationRequest: payload
    }
  }),
  on(getAllRequestSuccess, (state, { payload }) => {
    return {
      ...state,
      request: payload
    }
  }),
  on(getAllOrganisationRequestSuccess, (state, { payload }) => {
    return {
      ...state,
      organisationRequest: payload
    }
  }),
  on(invokeGetRequestDetailsSuccess, (state, { payload }) => {
    return {
      ...state,
      requestDetails: payload
    }
  })

)