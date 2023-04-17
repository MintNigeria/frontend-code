export interface RevenueGeneratedVM {
  totalRevenueFromGraduates: number;
  totalRevenueFromOrganizations: number;
  totalRevenueGenerated: number;
}

export interface RequestsDashboardVM {
  pendingRequests: number;
  completedRequests: number;
  totalRequests: number;
}

export interface TransactionsDashboardVM {
  totalAmountFromTransactions: number;
  totalAmountFromGraduateRequests: number;
  totalAmountFromOrganizationRequests: number;
}

export interface IDashboardCardInfo {
  revenueGeneratedVM: RevenueGeneratedVM;
  requestsDashboardVM: RequestsDashboardVM;
  transactionsDashboardVM: TransactionsDashboardVM;
}

export interface DashboardStateInterface {
  dashBoard: { data: Array<any>; totalCount: number };
  organizationDashboard: { data: Array<any>; totalCount: number };
  organizationBottomDashboard: any;
  organizationVerification: any;
  dashboardCardStats: IDashboardCardInfo | null,
  graduateTop: any;
  graduateBottom: any;
  institutionRevenueAnalysis: any;
  institutionTopInstitution: any;
}