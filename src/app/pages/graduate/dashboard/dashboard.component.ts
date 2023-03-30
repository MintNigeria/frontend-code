import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DashboardService } from 'src/app/core/services/dashboard/dashboard.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { getGraduateDashboardBottomData, getGraduateDashboardBottomDataSuccess, getGraduateDashboardTopData, getGraduateDashboardTopDataSuccess } from 'src/app/store/dashboard/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  filter = {
    range: 0,
  }
  userData: any;
  cardData: any;
  recentApplications: any;
  recentTransactions: any;
  constructor(
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
    private fb: FormBuilder,
    private utilityService: UtilityService,
    private notification: NotificationsService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)
    // this.store.dispatch(getGraduateDashboardTopData({payload: {...this.filter, GraduateId: this.userData.GraduateId}}))
    // this.actions$.pipe(ofType(getGraduateDashboardTopDataSuccess)).subscribe((res: any) => {
    //   console.log(res)
    //   this.cardData = res.payload;
    // })
    this.dashboardService.getGraduateDashboardTopData({...this.filter, GraduateId: this.userData.GraduateId}).subscribe((res: any) => {
      this.cardData = res.payload;
    })
    this.dashboardService.getGraduateDashboardBottomData({...this.filter, GraduateId: this.userData.GraduateId}).subscribe((res: any) => {
      this.cardData = res.payload;

      this.recentApplications = res.payload.recentApplicationVMs;
      this.recentTransactions = res.payload.paymentHistoryVMs;
    })
    // this.store.dispatch(getGraduateDashboardBottomData({payload: {...this.filter, GraduateId: this.userData.GraduateId}}))
    // this.actions$.pipe(ofType(getGraduateDashboardBottomDataSuccess)).subscribe((res: any) => {
    //   console.log(res)
    //   this.recentApplications = res.payload.recentApplicationVMs;
    //   this.recentTransactions = res.payload.paymentHistoryVMs;
    // })
  }
  
  
}
