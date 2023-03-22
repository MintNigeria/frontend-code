
export interface IGraduateRequest {
  totalGraduateRequests:number,
  completedRequests:number,
  pendingRequests:number,
  processingRequests:number,
  graduatesRequests: Array<Request>
}

export interface Request {
  dateRequested: string,
  requestId:number,
  institutionId:number,
  requestor: 1,
  requestorId:number,
  profileImagePath: string,
  requestType: string,
  status:number,
  paymentStatus: 1,
  copies:number,
  graduteFullName: string,
  institutionName: string,
  programme: string,
  facultyName: string,
  department: string,
  degree: string,
  grade: string,
  yearOfEntry: string,
  yearOfGraduation: string,
  organisationName: string,
  organisationSector: string,
  organisationIndustry: string,
  destination: string,
  city: string,
  matricNo: string,
  documentType: string,
  deliveryOption: string,
  hardCopyDeliveryOptionVM: {
    id:number,
    country: string,
    state: string,
    city: string,
    postalOrZipCode: string,
    destinationAddress: string,
    dispatchMethod: string
  },
  fileUploadDeliveryOptionVM: {
    id:number,
    urlAddress: string,
    loginUsername: string,
    loginPassword: string
  },
  requestSupportingDocumentVM: [
    {
      supportingDocumentType: string,
      fileUploadVM: {
        id: string
        name: string,
        path: string,
        contentType: string
      },
      createdOn: string
    }
  ],
  reasonForRequest: string
}

export interface IOrganizationRequest{
    totalOrganisationRequests: number,
    successfulRequests: number,
    failedRequests: number,
    organisationRequests: Array<Organisation>
}

export interface Organisation   {
  dateRequested: string,
  requestId: number,
  institutionId: number,
  requestor: 1,
  requestorId: number,
  profileImagePath: string,
  requestType: string,
  status: number,
  paymentStatus: 1,
  copies: number,
  graduteFullName: string,
  institutionName: string,
  programme: string,
  facultyName: string,
  department: string,
  degree: string,
  grade: string,
  yearOfEntry: string,
  yearOfGraduation: string,
  organisationName: string,
  organisationSector: string,
  organisationIndustry: string,
  destination: string,
  city: string,
  matricNo: string,
  documentType: string,
  deliveryOption: string,
  hardCopyDeliveryOptionVM: {
    id: number,
    country: string,
    state: string,
    city: string,
    postalOrZipCode: string,
    destinationAddress: string,
    dispatchMethod: string
  },
  fileUploadDeliveryOptionVM: {
    id: number,
    urlAddress: string,
    loginUsername: string,
    loginPassword: string
  },
  requestSupportingDocumentVM: [
    {
      supportingDocumentType: string,
      fileUploadVM: {
        id: string,
        name: string,
        path: string,
        contentType: string
      },
      createdOn: string
    }
  ],
  reasonForRequest: string
}




export interface RequestStateInterface {
  request: { data: any; totalCount: number };
  requestDetails: Request | null;
  organisationRequest : {data : any; totalCount : number}
}
