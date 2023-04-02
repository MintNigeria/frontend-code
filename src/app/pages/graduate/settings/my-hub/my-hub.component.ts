import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { deleteHubItem, deleteHubItemSuccess, getAllHubItem, getAllHubItemSuccess, uploadHubItem, uploadHubItemSuccess } from 'src/app/store/graduates/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-my-hub',
  templateUrl: './my-hub.component.html',
  styleUrls: ['./my-hub.component.scss']
})
export class MyHubComponent implements OnInit {

  uploadForm!: FormGroup

  selectedFile!: any
  allowedFiled = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/pdf"];

  confirmChanges = 'confirmChanges';
  changesConfirmed = 'changesConfirmed';
  deviceModel: string;
  ipAddress: any;
filter = {
  keyword: '',
  filter: '',
  pageIndex: 1,
  pageSize: 10
}
  hubDocuments: any;
  constructor(
    private fb: FormBuilder,
    private appStore: Store<AppStateInterface>,
    private store: Store,
    private actions$: Actions,
    private utilityService: UtilityService,
    private notification: NotificationsService,
    private router: Router
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
    this.loadIp();
    this.store.dispatch(getAllHubItem({payload: this.filter}))
    this.actions$.pipe(ofType(getAllHubItemSuccess)).subscribe((res: any) => {
      this.hubDocuments = res.payload.payload
    })
    this.initUploadForm()
    setTimeout(() => {
      this.populateForm()
    },2000)
  }

  initUploadForm(){
    this.uploadForm = this.fb.group({
      documentName: ['', Validators.required],
      Issuer: ['', Validators.required],
      date: ['', Validators.required],
      file: [null]
    })
  }


  
  loadIp() {
    this.utilityService.getuserIP().subscribe((res: any) => {
     this.ipAddress = res.ip
    })
  }

  populateForm(){
    this.uploadForm.patchValue({
      documentName: 'NYSC',
      Issuer: 'Federal Government',
      date: '03/04/1963'
    })
  }

  openConfirmChanges() {
    document.getElementById('confirmChanges')?.click();
  }
  closeConfirmChanges() {
    document.getElementById('confirmChanges')?.click();
  }

  cancelConfirmChanges() {
    document.getElementById('confirmChanges')?.click();
  }

  openChangesConfirmed(){
    // document.getElementById('changesConfirmed')?.click();
    document.getElementById('confirmChanges')?.click();
  }

  saveUpdates (){

  }

  uploadItem() {
    const {file, documentName, Issuer, date} = this.uploadForm.value
    const payload = {
      file,
      documentName,
      date,
      Issuer,
      imei: '',
      serialNumber: '',
      device: this.deviceModel,
      ipAddress: this.ipAddress
    }
    this.store.dispatch(uploadHubItem({payload}))
    this.actions$.pipe(ofType(uploadHubItemSuccess)).subscribe((res: any) => {
      console.log(res)
      if (res.payload.hasErrors === false) {
        this.notification.publishMessages('success', res.payload.description)
        document.getElementById('confirmChanges')?.click();

      }
    }) 
  }

  handleFileUpload(e: any) {
    const file = e.target.files[0];
    ////console.log(file)
    // if (!this.allowedFiled.includes(file.type)) {
		//   alert("Invalid format! Please select only correct file type");

		//   return;
		// } else {
    //   this.selectedFile = e.target.files[0]
    //   this.uploadForm.controls[file].setValue(file)
    // }
    this.selectedFile = e.target.files[0]
    this.uploadForm.controls['file'].setValue(file)
  }

  downloadFile(data: any) {
    const link = document.createElement('a');
    link.download = `${data.documentName}`;
    link.href = 'data:image/png;base64,' + data.base64;
    link.click();
  }

  deleteFile(data: any) {
    const payload = {
      HubItemId: data.hubItemId,
      imei: '',
      serialNumber: '',
      device: this.deviceModel,
      ipAddress: this.ipAddress
    }
    this.store.dispatch(deleteHubItem({payload}))
    this.actions$.pipe(ofType(deleteHubItemSuccess)).subscribe((res: any) => {
      console.log(res)
    })
  }

}
