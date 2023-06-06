import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, from, map, mergeMap, switchMap, take } from 'rxjs';
import { AppResponseInterface } from 'src/app/types/appState.interface';
import { setAPIResponseMessage } from '../shared/app.action';
import { getAllDashboard, getAllDashboardInfoData, getAllDashboardInfoSuccess, getAllDashboardSuccess, getDashboardRevenueAnalysis, getDashboardRevenueAnalysisSuccess, getDashboardTopInstitutions, getDashboardTopInstitutionsSuccess, getGraduateDashboardBottomData, getGraduateDashboardBottomDataSuccess, getGraduateDashboardTopData, getGraduateDashboardTopDataSuccess, getOrganizationDashboardBottomInfo, getOrganizationDashboardBottomInfoSuccess, getOrganizationDashboardInfo, getOrganizationDashboardInfoSuccess, getOrganizationVerificationAnalysisData, getOrganizationVerificationAnalysisDataSuccess, } from './action';
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

                let orgvlsun = 0;
                let orgvlmon = 0;
                let orgvltue = 0;
                let orgvlwed = 0;
                let orgvlthr = 0;
                let orgvlfri = 0;
                let orgvlsat = 0;
              
                const completedRequest = [];
                const completedGradValue = [];
                const completedOrgValue = [];
                data.forEach((x: any) => {
                  if (x.dayOfTheWeek === 'Monday') {
                    vlmon += x.graduate || x.graduate;
                    orgvlmon += x.organization || x.organization;
                  }
                  if (x.dayOfTheWeek === 'Tuesday') {
                    vltue += x.graduate || x.graduate;
                    orgvltue += x.organization || x.organization;
                  }
                  if (x.dayOfTheWeek === 'Wednesday') {
                    vlwed += x.graduate || x.graduate;
                    orgvlwed += x.organization || x.organization;
                  }
                  if (x.dayOfTheWeek === 'Thursday') {
                    vlthr += x.graduate || x.graduate;
                    orgvlthr += x.organization || x.organization;
                  }
                  if (x.dayOfTheWeek === 'Friday') {
                    vlfri += x.graduate || x.graduate;
                    orgvlfri += x.organization || x.organization;
                  }
                  if (x.dayOfTheWeek === 'Saturday') {
                    vlsat += x.graduate || x.graduate;
                    orgvlsat += x.organization || x.organization;
                  }
                  if (x.dayOfTheWeek === 'Sunday') {
                    vlsun += x.graduate || x.graduate;
                    orgvlsun += x.organization || x.organization;
                  }
                });
                completedRequest.push(CMsun, CMmon, CMtue, CMwed, CMthr, CMfri, CMsat);
                completedGradValue.push(vlsun, vlmon, vltue, vlwed, vlthr, vlfri, vlsat);
                completedOrgValue.push(orgvlsun, orgvlmon, orgvltue, orgvlwed, orgvlthr, orgvlfri, orgvlsat);
                return {
                  completedRequest,
                  completedGradValue,
                  completedOrgValue,
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
                
                let orgvlJan = 0;
                let orgvlFeb = 0;
                let orgvlMar = 0;
                let orgvlApr = 0;
                let orgvlMay = 0;
                let orgvlJun = 0;
                let orgvlJul = 0;
                let orgvlAug = 0;
                let orgvlSep = 0;
                let orgvlOct = 0;
                let orgvlNov = 0;
                let orgvlDec = 0;
              
                const completedRequest = [];
                const completedOrgValue = [];
                const completedGradValue = [];
                data.forEach((x: any) => {
                  if (x.month === 'Feb') {
                    vlFeb += x.graduate || x.graduate;
                    orgvlFeb += x.organization || x.organization;
                  }
                  if (x.month === 'Mar') {
                    vlMar += x.graduate || x.graduate;
                    orgvlMar += x.organization || x.organization;
                  }
                  if (x.month === 'Apr') {
                    vlApr += x.graduate || x.graduate;
                    orgvlApr += x.organization || x.organization;
                  }
                  if (x.month === 'May') {
                    vlMay += x.graduate || x.graduate;
                    orgvlMay += x.organization || x.organization;
                  }
                  if (x.month === 'Jun') {
                    vlJun += x.graduate || x.graduate;
                    orgvlJun += x.organization || x.organization;
                  }
                  if (x.month === 'Jul') {
                    vlJul += x.graduate || x.graduate;
                    orgvlJul += x.organization || x.organization;
                  }
                  if (x.month === 'Aug') {
                    vlAug += x.graduate || x.graduate;
                    orgvlAug += x.organization || x.organization;
                  }
                  if (x.month === 'Sep') {
                    vlSep += x.graduate || x.graduate;
                    orgvlSep += x.organization || x.organization;
                  }
                  if (x.month === 'Oct') {
                    vlOct += x.graduate || x.graduate;
                    orgvlOct += x.organization || x.organization;
                  }
                  if (x.month === 'Nov') {
                    vlNov += x.graduate || x.graduate;
                    orgvlNov += x.organization || x.organization;
                  }
                  if (x.month === 'Dec') {
                    vlDec += x.graduate || x.graduate;
                    orgvlDec += x.organization || x.organization;
                  }
                  if (x.month === 'Jan') {
                    vlJan += x.graduate || x.graduate;
                    orgvlJan += x.organization || x.organization;
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
                completedGradValue.push(
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
                completedOrgValue.push(
                  orgvlJan,
                  orgvlFeb,
                  orgvlMar,
                  orgvlApr,
                  orgvlMay,
                  orgvlJun,
                  orgvlJul,
                  orgvlAug,
                  orgvlSep,
                  orgvlOct,
                  orgvlNov,
                  orgvlDec,
                );
                return {
                  completedRequest,
                  completedGradValue,
                  completedOrgValue,
                };
              };

              const formatYear = (data = []) => {
                
                let gradValue = 0
                let orgValue = 0
                let value = ''
                
              
                let completedRequest: any = [];
                let completedGradValue: any = [];
                let completedOrgValue: any = [];
                data.forEach((x: any) => {
                  if (x.year) {
                    gradValue = x.graduate || x.graduate;
                    orgValue = x.organization || x.organization;
                    value = x.year || x.year;
                  }
                  
                  completedRequest.push(value);
                  completedGradValue.push(gradValue);
                  completedOrgValue.push(orgValue);
                });
                return {
                  completedRequest,
                  completedGradValue,
                  completedOrgValue,
                };
              };

              const formatAllTime = (data = []) => {
                
                let gradValue = 0
                let orgValue = 0
                let value = ''
                
              
                let completedRequest: any = [];
                let completedGradValue: any = [];
                let completedOrgValue: any = [];
                data.forEach((x: any) => {
                  if (x.year) {
                    gradValue = x.graduate || x.graduate;
                    orgValue = x.organization || x.organization;
                    value = `${x.month + ' ' + x.year} `;
                  }
                  
                  completedRequest.push(value);
                  completedGradValue.push(gradValue);
                  completedOrgValue.push(orgValue);
                });
                return {
                  completedRequest,
                  completedGradValue,
                  completedOrgValue,
                };
              };

              let revenueStatisticsBar = {};
		if (action.payload.range === 2) {
			revenueStatisticsBar = formatDaily(data.payload.requestStatisticsVms);
		}
		if (action.payload.range === 0) {
			revenueStatisticsBar = formatAllTime(data.payload.requestStatisticsVms);
		}
		if (action.payload.range === 5) {
			revenueStatisticsBar = formatMonth(data.payload.requestStatisticsVms);
		}
		if (action.payload.range === 3) {
			revenueStatisticsBar = formatMonth(data.payload.requestStatisticsVms);
		}
    if (action.payload.range === 4) {
			revenueStatisticsBar = formatYear(data.payload.requestStatisticsVms);
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

                let orgvlsun = 0;
                let orgvlmon = 0;
                let orgvltue = 0;
                let orgvlwed = 0;
                let orgvlthr = 0;
                let orgvlfri = 0;
                let orgvlsat = 0;
              
                const completedRequest = [];
                const completedVerificationValue = [];
                const completedApplicationValue = [];
                data.forEach((x: any) => {
                  if (x.dayOfTheWeek === 'Monday') {
                    vlmon += x.applications || x.applications;
                    orgvlmon += x.verifications || x.verifications;
                  }
                  if (x.dayOfTheWeek === 'Tuesday') {
                    vltue += x.applications || x.applications;
                    orgvltue += x.verifications || x.verifications;
                  }
                  if (x.dayOfTheWeek === 'Wednesday') {
                    vlwed += x.applications || x.applications;
                    orgvlwed += x.verifications || x.verifications;
                  }
                  if (x.dayOfTheWeek === 'Thursday') {
                    vlthr += x.applications || x.applications;
                    orgvlthr += x.verifications || x.verifications;
                  }
                  if (x.dayOfTheWeek === 'Friday') {
                    vlfri += x.applications || x.applications;
                    orgvlfri += x.verifications || x.verifications;
                  }
                  if (x.dayOfTheWeek === 'Saturday') {
                    vlsat += x.applications || x.applications;
                    orgvlsat += x.verifications || x.verifications;
                  }
                  if (x.dayOfTheWeek === 'Sunday') {
                    vlsun += x.applications || x.applications;
                    orgvlsun += x.verifications || x.verifications;
                  }
                });
                completedRequest.push(CMsun, CMmon, CMtue, CMwed, CMthr, CMfri, CMsat);
                completedVerificationValue.push(vlsun, vlmon, vltue, vlwed, vlthr, vlfri, vlsat);
                completedApplicationValue.push(orgvlsun, orgvlmon, orgvltue, orgvlwed, orgvlthr, orgvlfri, orgvlsat);
                return {
                  completedRequest,
                  completedVerificationValue,
                  completedApplicationValue,
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
                
                let orgvlJan = 0;
                let orgvlFeb = 0;
                let orgvlMar = 0;
                let orgvlApr = 0;
                let orgvlMay = 0;
                let orgvlJun = 0;
                let orgvlJul = 0;
                let orgvlAug = 0;
                let orgvlSep = 0;
                let orgvlOct = 0;
                let orgvlNov = 0;
                let orgvlDec = 0;
              
                const completedRequest = [];
                const completedVerificationValue = [];
                const completedApplicationValue = [];;
                data.forEach((x: any) => {
                  if (x.month === 'Feb') {
                    vlFeb += x.applications || x.applications;
                    orgvlFeb += x.verifications || x.verifications;
                  }
                  if (x.month === 'Mar') {
                    vlMar += x.applications || x.applications;
                    orgvlMar += x.verifications || x.verifications;
                  }
                  if (x.month === 'Apr') {
                    vlApr += x.applications || x.applications;
                    orgvlApr += x.verifications || x.verifications;
                  }
                  if (x.month === 'May') {
                    vlMay += x.applications || x.applications;
                    orgvlMay += x.verifications || x.verifications;
                  }
                  if (x.month === 'Jun') {
                    vlJun += x.applications || x.applications;
                    orgvlJun += x.verifications || x.verifications;
                  }
                  if (x.month === 'Jul') {
                    vlJul += x.applications || x.applications;
                    orgvlJul += x.verifications || x.verifications;
                  }
                  if (x.month === 'Aug') {
                    vlAug += x.applications || x.applications;
                    orgvlAug += x.verifications || x.verifications;
                  }
                  if (x.month === 'Sep') {
                    vlSep += x.applications || x.applications;
                    orgvlSep += x.verifications || x.verifications;
                  }
                  if (x.month === 'Oct') {
                    vlOct += x.applications || x.applications;
                    orgvlOct += x.verifications || x.verifications;
                  }
                  if (x.month === 'Nov') {
                    vlNov += x.applications || x.applications;
                    orgvlNov += x.verifications || x.verifications;
                  }
                  if (x.month === 'Dec') {
                    vlDec += x.applications || x.applications;
                    orgvlDec += x.verifications || x.verifications;
                  }
                  if (x.month === 'Jan') {
                    vlJan += x.applications || x.applications;
                    orgvlJan += x.verifications || x.verifications;
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
                completedVerificationValue.push(
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
                completedApplicationValue.push(
                  orgvlJan,
                  orgvlFeb,
                  orgvlMar,
                  orgvlApr,
                  orgvlMay,
                  orgvlJun,
                  orgvlJul,
                  orgvlAug,
                  orgvlSep,
                  orgvlOct,
                  orgvlNov,
                  orgvlDec,
                );
                return {
                  completedRequest,
                  completedVerificationValue,
                  completedApplicationValue,
                };
              };

              const formatYear = (data = []) => {
                
                let gradValue = 0
                let orgValue = 0
                let value = ''
                
              
                let completedRequest: any = [];
                let completedVerificationValue: any = [];
                let completedApplicationValue: any = [];
                data.forEach((x: any) => {
                  if (x.year) {
                    gradValue = x.applications || x.applications;
                    orgValue = x.verifications || x.verifications;
                    value = x.year || x.year;
                  }
                  
                  completedRequest.push(value);
                  completedVerificationValue.push(gradValue);
                  completedApplicationValue.push(orgValue);
                });
                return {
                  completedRequest,
                  completedVerificationValue,
                  completedApplicationValue,
                };
              };
              const formatAllTime = (data = []) => {
                
                let gradValue = 0
                let orgValue = 0
                let value = ''
                
              
                let completedRequest: any = [];
                let completedVerificationValue: any = [];
                let completedApplicationValue: any = [];
                data.forEach((x: any) => {
                  if (x.year) {
                    gradValue = x.applications || x.applications;
                    orgValue = x.verifications || x.verifications;
                    value = `${x.month + ' ' + x.year} `;
                  }
                  completedRequest.push(value);
                  completedVerificationValue.push(gradValue);
                  completedApplicationValue.push(orgValue);
                });
                return {
                  completedRequest,
                  completedVerificationValue,
                  completedApplicationValue,
                };
              };

              let revenueStatisticsBar = {};
		if (action.payload.range === 2) {
			revenueStatisticsBar = formatDaily(data.payload.applicationAndVerificationAnalyticsVMs);
		}
		if (action.payload.range === 0) {
			revenueStatisticsBar = formatAllTime(data.payload.applicationAndVerificationAnalyticsVMs);
		}
		if (action.payload.range === 5) {
			revenueStatisticsBar = formatMonth(data.payload.applicationAndVerificationAnalyticsVMs);
		}
		if (action.payload.range === 3) {
			revenueStatisticsBar = formatMonth(data.payload.applicationAndVerificationAnalyticsVMs);
		}
    if (action.payload.range === 4) {
			revenueStatisticsBar = formatYear(data.payload.applicationAndVerificationAnalyticsVMs);
		}
        
		data.payload.applicationAndVerificationAnalyticsVMs = revenueStatisticsBar;
              // read data and update payload
              return getGraduateDashboardBottomDataSuccess({
                payload: data.payload
                 
              });
            })
          );
      })
    );
  });

 
  getOrganizationVerificationAnalysisData$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getOrganizationVerificationAnalysisData),
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
                const completedVerValue = [];
                data.forEach((x: any) => {
                  if (x.dayOfTheWeek === 'Monday') {
                    vlmon += x.verificationCount || x.verificationCount;
                  }
                  if (x.dayOfTheWeek === 'Tuesday') {
                    vltue += x.verificationCount || x.verificationCount;
                  }
                  if (x.dayOfTheWeek === 'Wednesday') {
                    vlwed += x.verificationCount || x.verificationCount;
                  }
                  if (x.dayOfTheWeek === 'Thursday') {
                    vlthr += x.verificationCount || x.verificationCount;
                  }
                  if (x.dayOfTheWeek === 'Friday') {
                    vlfri += x.verificationCount || x.verificationCount;
                  }
                  if (x.dayOfTheWeek === 'Saturday') {
                    vlsat += x.verificationCount || x.verificationCount;
                  }
                  if (x.dayOfTheWeek === 'Sunday') {
                    vlsun += x.verificationCount || x.verificationCount;
                  }
                });
                completedRequest.push(CMsun, CMmon, CMtue, CMwed, CMthr, CMfri, CMsat);
                completedVerValue.push(vlsun, vlmon, vltue, vlwed, vlthr, vlfri, vlsat);
                return {
                  completedRequest,
                  completedVerValue,
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
                const completedVerValue = [];
                data.forEach((x: any) => {
                  if (x.month === 'Feb') {
                    vlFeb += x.verificationCount || x.verificationCount;
                  }
                  if (x.month === 'Mar') {
                    vlMar += x.verificationCount || x.verificationCount;
                  }
                  if (x.month === 'Apr') {
                    vlApr += x.verificationCount || x.verificationCount;
                  }
                  if (x.month === 'May') {
                    vlMay += x.verificationCount || x.verificationCount;
                  }
                  if (x.month === 'Jun') {
                    vlJun += x.verificationCount || x.verificationCount;
                  }
                  if (x.month === 'Jul') {
                    vlJul += x.verificationCount || x.verificationCount;
                  }
                  if (x.month === 'Aug') {
                    vlAug += x.verificationCount || x.verificationCount;
                  }
                  if (x.month === 'Sep') {
                    vlSep += x.verificationCount || x.verificationCount;
                  }
                  if (x.month === 'Oct') {
                    vlOct += x.verificationCount || x.verificationCount;
                  }
                  if (x.month === 'Nov') {
                    vlNov += x.verificationCount || x.verificationCount;
                  }
                  if (x.month === 'Dec') {
                    vlDec += x.verificationCount || x.verificationCount;
                  }
                  if (x.month === 'Jan') {
                    vlJan += x.verificationCount || x.verificationCount;
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
                completedVerValue.push(
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
                  completedVerValue,
                };
              };

              const formatYear = (data = []) => {
                
                let verValue = 0
                let orgValue = 0
                let value = ''
                
              
                let completedRequest: any = [];
                let completedVerValue: any = [];
                data.forEach((x: any) => {
                  if (x.year) {
                    verValue = x.verificationCount || x.verificationCount;
                    value = x.year || x.year;
                  }
                  
                  completedRequest.push(value);
                  completedVerValue.push(verValue);
                });
                
                return {
                  completedRequest,
                  completedVerValue,
                };
              };
              const formatAllTime = (data = []) => {
                
                let verValue = 0
                let orgValue = 0
                let value = ''
                
              
                let completedRequest: any = [];
                let completedVerValue: any = [];
                data.forEach((x: any) => {
                  if (x.year) {
                    verValue = x.verificationCount || x.verificationCount;

                    value = `${x.month + ' ' + x.year} `;
                  }
                  
                  completedRequest.push(value);
                  completedVerValue.push(verValue);
                });
                return {
                  completedRequest,
                  completedVerValue,
                };
              };

              let revenueStatisticsBar = {};
		if (action.payload.range === 2) {
			revenueStatisticsBar = formatDaily(data.payload.verificationAnalyticsVMs);
		}
		if (action.payload.range === 0) {
			revenueStatisticsBar = formatAllTime(data.payload.verificationAnalyticsVMs);
		}
		if (action.payload.range === 5) {
			revenueStatisticsBar = formatMonth(data.payload.verificationAnalyticsVMs);
		}
		if (action.payload.range === 3) {
			revenueStatisticsBar = formatMonth(data.payload.verificationAnalyticsVMs);
		}
    if (action.payload.range === 4) {
			revenueStatisticsBar = formatYear(data.payload.verificationAnalyticsVMs);
		}
        
		data.payload.verificationAnalyticsVMs = revenueStatisticsBar;
              // read data and update payload
              return getOrganizationVerificationAnalysisDataSuccess({
                payload: data.payload
                 
              });
            })
          );
      })
    );
  });

 
 

  
}
