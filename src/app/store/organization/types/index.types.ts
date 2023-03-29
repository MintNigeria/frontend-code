export interface CreateAuditVM {
  imei: string;
  serialNumber: string;
  device: string;
  ipAddress: string;
}
export interface IOrganizationApproveReject {
  approvalRequestId: number;
  stage: string;
  comment: string;
  createAuditVM: CreateAuditVM;
}

export interface OrganizationStateInterface {
  organizations: { data: Array<any>; totalCount: number };
  newOrganization: any;
  updateOrganization: any;
  newOrganizationValidation: any;
  walletId: any;
  fundwallet: any;
  validateWalletPayment: any;
  subscriptionHistory: any;
  verificationHistory: any;
  verificationHistoryData: any;
  verifyRecord: any;
  organization: any;
  requestReason: any;
  makePayment: any;
  searchpool: any;
  searchpoolresult: any;
  newPoolSearch: any;
  departmentDegree: any;
  orgIndustryAndSectorName: any;
  organizationTransaction: any;
  historyInstitution: any;
  profile: any;
  transactionDetails: any;
  message: string;
  downloadFile: any;
}
