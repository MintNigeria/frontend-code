import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import {
  getInstitutionDataEncryptionDecryption,
  getInstitutionDataEncryptionDecryptionSuccess,
  getInstitutionDataSource,
  getInstitutionDataSourceSuccess,
  getInstitutionEndpoint,
  getInstitutionEndpointSuccess,
  setInstitutionDataEncryptionDecryption,
  setInstitutionDataEncryptionDecryptionSuccess,
  setInstitutionDataSource,
  setInstitutionDataSourceSuccess,
  setInstitutionEndpoint,
  setInstitutionEndpointSuccess,
} from 'src/app/store/institution/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-api-configuration',
  templateUrl: './api-configuration.component.html',
  styleUrls: ['./api-configuration.component.scss'],
})
export class ApiConfigurationComponent implements OnInit {
  apiConfigurationForm!: FormGroup;
  endpointForm!: FormGroup;
  uploadType = [
    {
      name: 'Excel Upload',
      slug: 'simple',
      description:
        'This involves uploading data to VAC system via the use of Excel sheet',
      dataSource: 2,
    },
    {
      name: 'API Upload',
      slug: 'api',
      description: 'Upload record by entering API endpoint in a structure data',
      dataSource: 1,
    },
  ];

  selectedFileUploadType: string = 'simple';
  institutionData: any;
  institutionId: any;
  in: any;
  configurationData: any;
  selectedDataSource: any;
  deviceModel: string;
  ipAddress: any;
  encryptionDecryptionData: any;
  endpointData: any;
  constructor(
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
    private notification: NotificationsService,
    private utilityService: UtilityService
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
    const dat: any = localStorage.getItem('userData');
    this.institutionData = JSON.parse(dat);
    this.institutionId = this.institutionData.InstitutionId;
    this.initApiConfigurationForm();
    this.initEndpointForm();
    this.store.dispatch(getInstitutionDataSource({ id: this.institutionId }));
    this.actions$
      .pipe(ofType(getInstitutionDataSourceSuccess))
      .subscribe((res: any) => {
        this.configurationData = res.payload;
        if (this.configurationData.dataSource === 1) {
          this.selectedFileUploadType = 'api';

          this.store.dispatch(
            getInstitutionDataEncryptionDecryption({ id: this.institutionId })
          );
          this.actions$
            .pipe(ofType(getInstitutionDataEncryptionDecryptionSuccess))
            .subscribe((res: any) => {
              this.encryptionDecryptionData = res.payload;
              this.patchApiConfigurationForm();
            });

          this.store.dispatch(
            getInstitutionEndpoint({ id: this.institutionId })
          );
          this.actions$
            .pipe(ofType(getInstitutionEndpointSuccess))
            .subscribe((res: any) => {
              this.endpointData = res.payload;
              this.patchEndpointForm();
            });
        }
      });
    this.utilityService.getuserIP().subscribe((res) => {
      this.ipAddress = res.query;
    });
  }

  initApiConfigurationForm() {
    this.apiConfigurationForm = new FormGroup({
      ivKey: new FormControl('', [
        Validators.required,
        Validators.maxLength(16),
        Validators.minLength(16),
      ]),
      secretKey: new FormControl('', [
        Validators.required,
        Validators.maxLength(16),
        Validators.minLength(16),
      ]),
    });
  }

  patchApiConfigurationForm() {
    this.apiConfigurationForm.patchValue({
      ivKey: this.encryptionDecryptionData.ivKey || '',
      secretKey: this.encryptionDecryptionData.secretKey || '',
    });
  }

  initEndpointForm() {
    this.endpointForm = new FormGroup({
      queryEndpoint: new FormControl('', [Validators.required]),
      configurationEndpoint: new FormControl('', [Validators.required]),
    });
  }

  patchEndpointForm() {
    this.endpointForm.reset();
    this.endpointForm.patchValue({
      queryEndpoint: this.endpointData.recordQueryEndpoint || '',
      configurationEndpoint: this.endpointData.configurationEndpoint || '',
    });
  }

  selecUploadType(unit: any) {
    this.selectedFileUploadType = unit.slug;
    this.selectedDataSource = unit.dataSource;
  }

  saveConfig() {
    const payload = {
      institutionId: Number(this.institutionId),
      dataSource: Number(this.selectedDataSource),
      createAuditVM: {
        imei: '',
        serialNumber: '',
        device: this.deviceModel,
        ipAddress: this.ipAddress,
      },
    };

    this.store.dispatch(setInstitutionDataSource({ payload }));
    this.actions$
      .pipe(ofType(setInstitutionDataSourceSuccess))
      .subscribe((res: any) => {
        if (res.payload.hasErrors === false) {
          this.notification.publishMessages('success', res.payload.description);
          this.store.dispatch(
            getInstitutionDataSource({ id: this.institutionId })
          );
        }
        this.patchApiConfigurationForm();
      });
  }

  setEncryptAndDecryptData() {
    const payload = {
      institutionId: Number(this.institutionId),
      ivKey: this.apiConfigurationForm.value.ivKey,
      secretKey: this.apiConfigurationForm.value.secretKey,
      createAuditVM: {
        imei: '',
        serialNumber: '',
        device: this.deviceModel,
        ipAddress: this.ipAddress,
      },
    };

    this.store.dispatch(setInstitutionDataEncryptionDecryption({ payload }));
    this.actions$
      .pipe(ofType(setInstitutionDataEncryptionDecryptionSuccess))
      .subscribe((res: any) => {
        if (res.payload.hasErrors === false) {
          this.notification.publishMessages('success', res.payload.description);
          this.store.dispatch(
            getInstitutionDataEncryptionDecryption({ id: this.institutionId })
          );
          this.actions$
            .pipe(ofType(getInstitutionDataEncryptionDecryptionSuccess))
            .subscribe((res: any) => {
              this.encryptionDecryptionData = res.payload;
              this.patchApiConfigurationForm();
            });
        }
      });
  }

  setEndpointData() {
    const payload = {
      institutionId: Number(this.institutionId),
      recordQueryEndpoint: this.endpointForm.value.queryEndpoint,
      configurationEndpoint: this.endpointForm.value.configurationEndpoint,
      createAuditVM: {
        imei: '',
        serialNumber: '',
        device: this.deviceModel,
        ipAddress: this.ipAddress,
      },
    };

    this.store.dispatch(setInstitutionEndpoint({ payload }));
    this.actions$
      .pipe(ofType(setInstitutionEndpointSuccess))
      .subscribe((res: any) => {
        if (res.payload.hasErrors === false) {
          this.notification.publishMessages('success', res.payload.description);
          this.store.dispatch(
            getInstitutionEndpoint({ id: this.institutionId })
          );
          this.actions$
            .pipe(ofType(getInstitutionEndpointSuccess))
            .subscribe((res: any) => {
              this.endpointData = res.payload;
              this.patchEndpointForm();
            });
        }
      });
  }
}
