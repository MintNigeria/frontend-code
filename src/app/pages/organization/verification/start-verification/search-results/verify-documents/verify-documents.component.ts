import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { getOrganizationVerificationHistoryData, getOrganizationVerificationHistoryDataSuccess } from 'src/app/store/organization/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-verify-documents',
  templateUrl: './verify-documents.component.html',
  styleUrls: ['./verify-documents.component.scss']
})
export class VerifyDocumentsComponent implements OnInit {

  graduateData!: any;

  constructor(
    private appStore: Store<AppStateInterface>,
    private store: Store,
    private actions$: Actions,
    private utilityService: UtilityService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']
    this.store.dispatch(getOrganizationVerificationHistoryData({id}))
    this.actions$.pipe(ofType(getOrganizationVerificationHistoryDataSuccess)).subscribe((res: any) => {
      // ////console.log(res)
      this.graduateData = res.payload.payload;
    })
  }

}
