import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, from, map, mergeMap, switchMap, take } from 'rxjs';
import { AppResponseInterface } from 'src/app/types/appState.interface';
import { setAPIResponseMessage } from '../shared/app.action';
import { getAllDashboard, getAllDashboardInfoData, getAllDashboardInfoSuccess, getAllDashboardSuccess, getDashboardRevenueAnalysis, getDashboardRevenueAnalysisSuccess, getDashboardTopInstitutions, getDashboardTopInstitutionsSuccess, getGraduateDashboardBottomData, getGraduateDashboardBottomDataSuccess, getGraduateDashboardTopData, getGraduateDashboardTopDataSuccess, getOrganizationDashboardBottomInfo, getOrganizationDashboardBottomInfoSuccess, getOrganizationDashboardInfo, getOrganizationDashboardInfoSuccess, getOrganizationVeficiationAnalysis, getOrganizationVeficiationAnalysisSuccess } from './action';
import { DashboardService } from 'src/app/core/services/dashboard/dashboard.service';

@Injectable()
export class DashboardEffects {
  constructor(
    private action$: Actions,
    private dashboardService: DashboardService,
    private appStore: Store<AppResponseInterface>
  ) {}

  getDashboard$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getAllDashboard),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIResponseMessage({
            apiResponseMessage: {
              apiResponseMessage: '',
              isLoading: true,
              isApiSuccessful: false,
            },
          })
        );
        const { dashboardStatus, keyword, filter, pageSize, pageIndex } =
          action;
        return this.dashboardService
          .getAllDashboard(
            dashboardStatus,
            keyword,
            filter,
            pageSize,
            pageIndex
          )
          .pipe(
            map((data) => {
              this.appStore.dispatch(
                setAPIResponseMessage({
                  apiResponseMessage: {
                    apiResponseMessage: '',
                    isLoading: false,
                    isApiSuccessful: true,
                  },
                })
              );
              // read data and update payload
              return getAllDashboardSuccess({
                payload: data.payload
                  ? { data: data.payload, totalCount: data.totalCount }
                  : { data: [], totalCount: 0 },
              });
            })
          );
      })
    );
  });

  getAllDashboardInfoData$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getAllDashboardInfoData),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIResponseMessage({
            apiResponseMessage: {
              apiResponseMessage: '',
              isLoading: true,
              isApiSuccessful: false,
            },
          })
        );
        
        return this.dashboardService
          .getAllDashboardInfoData(
            action.payload
          )
          .pipe(
            map((data) => {
              this.appStore.dispatch(
                setAPIResponseMessage({
                  apiResponseMessage: {
                    apiResponseMessage: '',
                    isLoading: false,
                    isApiSuccessful: true,
                  },
                })
              );
              // read data and update payload
              return getAllDashboardInfoSuccess({
                payload: data.payload
                 
              });
            })
          );
      })
    );
  });

  getDashboardRevenueAnaylysis$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getDashboardRevenueAnalysis),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIResponseMessage({
            apiResponseMessage: {
              apiResponseMessage: '',
              isLoading: true,
              isApiSuccessful: false,
            },
          })
        );
        
        return this.dashboardService
          .getDashboardRevenueAnalysis(
            action.payload
          )
          .pipe(
            map((data) => {
              this.appStore.dispatch(
                setAPIResponseMessage({
                  apiResponseMessage: {
                    apiResponseMessage: '',
                    isLoading: false,
                    isApiSuccessful: true,
                  },
                })
              );
              const formatDaily = (data = []) => {
                const CMsun = 'SUN';
                const CMmon = 'MON';
                const CMtue = 'TUE';
                const CMwed = 'WED';
                const CMthr = 'THUR';
                const CMfri = 'FRI';
                const CMsat = 'SAT';
              
                let vlsun = 0;
                let vlmon = 0;
                let vltue = 0;
                let vlwed = 0;
                let vlthr = 0;
                let vlfri = 0;
                let vlsat = 0;
              
                const completedRequest = [];
                const completedValue = [];
                data.forEach((x: any) => {
                  if (x.dayOfTheWeek === 'Monday') {
                    vlmon += x.requests || x.requests;
                  }
                  if (x.dayOfTheWeek === 'Tuesday') {
                    vltue += x.requests || x.requests;
                  }
                  if (x.dayOfTheWeek === 'Wednesday') {
                    vlwed += x.requests || x.requests;
                  }
                  if (x.dayOfTheWeek === 'Thursday') {
                    vlthr += x.requests || x.requests;
                  }
                  if (x.dayOfTheWeek === 'Friday') {
                    vlfri += x.requests || x.requests;
                  }
                  if (x.dayOfTheWeek === 'Saturday') {
                    vlsat += x.requests || x.requests;
                  }
                  if (x.dayOfTheWeek === 'Sunday') {
                    vlsun += x.requests || x.requests;
                  }
                });
                completedRequest.push(CMsun, CMmon, CMtue, CMwed, CMthr, CMfri, CMsat);
                completedValue.push(vlsun, vlmon, vltue, vlwed, vlthr, vlfri, vlsat);
                return {
                  completedRequest,
                  completedValue,
                };
              };
              
              const formatMonth = (data = []) => {
                const CMjan = 'JAN';
                const CMfeb = 'FEB';
                const CMmar = 'MAR';
                const CMapr = 'APR';
                const CMmay = 'MAY';
                const CMjun = 'JUN';
                const CMjul = 'JUL';
                const CMaug = 'AUG';
                const CMsep = 'SEP';
                const CMoct = 'OCT';
                const CMnov = 'NOV';
                const CMdec = 'DEC';
              
                let vlJan = 0;
                let vlFeb = 0;
                let vlMar = 0;
                let vlApr = 0;
                let vlMay = 0;
                let vlJun = 0;
                let vlJul = 0;
                let vlAug = 0;
                let vlSep = 0;
                let vlOct = 0;
                let vlNov = 0;
                let vlDec = 0;
              
                const completedRequest = [];
                const completedValue = [];
                data.forEach((x: any) => {
                  if (x.month === 'Feb') {
                    vlFeb += x.requests || x.requests;
                  }
                  if (x.month === 'Mar') {
                    vlMar += x.requests || x.requests;
                  }
                  if (x.month === 'Apr') {
                    vlApr += x.requests || x.requests;
                  }
                  if (x.month === 'May') {
                    vlMay += x.requests || x.requests;
                  }
                  if (x.month === 'Jun') {
                    vlJun += x.requests || x.requests;
                  }
                  if (x.month === 'Jul') {
                    vlJul += x.requests || x.requests;
                  }
                  if (x.month === 'Aug') {
                    vlAug += x.requests || x.requests;
                  }
                  if (x.month === 'Sep') {
                    vlSep += x.requests || x.requests;
                  }
                  if (x.month === 'Oct') {
                    vlOct += x.requests || x.requests;
                  }
                  if (x.month === 'Nov') {
                    vlNov += x.requests || x.requests;
                  }
                  if (x.month === 'Dec') {
                    vlDec += x.requests || x.requests;
                  }
                  if (x.month === 'Jan') {
                    vlJan += x.requests || x.requests;
                  }
                });
                completedRequest.push(
                  CMjan,
                  CMfeb,
                  CMmar,
                  CMapr,
                  CMmay,
                  CMjun,
                  CMjul,
                  CMaug,
                  CMsep,
                  CMoct,
                  CMnov,
                  CMdec,
                );
                completedValue.push(
                  vlJan,
                  vlFeb,
                  vlMar,
                  vlApr,
                  vlMay,
                  vlJun,
                  vlJul,
                  vlAug,
                  vlSep,
                  vlOct,
                  vlNov,
                  vlDec,
                );
                return {
                  completedRequest,
                  completedValue,
                };
              };

              let revenueStatisticsBar = {};
		if (action.payload === 1) {
			revenueStatisticsBar = formatDaily(data.payload.requestStatisticsVms);
		}
		if (action.payload === 0) {
			revenueStatisticsBar = formatMonth(data.payload.requestStatisticsVms);
		}
        
		data.payload.revenueStatisticsBar = revenueStatisticsBar;
              // read data and update payload
              return getDashboardRevenueAnalysisSuccess({
                payload: data.payload
                 
              });
            })
          );
      })
    );
  });

  getDashboardTopInstitutions$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getDashboardTopInstitutions),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIResponseMessage({
            apiResponseMessage: {
              apiResponseMessage: '',
              isLoading: true,
              isApiSuccessful: false,
            },
          })
        );
        
        return this.dashboardService
          .getDashboardTopInstitutions(
            action.payload
          )
          .pipe(
            map((data) => {
              this.appStore.dispatch(
                setAPIResponseMessage({
                  apiResponseMessage: {
                    apiResponseMessage: '',
                    isLoading: false,
                    isApiSuccessful: true,
                  },
                })
              );
              // read data and update payload
              return getDashboardTopInstitutionsSuccess({
                payload: data.payload
                 
              });
            })
          );
      })
    );
  });

  getOrganizationDashboardInfo$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getOrganizationDashboardInfo),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIResponseMessage({
            apiResponseMessage: {
              apiResponseMessage: '',
              isLoading: true,
              isApiSuccessful: false,
            },
          })
        );
        
        return this.dashboardService
          .getOrganizationDashboardInfo(
            action.payload
          )
          .pipe(
            map((data) => {
              this.appStore.dispatch(
                setAPIResponseMessage({
                  apiResponseMessage: {
                    apiResponseMessage: '',
                    isLoading: false,
                    isApiSuccessful: true,
                  },
                })
              );
              // read data and update payload
              return getOrganizationDashboardInfoSuccess({
                payload: data.payload
                 
              });
            })
          );
      })
    );
  });

  getOrganizationDashboardBottomInfo$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getOrganizationDashboardBottomInfo),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIResponseMessage({
            apiResponseMessage: {
              apiResponseMessage: '',
              isLoading: true,
              isApiSuccessful: false,
            },
          })
        );
        
        return this.dashboardService
          .getOrganizationBottomInfo(
            action.payload
          )
          .pipe(
            map((data) => {
              this.appStore.dispatch(
                setAPIResponseMessage({
                  apiResponseMessage: {
                    apiResponseMessage: '',
                    isLoading: false,
                    isApiSuccessful: true,
                  },
                })
              );
              // read data and update payload
              return getOrganizationDashboardBottomInfoSuccess({
                payload: data.payload
                 
              });
            })
          );
      })
    );
  });

  getGraduateDashboardTopData$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getGraduateDashboardTopData),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIResponseMessage({
            apiResponseMessage: {
              apiResponseMessage: '',
              isLoading: true,
              isApiSuccessful: false,
            },
          })
        );
        
        return this.dashboardService
          .getGraduateDashboardTopData(
            action.payload
          )
          .pipe(
            map((data) => {
              this.appStore.dispatch(
                setAPIResponseMessage({
                  apiResponseMessage: {
                    apiResponseMessage: '',
                    isLoading: false,
                    isApiSuccessful: true,
                  },
                })
              );
              // read data and update payload
              return getGraduateDashboardTopDataSuccess({
                payload: data.payload
                 
              });
            })
          );
      })
    );
  });

  getGraduateDashboardBottomData$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getGraduateDashboardBottomData),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIResponseMessage({
            apiResponseMessage: {
              apiResponseMessage: '',
              isLoading: true,
              isApiSuccessful: false,
            },
          })
        );
        
        return this.dashboardService
          .getGraduateDashboardBottomData(
            action.payload
          )
          .pipe(
            map((data) => {
              this.appStore.dispatch(
                setAPIResponseMessage({
                  apiResponseMessage: {
                    apiResponseMessage: '',
                    isLoading: false,
                    isApiSuccessful: true,
                  },
                })
              );
              // read data and update payload
              return getGraduateDashboardBottomDataSuccess({
                payload: data.payload
                 
              });
            })
          );
      })
    );
  });

  getOrganizationVeficiationAnalysis$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getOrganizationVeficiationAnalysis),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIResponseMessage({
            apiResponseMessage: {
              apiResponseMessage: '',
              isLoading: true,
              isApiSuccessful: false,
            },
          })
        );
        
        return this.dashboardService
          .getOrganizationVerificationAnalysis(
            action.payload
          )
          .pipe(
            map((data) => {
              this.appStore.dispatch(
                setAPIResponseMessage({
                  apiResponseMessage: {
                    apiResponseMessage: '',
                    isLoading: false,
                    isApiSuccessful: true,
                  },
                })
              );
              // read data and update payload
              return getOrganizationVeficiationAnalysisSuccess({
                payload: data.payload
                 
              });
            })
          );
      })
    );
  });

 

  
}
