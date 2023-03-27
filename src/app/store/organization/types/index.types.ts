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
  newOrganizationValidation: any;
  walletId: any;
  fundwallet: any;
  validateWalletPayment: any;
  subscriptionHistory: any;
  verificationHistory: any;
  organization: any;
  organizationTransaction: any;
  transactionDetails: any;
  message: string;
  downloadFile: any;
}
