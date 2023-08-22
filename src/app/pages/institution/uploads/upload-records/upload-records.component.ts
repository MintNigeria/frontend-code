import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { GraduatesService } from 'src/app/core/services/graduates/graduates.service';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { downloadRecordUploadFormat, downloadRecordUploadFormatSuccess, uploadBulkGraduateRecord, uploadBulkGraduateRecordSuccess, uploadGraduateRecord, uploadGraduateRecordSuccess } from 'src/app/store/graduates/action';
import { getALlDepartmentInInstitution, getALlFacultiesInInstitution, getALlFacultiesInInstitutionSuccess, getAllInstitutionDegreeType, getAllInstitutionDegreeTypeSuccess } from 'src/app/store/institution/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-upload-records',
  templateUrl: './upload-records.component.html',
  styleUrls: ['./upload-records.component.scss']
})
export class UploadRecordsComponent implements OnInit {

  selectedFile!: any
  allowedFiled = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
  fileSize = '';
  progress = 0;
  institutionData: any;
  institutionId: any;
  facultyList: any;
  departmentList: any;
uploadType=[
  {name: 'simple', description: 'This template contains doesnt not contain columns like Faculty, department, and Year' },
  {name: 'bulk', description: 'This template contains column like Program, Faculty, Department, Degree,  Year of Graduation' }
]
  years: Array<any> = [];

  degreeFilter = {
    institutionId: '',
    IMEI: '',
    SerialNumber: '',
    Device: '',
    IpAddress: '',

  }
  simpleuploadRecordForm!: FormGroup
  bulkuploadRecordForm!: FormGroup
  degreeTypeList: any;
  selectedFileUploadType: string = ''
  ipAddress: any;
  deviceModel: string;
  isBulkUpload: boolean = false;
  showProgress: boolean = false;
  constructor(
     private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
    private fb: FormBuilder,
    private utilityService: UtilityService,
    private graduateService: GraduatesService,
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
    const data: any = localStorage.getItem('userData')
    this.institutionData = JSON.parse(data)
    this.institutionId = this.institutionData.InstitutionId
    this.initUploadForm()
    this.initBulkUploadForm()
    
    this.store.dispatch(getALlDepartmentInInstitution({id: this.institutionId}))
    this.store.dispatch(getALlFacultiesInInstitution({id: this.institutionId}))
    this.actions$.pipe(ofType(getALlFacultiesInInstitutionSuccess)).subscribe((res: any) => {
      this.facultyList = res.payload;
    })
    this.store.dispatch(getAllInstitutionDegreeType({payload: {...this.degreeFilter, institutionId: this.institutionId}}))
    this.actions$.pipe(ofType(getAllInstitutionDegreeTypeSuccess)).subscribe((res: any) => {
      this.degreeTypeList = res.payload.data;
    })
    this.loadIp();
    let currentYear = new Date().getFullYear();
    for (let index = 1990; index <= currentYear; ++index) {
      this.years.push(index)

    }


  }

  loadIp() {
    this.utilityService.getuserIP().subscribe((res: any) => {
      this.ipAddress = res.query;
      const filter = {...this.degreeFilter, ['IpAddress'] : res.ip}
      this.degreeFilter = filter
    })
    
  }

  selecUploadType(unit: any) {
    this.selectedFileUploadType = unit.name
    if (unit.name === 'bulk') {
      this.isBulkUpload = true;
    } else {

      this.isBulkUpload = false;
    }
  }

  initUploadForm() {
    this.simpleuploadRecordForm = this.fb.group({
      faculty: [null, Validators.required],
      department: [null, Validators.required],
      degreeType: [null, Validators.required],
      yearOfGraduation: [null, Validators.required],
      Document: [null, Validators.required]
    })
  }
  initBulkUploadForm() {
    this.bulkuploadRecordForm = this.fb.group({
     
      Document: [null, Validators.required]
    })
  }

