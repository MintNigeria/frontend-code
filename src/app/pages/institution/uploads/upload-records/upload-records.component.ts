import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { downloadRecordUploadFormat, downloadRecordUploadFormatSuccess, uploadGraduateRecord, uploadGraduateRecordSuccess } from 'src/app/store/graduates/action';
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

  degreeFilter = {
    institutionId: '',
    IMEI: '',
    SerialNumber: '',
    Device: '',
    IpAddress: '',

  }
  uploadRecordForm!: FormGroup
  degreeTypeList: any;
  constructor(
     private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
    private fb: FormBuilder,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.institutionData = JSON.parse(data)
    this.institutionId = this.institutionData.InstitutionId
    this.initUploadForm()
    
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

  }

  loadIp() {
    this.utilityService.getuserIP().subscribe((res: any) => {
      const filter = {...this.degreeFilter, ['IpAddress'] : res.ip}
      this.degreeFilter = filter
    })
    // this.http.get('https://jsonip.com').subscribe(
    //   (value:any) => {
    //     //console.log(value);
    //     // this.userIP = value.ip;
    //   },
    //   (error) => {
    //     //console.log(error);
    //   }
    // );
  }

  initUploadForm() {
    this.uploadRecordForm = this.fb.group({
      faculty: [null, Validators.required],
      department: [null, Validators.required],
      degreeType: [null, Validators.required],
      yearOfGraduation: ['', Validators.required],
      Document: null
    })
  }

  changeFaculty(event: any) {
    const data = this.facultyList.find((value: any) => value.id == Number(event));

    this.departmentList = data.departmentVMs;
  }

  handleFileUpload(e: any) {
    const file = e.target.files[0];
    //console.log(file)
    if (!this.allowedFiled.includes(file.type)) {
		  alert("Invalid format! Please select only correct file type");

		  return;
		} else {
      this.selectedFile = e.target.files[0]
      this.uploadRecordForm.controls['Document'].setValue(file)
      this.uploadFile(file);
    }
  }


  downloadFormat() {
    this.store.dispatch(downloadRecordUploadFormat({payload: {institutionId: this.institutionId}}))
    this.actions$.pipe(ofType(downloadRecordUploadFormatSuccess)).subscribe((res: any) => {
      const link = document.createElement('a');
      //console.log(res)
       link.download = `${res.payload?.fileName}.xlsx`;
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
        //console.log(xhr.responseText);
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
    ...this.uploadRecordForm.value,
    institutionId: this.institutionId
  }
  this.store.dispatch(uploadGraduateRecord({payload: data}))
  this.actions$.pipe(ofType(uploadGraduateRecordSuccess)).subscribe((res: any) => {
   //console.log(res)
   if (res.payload.hasErrors === false) {
    localStorage.setItem('recordUpload', JSON.stringify(res.payload.payload))
    this.router.navigateByUrl(`/institution/uploads/confirm-uploads`)

   }
 })
}

}
