import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotifierService } from 'angular-notifier';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { createProcessingFeeDocumentType, createProcessingFeeDocumentTypeSuccess, getAllProcessingFee, getAllProcessingFeeSuccess, getInstitutionConfiguration, getInstitutionConfigurationSuccess } from 'src/app/store/configuration/action';
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

  constructor(
     private fb: FormBuilder,
     private readonly formBuilder: FormBuilder,
     private store: Store,
    private appStore: Store<AppStateInterface>,
    private router: Router,
    private actions$: Actions,
  ) {
    this.editForm = this.formBuilder.group({
      documentName: ['', Validators.required],
      description: [''],
      email: [false],
      fileUpload: [false],
      hardCopy: [false]
    });
   }

  ngOnInit(): void {
    const data: any = localStorage.getItem('userData')
    this.institutionData = JSON.parse(data)
    this.institutionId = this.institutionData.InstitutionId
    this.store.dispatch(getAllProcessingFee())
    this.actions$.pipe(ofType(getAllProcessingFeeSuccess)).subscribe((res: any) => {
      this.processingFees = res.payload
    })
    this.store.dispatch(getInstitutionConfiguration({institutionId: this.institutionId}))
    this.actions$.pipe(ofType(getInstitutionConfigurationSuccess)).subscribe((res: any) => {
      this.processingFeeList = res.payload.processingFeesVM
      // this.processingFees = res.payload
    })
    this.initFeeForm()
    setTimeout(() => {
      this.populateForm()
    }, 2000);
  }

  initFeeForm() {
    this.feeForm = this.fb.group({
      fee: [''],
    })
  }

   populateForm() {
    this.feeForm.patchValue({
      fee: 'N 5000',
    })
  }

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

      console.log(name, event.value)
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
      console.log(res)

    })
  }
}
