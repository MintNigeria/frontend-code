import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { createGraduateRecord, createGraduateRecordSuccess, uploadGraduateRecord, uploadGraduateRecordSuccess } from 'src/app/store/graduates/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-confirm-uploads',
  templateUrl: './confirm-uploads.component.html',
  styleUrls: ['./confirm-uploads.component.scss']
})
export class ConfirmUploadsComponent implements OnInit {
  page: number = 1;
  UploadForm!: FormGroup
  changesConfirmed = "changesConfirmed";

  
successful: any;
  UploadedList: any;
  institutionData: any;
  institutionId: any;
  ipAddress: any;
  deviceModel: string;

  constructor(
    private fb: FormBuilder,
    private utilityService: UtilityService,
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
    private notification: NotificationsService
  ) {
    const userAgent = navigator.userAgent;
    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
     this.deviceModel = 'iPad or iPhone';
   } else if (userAgent.match(/Android/i)) {
     this.deviceModel = 'Android';
   } else if (userAgent.match(/Window/i)) {
     this.deviceModel = 'Window';
   } else {
     this.deviceModel = 'Other';
   }
   }

  ngOnInit(): void {

        const dat: any = localStorage.getItem('userData')
    this.institutionData = JSON.parse(dat)
    this.institutionId = this.institutionData.InstitutionId

    const data: any = localStorage.getItem('recordUpload')
    this.UploadedList = JSON.parse(data)

    this.utilityService.getuserIP().subscribe((res) => {
      this.ipAddress = res.ip
    })
    // this.institutionId = this.institutionData.InstitutionId
    ////console.log(this.UploadedList)
    this.initUploadForm()
    setTimeout(() => {
      this.populateForm()
    }, 2000);
  }

  initUploadForm() {
    this.UploadForm = this.fb.group({
      faculty: [''],
      department: [''],
      degree: [''],
      yearofGrad:['']
      
    })
  }

  populateForm() {
    this.UploadForm.patchValue({
      faculty: this.UploadedList[0].academicInformation.facultyName,
      department:  this.UploadedList[0].academicInformation.department,
      degree:  this.UploadedList[0].academicInformation.degree,
      yearofGrad:  this.UploadedList[0].academicInformation.yearOfGraduation,
    })
  }


  goBack() {
  window.history.back();
}

openChangesConfirmed(){
  const newUploadRecord = this.UploadedList.map((record: any) => {
    return {
      firstName: record.firstName,
      lastName: record.lastName,
      middleName: record.middleName,
      gender: record.gender,
      dateOfBirth: record.dateOfBirth,
      stateOfOrigin: record.stateOfOrigin,
      academicInformation:{
        program: record.academicInformation.program,
        matriculationNumber:  record.academicInformation.matriculationNumber,
        grade: record.academicInformation.grade,
        yearOfEntry: record.academicInformation.yearOfEntry
      }
    }
  })
  const payload = {
    addInstitutionGraduateVMs : [...newUploadRecord],
    institutionId: Number(this.institutionId),
  facultyId: this.UploadedList[0].academicInformation.facultyId,
  departmentId: this.UploadedList[0].academicInformation.departmentId,
  degreeTypeId: this.UploadedList[0].academicInformation.degreeTypeId,
  yearOfGraduation: this.UploadedList[0].academicInformation.yearOfGraduation,
  imei: '',
  serialNumber: '',
  device: this.deviceModel,
  ipAddress: this.ipAddress 
  }
  this.store.dispatch(createGraduateRecord({payload}))
  this.actions$.pipe(ofType(createGraduateRecordSuccess)).subscribe((res: any) => {
    if (res.payload.hasErrors === false) {
     this.notification.publishMessages('success', 'Successful')

    //  document.getElementById('changesConfirmed')?.click();
     localStorage.removeItem('recordUpload');
     this.router.navigateByUrl('/institution/records')
   }

  })
}

}
