import { createReducer, on } from '@ngrx/store';
import { getAllDashboardInfoData, getAllDashboardInfoSuccess, getAllDashboardSuccess, getDashboardRevenueAnalysisSuccess, getDashboardTopInstitutionsSuccess } from './action';
import { DashboardStateInterface } from './types/index.types';


const initialState: DashboardStateInterface = {
  dashBoard: { data: [], totalCount: 0 },
  dashboardCardStats: {
    revenueGeneratedVM: {
      totalRevenueFromGraduates: 0,
      totalRevenueFromOrganizations: 0,
      totalRevenueGenerated: 0
    },
    requestsDashboardVM: {
      pendingRequests: 0,
        completedRequests: 0,
        totalRequests: 0,
    },
    transactionsDashboardVM: {
      totalAmountFromTransactions: 0,
        totalAmountFromGraduateRequests: 0,
        totalAmountFromOrganizationRequests: 0
    }
  }
}

export const dashboardReducer = createReducer (
  initialState,
  on(getAllDashboardSuccess, (state, {payload})=> {
    return {
      ...state,
      dashBoard: payload
    }
  }),
  on(getAllDashboardInfoSuccess, (state, {payload})=> {
    return {
      ...state,
      dashboardCardStats: payload
    }
  }),
  on(getDashboardRevenueAnalysisSuccess, (state, {payload})=> {
    return {
      ...state,
      dashBoard: payload
    }
  }),
  on(getDashboardTopInstitutionsSuccess, (state, {payload})=> {
    return {
      ...state,
      dashBoard: payload
    }
  }),

)