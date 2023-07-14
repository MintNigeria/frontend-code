import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { DateRangeComponent } from 'src/app/shared/date-range/date-range.component';
import { isUserSelector } from 'src/app/store/auth/selector';
import { getAllDashboardInfoData, getDashboardRevenueAnalysis, getDashboardTopInstitutions } from 'src/app/store/dashboard/action';
import { dashboardCardSelector, dashboardRevenueSelector, dashboardTopInstitutionSelector } from 'src/app/store/dashboard/selector';
import { AppStateInterface } from 'src/app/types/appState.interface';
import {Chart} from 'chart.js/auto'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  user$ = this.appStore.pipe(select(isUserSelector));
  dashboardCardInfo$ = this.appStore.pipe(select(dashboardCardSelector));
  revenueAnalysis$ = this.appStore.pipe(select(dashboardRevenueSelector));
  topInstitutionRequest$ = this.appStore.pipe(select(dashboardTopInstitutionSelector));

  cardFilter = {
    range: 0,
    institutionId: '',
  }
  institutionData: any;
  institutionId: any;
  revenueFilter = {
    range: 0
  };
  cardInfo: any;
  revenueAnalysisData: any;
  topInstitutionRequests: any;
  revenueLabel  = ['MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT', 'SUN'];
  topInstitutionRequestData: any;
  adminUser: any;
  permissionList: any;
  superAdminRole: any;

  constructor(
    private appStore: Store<AppStateInterface>,
    private store: Store,
    private actions$: Actions,
    private dialog : MatDialog
  ) { 
    const data: any = localStorage.getItem('authData')
    this.adminUser = JSON.parse(data)
    this.permissionList = this.adminUser?.permissions;
    this.superAdminRole = this.adminUser.user.role.split('|')[0]

  }

  ngOnInit(): void {
    console.log(this.permissionList, this.superAdminRole)
    const data: any = localStorage.getItem('userData')
    this.institutionData = JSON.parse(data)
    this.institutionId = this.institutionData.InstitutionId

    this.store.dispatch(getAllDashboardInfoData({payload: {...this.cardFilter, institutionId: this.institutionId }}))
    this.store.dispatch(getDashboardRevenueAnalysis({payload: {...this.revenueFilter, institutionId: this.institutionId}}))
    this.store.dispatch(getDashboardTopInstitutions({payload: {...this.cardFilter, institutionId: this.institutionId}}))
    this.getDashboardCardInfo()
    this.getRevenueAnalysis()
    

  }

  reloadScreen() {
    const cardFilter = {
      range: 0,
      institutionId: '',
    }
    this.store.dispatch(getAllDashboardInfoData({payload: {...cardFilter, institutionId: this.institutionId }}))
    this.store.dispatch(getDashboardRevenueAnalysis({payload: {...this.revenueFilter, institutionId: this.institutionId}}))
    this.store.dispatch(getDashboardTopInstitutions({payload: {...cardFilter, institutionId: this.institutionId}}))

  }

  ngAfterViewInit(): void {

  }


  getDashboardCardInfo() {
    this.dashboardCardInfo$.subscribe((res: any) => {
      this.cardInfo = res
      ////console.log(res)
      // this.createDistributionChart()
  })
}

getRevenueAnalysis() {
  this.revenueAnalysis$.subscribe((res: any) => {
    this.revenueAnalysisData = res
   

  })
  
}



changeRange(range: number) {
  if (range === 5) {
    // launch calender
    const dialogRef = this.dialog.open(DateRangeComponent, {
      // width: '600px',
      height: 'auto',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
            const {start , end} = res; // use this start and end as fromDate and toDate on your filter
            const filter = {...this.cardFilter, ['startDate'] : start, ['endDate'] : end, range: 5}
            this.cardFilter = filter;
            this.store.dispatch(getAllDashboardInfoData({payload: {...this.cardFilter, institutionId: this.institutionId }}))
            
          }
          
        })
      } else {
        const filter = {...this.cardFilter, ['range'] : range};
        this.cardFilter = filter;
        this.store.dispatch(getAllDashboardInfoData({payload: {...this.cardFilter, institutionId: this.institutionId }}))
  }
}

changeRevenueRange(range: number) {
  if (range === 5) {
    // launch calender
    const dialogRef = this.dialog.open(DateRangeComponent, {
      // width: '600px',
      height: 'auto',
      disableClose: true,
    });
    
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
            const {start , end} = res; // use this start and end as fromDate and toDate on your filter
            const filter = {...this.revenueFilter, ['startDate'] : start, ['endDate'] : end, range: 5}
            this.revenueFilter = filter;
            this.store.dispatch(getDashboardRevenueAnalysis({payload: {...this.revenueFilter, institutionId: this.institutionId}}))

            
          }
          
        })
      } else {
        const filter = {...this.revenueFilter, ['range'] : range};
        this.revenueFilter = filter;
        this.store.dispatch(getDashboardRevenueAnalysis({payload: {...this.revenueFilter, institutionId: this.institutionId}}))
        // this.createDistributionChart2()
      }
}


}
