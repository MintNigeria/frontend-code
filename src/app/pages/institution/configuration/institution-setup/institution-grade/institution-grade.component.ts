import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { getAllInstitutionDegreeType, getAllInstitutionDegreeTypeSuccess, getAllInstitutionGrade, getAllInstitutionGradeSuccess } from 'src/app/store/institution/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-institution-grade',
  templateUrl: './institution-grade.component.html',
  styleUrls: ['./institution-grade.component.scss']
})
export class InstitutionGradeComponent implements OnInit {
  institutionData: any;
  institutionId: any;
  degreeTypeList: any;
  degreeFilter = {
    institutionId: '',
    IMEI: '',
    SerialNumber: '',
    Device: '',
    IpAddress: '',

  }
  constructor(
    private readonly formBuilder: FormBuilder,
   private router: Router,
   private store: Store,
   private appStore: Store<AppStateInterface>,
   private actions$: Actions,
   private utilityService: UtilityService,
   private notification : NotificationsService

 ) {
  //  this.newDegreeForm = this.formBuilder.group({
  //    degree: ['', Validators.required],
  //  });
  }

 ngOnInit(): void {
   const data: any = localStorage.getItem('userData')
   this.institutionData = JSON.parse(data)
   this.institutionId = this.institutionData.InstitutionId

   this.store.dispatch(getAllInstitutionGrade({payload: {...this.degreeFilter, institutionId: this.institutionId}}))
   this.actions$.pipe(ofType(getAllInstitutionGradeSuccess)).subscribe((res: any) => {
     this.degreeTypeList = res.payload.data;
     // this.degreeTypeTotalCount = res.payload.totalCount;
   })
 }

 activateEditInstSector(){
   this.router.navigateByUrl('/institution/configuration/institution-setup/create-grade')
 }

 editDegreeType(data: any) {
   this.router.navigateByUrl(`/institution/configuration/institution-setup/edit-grade/${data.id}/${data.name}`)

   
 }

}
