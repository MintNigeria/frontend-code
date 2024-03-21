import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { ConfigurationService } from 'src/app/core/services/configuration/configuration.service';

@Component({
  selector: 'app-bank-account-setup',
  templateUrl: './bank-account-setup.component.html',
  styleUrls: ['./bank-account-setup.component.scss']
})
export class BankAccountSetupComponent implements OnInit {
  bankSetupForm!: FormGroup
  banks: any;
  deviceModel: string;
  ipAddress: any;
  institutionData: any;
  bankList: any;
  accountName: any;
  showAccountName = false;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
    private notification: NotificationsService,
    private utilityService: UtilityService,
    private configurationService: ConfigurationService
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
    this.getAllBanks()
    const data: any = localStorage.getItem('userData')
    
    this.institutionData = JSON.parse(data)
    this.getInstitutionAccountDetails()
    this.bankSetupForm = this.fb.group({
      account_bank: [''],
      bankCode: ['', Validators.required],
      bankName: ['', Validators.required],
      accountNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    })
    this.utilityService.getuserIP().subscribe((res) => {
      this.ipAddress = res.query;
    });
  }

  getAllBanks() {
    this.configurationService.getAllBanks().subscribe((res: any) => {
      this.bankList = res.payload
    })
  }

  getInstitutionAccountDetails() {
    this.configurationService.getBankAccountDetails(this.institutionData.InstitutionId).subscribe((res: any) => {
      console.log(res)
      this.accountName = res.payload.bankName;
      this.showAccountName = true;
      this.bankSetupForm.patchValue({
        accountNumber: res.payload.bankAccountNumber
      })
    })
  }


  selectBank(event: any) {
    this.bankSetupForm.controls['bankCode'].setValue(event.code)
    this.bankSetupForm.controls['bankName'].setValue(event.name)

  }

  validateAccount(event: any) {
    const { bankName } = this.bankSetupForm.value;
    if (event.target.value.length === 10) {
      const payload = {

        accountNumber: event.target.value,
        accountBank: bankName

      }

      this.configurationService.validateAccountDetails(payload).subscribe((res: any) => {
        console.log(res)
        if (res.hasErrors === false) {
          this.showAccountName = true;
          this.accountName = res.payload.accountName;
        } else {
          this.showAccountName = true;
          
        }
      })
    }
  }

  createSetup() {
    const { accountNumber, bankCode, bankName } = this.bankSetupForm.value;
    const payload = {
      accountNumber,
      bankCode,
      bankName,
      businessName: this.institutionData.Institution,
      businessEmail: this.institutionData.email,
      businessContact: this.institutionData.Institution,
      businessContactMobile: this.institutionData.phone_number,
      businessMobile: this.institutionData.phone_number,
      splitValue: 0,
      imei: '',
      serialNumber: '',
      device: this.deviceModel,
      ipAddress: this.ipAddress
    }

    this.configurationService.createBankAccountDetails(payload, this.institutionData.InstitutionId).subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.notification.publishMessages('success', res.description)
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
