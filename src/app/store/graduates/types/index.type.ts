export interface IGraduateDetails {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    userType: number;
    address: string;
    gender: number;
    stateId: number;
    state: string;
    lgaId: number;
    lga: string;
    profileImagePath: string;
    genderString: string;
    dateOfBirth: string;
    is2FAEnabled: boolean;
    imei?: any;
    serialNumber?: any;
    device?: any;
    ipAddress?: any;
}

export interface CreateAuditVM {
  imei: string;
  serialNumber: string;
  device: string;
  ipAddress: string;
}
export interface IGraduateApproveReject {
  approvalRequestId: number;
  stage: string;
  comment: string;
  createAuditVM: CreateAuditVM;
}

export interface GraduatesStateInterface {
    gradautes: { data: Array<any>; totalCount: number };
    pendingGradautes: { data: Array<any>; totalCount: number };
    graduateDetail: IGraduateDetails | null;
    downloadFile: any;
    recorduploads: any;
    graduateRecord: any;
  graduateRecordUploadFormat: any;
  uploadRecord: any;
  createGraduaterecord: any;
  graduateRequestRecord: any;
  graduateRequestDetailsRecord: any;
  graduatewallet: any;
  graduateTransactionHistory: any;
  registerGraduate: any;
  validateRegistration: any;
  fundwallet: any;
  hubItems: any;
  uploadHubItems: any;
  notifyInstitutition: any;
  institutionNotified: any;
  graduateProfile: any;
  graduateInstitutions: any;
  updateInstitutions: any;
  updateprofile: any;
  gradauteVerifications: any;
  deleteHubItems: any;
  verificationDetails: any;
  searchRecord: any;
  transactionType: any;
  documentType: any;
  createGraduateApplication: any;
  submitverificationRequest: any;
  submitVerificationRequest: any;
  exportApplicationExcel: any;
  exportApplicationCSV: any;
  exportVerificationExcel: any;
  exportVerificationCSV: any;
  exportTransactionExcel: any;
  exportTransactionCSV: any;
  activeDeliveryoptions: any;
  }