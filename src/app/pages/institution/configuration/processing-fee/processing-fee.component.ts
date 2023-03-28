import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotifierService } from 'angular-notifier';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { createProcessingFeeDocumentType, createProcessingFeeDocumentTypeSuccess, getAllProcessingFee, getAllProcessingFeeSuccess, getInstitutionConfiguration, getInstitutionConfigurationSuccess, sendProcessingFeeForApproval, sendProcessingFeeForApprovalSuccess } from 'src/app/store/configuration/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-processing-fee',
  templateUrl: './processing-fee.component.html',
  styleUrls: ['./processing-fee.component.scss']
})
export class ProcessingFeeComponent implements OnInit {
  feeForm!: FormGroup
  processingFeesForm!: FormGroup;

  editForm!: FormGroup;
  edit ='editModal';

  saveDocumentType: EventEmitter<any> = new EventEmitter();
  processingFees!: any;
  deliveryOption: any;
  selectedDocumentType: any;
  deliveryOptionIds: any;
  institutionData: any;
  institutionId: any;
  ins: any;
  processingFeeList: any;
  deviceModel: string;
  ipAddress!: any;
  updatedData: any;

  constructor(
     private fb: FormBuilder,
     private readonly formBuilder: FormBuilder,
     private store: Store,
    private appStore: Store<AppStateInterface>,
    private router: Router,
    private actions$: Actions,
    private utilityService: UtilityService,
    private notification: NotificationsService

  ) {
    this.editForm = this.formBuilder.group({
      documentName: ['', Validators.required],
      description: [''],
      email: [false],
      fileUpload: [false],
      hardCopy: [false]
    });
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
    this.store.dispatch(getAllProcessingFee())
    this.actions$.pipe(ofType(getAllProcessingFeeSuccess)).subscribe((res: any) => {
      this.processingFees = res.payload
    })
    this.loadIp();

    this.store.dispatch(getInstitutionConfiguration({institutionId: this.institutionId}))
    this.actions$.pipe(ofType(getInstitutionConfigurationSuccess)).subscribe((res: any) => {
      this.processingFeeList = res.payload.processingFeesVM
      this.updatedData = this.processingFeeList.map((x: any, index: number) => {
        const a = x.processingFeeConfigVM.map((element: any) => {
          return {
            processingFeeConfigId: element.id,
            fee: element.fee
          }
        });
        return {
          processingFeeId: x.id,
          updateProcessingFeeConfigVM : a,
          imei: '',
    serialNumber: '',
    device: this.deviceModel,
    ipAddress: this.ipAddress
        }
      })
      
      // this.processingFees = res.payload
    })

    // this.initFeeForm()
    // setTimeout(() => {
    //   this.populateForm()
    // }, 2000);
  }

  loadIp() {
    this.utilityService.getuserIP().subscribe((res: any) => {
     this.ipAddress = res.ip
    })
  }

  // initFeeForm() {
  //   this.feeForm = this.fb.group({
  //     fee: [''],
  //   })
  // }

  //  populateForm() {
  //   this.feeForm.patchValue({
  //     fee: 'N 5000',
  //   })
  // }

  getDocumentTypeName(event: any) {
    const data = this.processingFees.find((value: any) => value.id == Number(event));
    this.selectedDocumentType = this.processingFees.filter((value: any) => {
      if (value.id == Number(event)) {
        return value.documentName
      }
    });
    this.deliveryOption = data.processingFeeDeliveryTypeVMs
    this.deliveryOptionIds = this.deliveryOption.map((data: any) => data.deliveryOption)
  }

  getCheckedValue(name: string, event: any) {
    if (event.checked === true) {

      //console.log(name, event.value)
      // const a = this.selectedDocumentType.processingFeeDeliveryTypeVMs.map((x: any) => {
      //   if (x.id ===)
      // })
    }
  }

  openEdit(){
    document.getElementById('editModal')?.click();
  }
  closeEdit(){
    document.getElementById('editModal')?.click();
  }

  createDocumentType() {
    const payload = {
      documentTypeName : this.selectedDocumentType[0].documentName,
      processingFeeDocumentId: this.selectedDocumentType[0].id,
      deliveryOptions: this.deliveryOptionIds
    }
    this.store.dispatch(createProcessingFeeDocumentType({institutionId: this.institutionId ,payload: [payload]}))
    this.actions$.pipe(ofType(createProcessingFeeDocumentTypeSuccess)).subscribe((res: any) => {
      //console.log(res)

    })
  }

  getFee(data: any, input: any, parent: number, child: number)  {
    // console.log(data, input.value, parent, child)
    const allData = this.updatedData;
    let newData = this.updatedData[parent]
    const j = newData.updateProcessingFeeConfigVM.map((f: any, h: any) => {
      if (h === child) {
        return {processingFeeConfigId : f.processingFeeConfigId, fee: Number(input.value)}
      } else {
        return f
      }
    })
    newData.updateProcessingFeeConfigVM = j
    this.updatedData[parent] = newData;
    sessionStorage.setItem('prox_f', JSON.stringify(this.updatedData))
   
  }

  sendForApproval() {
    const data: any = sessionStorage.getItem('prox_f')
    const newData = JSON.parse(data)
this.store.dispatch(sendProcessingFeeForApproval({institutionId: this.institutionId, payload: newData }))
this.actions$.pipe(ofType(sendProcessingFeeForApprovalSuccess)).subscribe((res: any) => {
  if (res.payload.hasErrors === false) {
    this.notification.publishMessages('success', res.payload.description)
    this.store.dispatch(getInstitutionConfiguration({institutionId: this.institutionId}))

  }
})
  }
}
