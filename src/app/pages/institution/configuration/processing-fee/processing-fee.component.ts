import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
// import { NotifierService } from 'angular-notifier';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { createProcessingFeeDocumentType, createProcessingFeeDocumentTypeSuccess, getAllProcessingFee, getAllProcessingFeeSuccess, getInstitutionConfiguration, getInstitutionConfigurationSuccess, sendProcessingFeeForApproval, sendProcessingFeeForApprovalSuccess } from 'src/app/store/configuration/action';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as numeral from 'numeral';

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
  isFeeApproved: any;
  isFirstFeeApproved: any;
  processingFeeSetup!: boolean;

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
    this.initFeeForm()
    this.store.dispatch(getInstitutionConfiguration({institutionId: this.institutionId}))
    this.actions$.pipe(ofType(getInstitutionConfigurationSuccess)).subscribe((res: any) => {
      // console.log(res.payload)
      this.processingFeeList = res.payload.processingFeesVM.map((x: any) => {
        const a = x.processingFeeConfigVM.map((element: any) => {
          return {
            processingFeeConfigId: element.id,
            deliveryOptionsType: element.deliveryOptionsType,
            inActiveFee: numeral(element.inActiveFee).format('00,'),
          }
        });
        return {
          documentTypeName : x.documentTypeName,
          description: x.description,
          processingFeeId: x.id,
          processingFeeConfigVM : a,
        }
      })
      // console.log(this.processingFeeList) 

      this.isFeeApproved = res.payload.isProcessingFeeApproved
      this.isFirstFeeApproved = res.payload.isFirstTimeAddingProcessingFee
      this.processingFeeSetup = res.payload.hasSetUpProcessingFee

      this.updatedData = res.payload.processingFeesVM.map((x: any, index: number) => {
        const a = x.processingFeeConfigVM.map((element: any) => {
          return {
            processingFeeConfigId: element.id,
            inActiveFee: numeral(element.inActiveFee).format('00,')
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
      console.log(this.updatedData)
    })


    // this.initFeeForm()
    // setTimeout(() => {
    //   this.populateForm()
    // }, 2000);
  }

  loadIp() {
    this.utilityService.getuserIP().subscribe((res: any) => {
     this.ipAddress = res.query
    })
  }

  initFeeForm() {
    this.processingFeesForm = this.fb.group({
      feeType: ['', Validators.required],
    })
  }

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
    switch (name) {
      case 'Email':
        if (event.checked === true) {
          this.deliveryOptionIds.push(1)
        } else {
          this.deliveryOptionIds =  this.deliveryOptionIds.filter((element: any) => element !== 1)
        }
        break;
        case 'File Upload':
        if (event.checked === true) {
          this.deliveryOptionIds.push(2)
        } else {
          this.deliveryOptionIds = this.deliveryOptionIds.filter((element: any) => element !== 2)

        }
        break;
        case 'Hard Copy':
        if (event.checked === true) {
          this.deliveryOptionIds.push(3)
        } else {
          this.deliveryOptionIds =  this.deliveryOptionIds.filter((element: any) => element !== 3)

        }
        break;

      default:
        break;
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
      if (res.payload.hasErrors === false) {
        this.notification.publishMessages('success', res.payload.description)
        this.closeEdit()
        this.store.dispatch(getInstitutionConfiguration({institutionId: this.institutionId}))

      }
    })
  }

  addCommas(data: any, input: any, parent: number, child: number)  {
    let newData = this.processingFeeList[parent]
    const j = newData.processingFeeConfigVM.map((f: any, h: any) => {
      if (h === child) {
        return {processingFeeConfigId : f.processingFeeConfigId, inActiveFee:  numeral(input.value).format('00,'), deliveryOptionsType: f.deliveryOptionsType,}
      } else {
        return f
      }
    })
    newData.processingFeeConfigVM = j
    this.processingFeeList[parent] = newData;
    // console.log(this.processingFeeList)
    // sessionStorage.setItem('prox_f', JSON.stringify(this.updatedData))
   
  }
  getFee(data: any, input: any, parent: number, child: number)  {
    // //console.log(data, input.value, parent, child)
    const allData = this.updatedData;
    let newData = this.updatedData[parent]
    const j = newData.updateProcessingFeeConfigVM.map((f: any, h: any) => {
      if (h === child) {
        return {processingFeeConfigId : f.processingFeeConfigId, inActiveFee: numeral(input.value).value()}
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
    console.log(newData)
    const payload = newData.map((x: any) => {
      const a = x.updateProcessingFeeConfigVM.map((el: any) => {
        return {
          fee: numeral(el.inActiveFee).value(),
          processingFeeConfigId: el.processingFeeConfigId
        }
      });
      return {

        device: x.device,
        imei: x.imei,
        ipAddress: x.ipAddress,
        processingFeeId: x.processingFeeId,
        serialNumber: x.serialNumber,
        updateProcessingFeeConfigVM: a,
      }
    })
this.store.dispatch(sendProcessingFeeForApproval({institutionId: this.institutionId, payload }))
this.actions$.pipe(ofType(sendProcessingFeeForApprovalSuccess)).subscribe((res: any) => {
  if (res.payload.hasErrors === false) {
    this.notification.publishMessages('success', res.payload.description)
    this.store.dispatch(getInstitutionConfiguration({institutionId: this.institutionId}))
    sessionStorage.removeItem('prox_f')

  }
})
  }


  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
