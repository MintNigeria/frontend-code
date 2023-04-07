import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { getAllInstitutionDegreeType, getAllInstitutionDegreeTypeSuccess } from 'src/app/store/institution/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-degree-type',
  templateUrl: './degree-type.component.html',
  styleUrls: ['./degree-type.component.scss']
})
export class DegreeTypeComponent implements OnInit {
  newDegreeForm!: FormGroup;
  degreeTypeList: any;
  institutionData: any;
  institutionId: any;
  facultyList: any;
  departmentList: any;

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
    this.newDegreeForm = this.formBuilder.group({
      degree: ['', Validators.required],
    });
   }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.institutionData = JSON.parse(data)
    this.institutionId = this.institutionData.InstitutionId

    this.store.dispatch(getAllInstitutionDegreeType({payload: {...this.degreeFilter, institutionId: this.institutionId}}))
    this.actions$.pipe(ofType(getAllInstitutionDegreeTypeSuccess)).subscribe((res: any) => {
      this.degreeTypeList = res.payload.data;
      // this.degreeTypeTotalCount = res.payload.totalCount;
    })
  }

  activateEditInstSector(){
    this.router.navigateByUrl('/institution/configuration/institution-setup/create-degree-type')
  }

  editDegreeType(data: any) {
    this.router.navigateByUrl(`/institution/configuration/institution-setup/edit-degree-type/${data.id}/${data.name}`)

    
  }

  // addFilter() {
  //   if (this.status !== 'All') {
  //     this.filterStatus['status'] = this.status;
  //   }
  //   if (this.selectedOption !== 'All Time') {
  //     this.filterOption['selectedOption'] = this.selectedOption;
  //   }
  //   if (this.gradYear !== 'All') {
  //     this.filterSector['gradYear'] = this.gradYear;
  //   }
  //   if (this.selectedInstitution !== 'All') {
  //     this.filterInstituition['selectedInstituition'] = this.selectedInstitution;
  //   }
  //   if (this.facultyFilter !== 'All') {
  //     this.filterDocument['facultyFilter'] = this.facultyFilter;
  //   }
    
  //   ////console.log(this.filterStatus,this.filterOption,this.filterSector,this.filterInstituition,this.filterDocument);
  // }
}