  changeFaculty(event: any) {
    const data = this.facultyList.find((value: any) => value.id == Number(event));

    this.departmentList = data.departmentVMs;
  }

  handleFileUpload(e: any) {
    const file = e.target.files[0];
    ////console.log(file)
    if (!this.allowedFiled.includes(file.type)) {
		  alert("Invalid format! Please select only correct file type");

		  return;
		} else {
      this.selectedFile = e.target.files[0]
      this.simpleuploadRecordForm.controls['Document'].setValue(file)
      this.uploadFile(file);
    }
  }
  handleBulkFileUpload(e: any) {
    const file = e.target.files[0];
    ////console.log(file)
    if (!this.allowedFiled.includes(file.type)) {
		  alert("Invalid format! Please select only correct file type");

		  return;
		} else {
      this.selectedFile = e.target.files[0]
      this.bulkuploadRecordForm.controls['Document'].setValue(file)
      this.uploadFile(file);
    }
  }


  downloadFormat() {
    const payload = {
      institutionId: this.institutionId,
      isBulkUpload: this.isBulkUpload,
      imei: '',
  serialNumber: '',
  device: this.deviceModel,
  ipAddress: this.ipAddress 
    }
    // this.store.dispatch(downloadRecordUploadFormat({payload: {institutionId: this.institutionId}}))
    this.store.dispatch(downloadRecordUploadFormat({payload}))
    this.actions$.pipe(ofType(downloadRecordUploadFormatSuccess)).subscribe((res: any) => {
      const link = document.createElement('a');
      ////console.log(res)
       link.download = `${res.payload?.fileName}`;
       link.href = 'data:image/png;base64,' + res.payload?.base64;
       link.click();
   })
  }

  uploadFile(file: any) {
    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (e: any) => {
      if (e.lengthComputable) {
        this.progress = 100;
        // this.progress = Math.round((e.loaded / e.total) * 100);
      }
    });

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        ////console.log(xhr.responseText);
        // do something with the response
      }
    };

    // xhr.open('POST', '/upload');
    xhr.send(formData);
  }

  deleteFile() {
  this.selectedFile = null;
  this.fileSize = '';
  this.progress = 0;
}

submitUpload() {
  const data = {
    ...this.simpleuploadRecordForm.value,
    institutionId: this.institutionId
  }
  this.store.dispatch(uploadGraduateRecord({payload: data}))
  this.actions$.pipe(ofType(uploadGraduateRecordSuccess)).subscribe((res: any) => {
   ////console.log(res)
   if (res.payload.hasErrors === false) {
    localStorage.setItem('recordUpload', JSON.stringify(res.payload.payload))
    this.router.navigateByUrl(`/institution/uploads/confirm-uploads`)

   }
 })
}
submitBulkUpload() {
  const data = {
    ...this.bulkuploadRecordForm.value,
    institutionId: this.institutionId
  }
  this.graduateService.uploadBulkGraduateRecordSync(data).subscribe((resp: HttpEvent<any>) => {
    if (resp.type === HttpEventType.Response) {
      // console.log('Upload complete');
      this.notification.publishMessages('success', 'File completely uploaded')
      this.router.navigateByUrl(`/institution/uploads`)
  }
  if (resp.type === HttpEventType.UploadProgress) {
      const percentDone = Math.round((100 * resp.loaded) / resp.total!)
      // console.log('Progress ' + percentDone + '%', resp.loaded , resp.total!);
      this.showProgress = true;
  } 
  })
//   this.store.dispatch(uploadBulkGraduateRecord({payload: data}))
//   this.actions$.pipe(ofType(uploadBulkGraduateRecordSuccess)).subscribe((res: any) => {
//    ////console.log(res)
//    if (res.payload.hasErrors === false) {
//     localStorage.setItem('recordUpload', JSON.stringify(res.payload.payload))

//    }
//  })
}

}
