import { createAction, props } from '@ngrx/store';


export const getAllDashboard = createAction (
  '[dashboard] get all dashboard',
  props<{
    dashboardStatus: number;
    keyword: string;
    filter: string;
    pageSize: number;
    pageIndex: number;
  }>()
)

export const getAllDashboardInfoData = createAction (
  '[dashboard] get all dashboard card info',
  props<{
    payload: any
  }>()
)


export const getAllDashboardSuccess = createAction (
  '[dashboard] get all dashboard Success',
  props<{payload: any}>()
)
export const getAllDashboardInfoSuccess = createAction (
  '[dashboard] get all dashboard card Success',
  props<{payload: any}>()
)
export const getDashboardRevenueAnalysis = createAction (
  '[dashboard] get dashboard revenue analysis',
  props<{payload: any}>()
)
export const getDashboardRevenueAnalysisSuccess = createAction (
  '[dashboard] get dashboard revenue analysis Success',
  props<{payload: any}>()
)

export const getDashboardTopInstitutions = createAction (
  '[dashboard] get dashboard top institution request',
  props<{payload: any}>()
)
export const getDashboardTopInstitutionsSuccess = createAction (
  '[dashboard] get dashboard top institution request Success',
  props<{payload: any}>()
)

export const getOrganizationDashboardInfo = createAction (
  '[dashboard] get organization dashboard info',
  props<{payload: any}>()
)
export const getOrganizationDashboardInfoSuccess = createAction (
  '[dashboard] get organization dashboard info Success',
  props<{payload: any}>()
)
export const getOrganizationDashboardBottomInfo = createAction (
  '[dashboard] get organization dashboard bottom info',
  props<{payload: any}>()
)
export const getOrganizationDashboardBottomInfoSuccess = createAction (
  '[dashboard] get organization dashboard bottom info Success',
  props<{payload: any}>()
)

export const getOrganizationVeficiationAnalysis = createAction (
  '[dashboard] get organization verification analysis info',
  props<{payload: any}>()
)
export const getOrganizationVeficiationAnalysisSuccess = createAction (
  '[dashboard] get organization verification analysis info',
  props<{payload: any}>()
)