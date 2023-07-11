import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURI } from '../shared/baseURI.shared';

abstract class AbstractGraduateService {
  abstract getAllInstitutionGraduates(
    institutionId: string,
    filter: any
  ): Observable<any>;
}

@Injectable({
  providedIn: 'root',
})
export class GraduatesService
  extends BaseURI
  implements AbstractGraduateService {
  constructor(private http: HttpClient) {
    super();
  }

  registerNewGraduate(payload: any) {
    const { approvalFile } = payload;
    const body = new FormData();
    body.append('FirstName', payload.FirstName);
    body.append('LastName', payload.LastName);
    body.append('PhoneNumber', payload.PhoneNumber.internationalNumber);
    body.append('Email', payload.Email);
    body.append('Address', payload.Address);
    body.append('Gender', payload.Gender);
    body.append('City', payload.City);
    body.append('Country', payload.Country);
    body.append('State', payload.State);
    body.append('ZipCode', payload.ZipCode);
    body.append('IdType', payload.IdType);
    body.append('IdNumber', payload.IdNumber);
    body.append(
      'InstitutionAttendedVMs[0].InstitutionType',
      payload.institutionTypeId
    );
    body.append(
      'InstitutionAttendedVMs[0].InstitutionSector',
      payload.institutionSectorId
    );
    body.append(
      'InstitutionAttendedVMs[0].InstitutionBody',
      payload.institutionBodyId
    );
    body.append(
      'InstitutionAttendedVMs[0].InstitutionName',
      payload.InstitutionName
    );
    body.append('Documents', payload.Designation);
    for (let i = 0; i < approvalFile.length; i++) {
      body.append('DocumentVM[' + i + '].FileNo', '');
      body.append('DocumentVM[' + i + '].File', approvalFile[i]);
    }
    return this.http.post<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/CreateGraduate`,
      body
    );
  }

  validateGraduateRegistration(payload: any) {
    return this.http.post<any>(
      `${this.baseUrl}mint-auth/api/v1/Authentication/EmailVerification`,
      payload
    );
  }
  getAllInstitutionGraduates(institutionId: string, filter: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionGraduate/InstitutionGraduates?InstitutionId=${institutionId}`,
      { params: filter }
    );
  }

  getGraduateById(graduateId: string, institutionId: string) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionGraduate/InstitutionGraduate?institutionId=${institutionId}&graduateId=${graduateId}`
    );
  }

  getAllPendingGraduates(
    keyword: string,
    filter: string,
    sort: string,
    pageIndex: number,
    pageSize: number
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/ApprovalRequest?Keyword=${keyword}&Filter=${filter}&Sort=${sort}&PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
  }

  approveGraduateRequest(payload: any) {
    return this.http.post<any>(
      `${this.baseUrl}mint-auth/api/v1/GraduateApproval/Approve-Request`,
      payload
    );
  }

  // this will be changed, not sure who uses it
  downloadANotherCSV(payload: any) {
    ////console.log(payload)
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/ExportAsCSV`,
      { params: payload }
    );
  }

  downloadANotherExcel(payload: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/ExportAsExcel`,
      { params: payload }
    );
  }

  // this is export for graduate records
  downloadCSV(payload: any) {
    ////console.log(payload)
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionGraduate/ExportAsCSV`,
      { params: payload }
    );
  }

  downloadExcel(payload: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionGraduate/ExportAsExcel`,
      { params: payload }
    );
  }

  uploadGraduateRecord(payload: any) {
    const body = new FormData();
    body.append('InstitutionId', payload.institutionId);
    body.append('FacultyId', payload.faculty);
    body.append('DepartmentId', payload.department);
    body.append('DegreeTypeId', payload.degreeType);
    body.append('YearOfGraduation', payload.yearOfGraduation);
    body.append('File', payload.Document);
    return this.http.post<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionGraduate/UploadGraduates`,
      body
    );
  }

  createGraduateRecord(payload: any) {
    return this.http.post<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionGraduate/CreateGraduates`,
      payload
    );
  }

  downloadRecordUploadFormat(payload: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionGraduate/DownloadUploadFormat`,
      { params: payload }
    );
  }

  getAllGraduateRequestForGradaute(payload: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/GraduateRequest/Requests`,
      { params: payload }
    );
  }

  getAllGraduateRequestDetailForGradaute(requestId: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/GraduateRequest/${requestId}`
    );
  }

  getGraduateTransactionHistory(payload: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/GraduateRequest/Graduate-Transaction-History`,
      { params: payload }
    );
  }

  notifyMyInstitution(payload: any) {
    return this.http.post<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/NotifyMyInstitution`,
      payload
    );
  }

  getMyInstitutionNotified(id: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/MyInstitutionToNotify/${id}`
    );
  }
  getMyInstitutionsNotifiedStatus(id: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/NotifyMyInstitutionStatus/${id}`
    );
  }

  getGraduateProfile(id: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/GetGraduateProfile/${id}`
    );
  }

  getGraduateInstitutions(id: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/GraduateInstitutions/${id}`
    );
  }

  updateGraduateInstitutions(payload: any, id: any) {
    console.log(id);
    return this.http.put<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/GraduateInstitutions/${id}`,
      payload
    );
  }

  updateGraduateProfile(payload: any) {
    const body = new FormData();
    body.append('FirstName', payload.firstName);
    body.append('LastName', payload.lastName);
    body.append('MiddleName', payload.middleName);
    body.append('PhoneNumber', payload.phone.internationalNumber);
    body.append('DateOfBirth', payload.dateOfBirth);
    body.append('Address', payload.address);
    body.append('Country', payload.country);
    body.append('State', payload.state);
    body.append('StateOfOrigin', payload.stateOfOrigin);
    body.append('City', payload.city);
    body.append('ZipCode', payload.zipCode);
    body.append('Twitter', payload.twitter);
    body.append('Facebook', payload.facebook);
    body.append('LinkedIn', payload.linkedIn);
    body.append('ProfileImage', payload.profileImage);
    body.append('Device', payload.device);
    body.append('IpAddress', payload.ipAddress);
    body.append('IMEI', payload.imei);
    body.append('SerialNumber', payload.serialNumber);
    return this.http.put<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/GraduateProfile`,
      body
    );
  }
  uploadHubItem(payload: any) {
    const body = new FormData();
    body.append('File', payload.file);
    body.append('DocumentName', payload.documentName);
    body.append('IssuerName', payload.Issuer);
    body.append('DateIssued', payload.date);
    body.append('IMEI', payload.imei);
    body.append('SerialNumber', payload.serialNumber);
    body.append('Device', payload.device);
    body.append('IpAddress', payload.ipAddress);
    return this.http.post<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/UploadHubItem`,
      body
    );
  }

  getAllHubItem(payload: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/ViewHubItems`,
      { params: payload }
    );
  }

  deleteHubItem(payload: any) {
    return this.http.delete<any>(
      `${this.baseUrl}mint-auth/api/v1/Graduates/DeletHubItem`,
      { params: payload }
    );
  }

  getGraduateCertificateVerifications(payload: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/GraduateRequest/Graduate-Certificate-Verifications`,
      { params: payload }
    );
  }

  getGraduateCertificateVerificationDetail(id: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/GraduateRequest/Graduate-Verification/${id}`
    );
  }

  searchGraduateRecords(payload: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/GraduateRequest/Search-Graduate-Records`,
      { params: payload }
    );
  }

  submitGraduateVerificationRequest(payload: any) {
    return this.http.post<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/GraduateRequest/Graduate-Certificate-Verification-Request`,
      payload
    );
  }

  exportGraduateApplicationAsExcel(payload: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/GraduateRequest/Export-Graduate-Application-Request-As-Excel`,
      { params: payload }
    );
  }

  exportGraduateApplicationCSV(payload: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/GraduateRequest/Export-Graduate-Application-Request-As-CSV`,
      { params: payload }
    );
  }

  exportGraduateVerificationAsExcel(payload: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/GraduateRequest/Export-Graduate-Verification-Request-As-Excel`,
      { params: payload }
    );
  }

  exportGraduateVerificationCSV(payload: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/GraduateRequest/Export-Graduate-Verification-Request-As-CSV`,
      { params: payload }
    );
  }

  exportGraduateTransactionAsExcel(payload: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/GraduateRequest/Export-Graduate-Transaction-As-Excel`,
      { params: payload }
    );
  }

  exportGraduateTransactionAsCSV(payload: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/GraduateRequest/Export-Graduate-Transaction-As-CSV`,
      { params: payload }
    );
  }

  graduateTransactionTypeFilter() {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/GraduateRequest/TransactionType-For-Graduate-Filter`
    );
  }

  graduateDocumentTypeFilter(id: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/GraduateRequest/Graduate-DocumentType-For-Filter/${id}`
    );
  }

  retryApplicationVarificationPayment(id: any) {
    return this.http.post<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/GraduateRequest/Retry-Payment-For-Graduate-Requests`, {requestId: Number(id)}
    );
  }

  submitVerificationReasonForRequest(payload: any) {
    const { Document } = payload;
    const body = new FormData();
    body.append('InstitutionGraduateId', payload.InstitutionGraduateId);
    body.append('GraduateId', payload.GraduateId);
    body.append('ReasonForRequestType', payload.ReasonForRequestType);
    body.append('InstitutionId', payload.InstitutionId);
    body.append('IMEI', payload.imei);
    body.append('SerialNumber', payload.serialNumber);
    body.append('Device', payload.device);
    body.append('IpAddress', payload.ipAddress);
    for (let i = 0; i < Document.length; i++) {
      body.append('GraduateVerificationDocumentVM[' + i + '].FileNo', '');
      body.append(
        'GraduateVerificationDocumentVM[' + i + '].File',
        Document[i]
      );
    }
    return this.http.post<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/GraduateRequest/Graduate-Certificate-Verification-Request`,
      body
    );
  }

  createGraduateApplication(payload: any) {
    const { hardCopyOptionVM, emailOptionVM, fileUploadOptionVM } = payload;

    const body = new FormData();
    for (let i = 0; i < emailOptionVM?.length; i++) {
      if (payload.emailOptionVM.length !== 0) {
        body.append(
          'model.CreateApplicationVM[' + i + '].DeliveryOption',
          payload.paymentDetailsVM.deliveryOption
        );
        body.append(
          'model.CreateApplicationVM[' + i + '].GraduateId',
          payload.academicDetails.GraduateId
        );
        body.append(
          'model.CreateApplicationVM[' + i + '].InstitutionId',
          payload.academicDetails.institutionId
        );
        body.append(
          'model.CreateApplicationVM[' + i + '].PhoneNumber',
          payload.emailOptionVM[i].phoneNo.internationalNumber
        );
        body.append(
          'model.CreateApplicationVM[' + i + '].DocumentType',
          payload.paymentDetailsVM.documentType
        );
        body.append(
          'model.CreateApplicationVM[' + i + '].MatriculationNumber',
          payload.academicDetails.matriculationNumber
        );
        body.append(
          'model.CreateApplicationVM[' + i + '].EmailOptionVM.Email',
          payload.emailOptionVM[i].email
        );
        body.append(
          'model.CreateApplicationVM[' + i + '].ReasonForRequest',
          payload.emailOptionVM[i].reasonForRequest
        );
        body.append(
          'model.CreateApplicationVM[' + i + '].InstitutionGraduateId',
          payload.academicDetails.id
        );
        body.append(
          'model.CreateApplicationVM[' + i + '].DocumentId',
          payload.paymentDetailsVM.documentId
        );

        body.append(
          'model.CreateApplicationVM[' +
          i +
          '].PaymentDetailsVM.ProcessingFeeAmount',
          payload.paymentDetailsVM.fee
        );
        body.append(
          'model.CreateApplicationVM[' +
          i +
          '].SupportingDocuments[0].SupportingDocumentType',
          payload.supportingDocument.whiteBgPassport.type
        );
        body.append(
          'model.CreateApplicationVM[' + i + '].SupportingDocuments[0].File',
          payload.supportingDocument.whiteBgPassport.File
        );
        body.append(
          'model.CreateApplicationVM[' +
          i +
          '].SupportingDocuments[1].SupportingDocumentType',
          payload.supportingDocument.validIdCard.type
        );
        body.append(
          'model.CreateApplicationVM[' + i + '].SupportingDocuments[1].File',
          payload.supportingDocument.validIdCard.File
        );
      }
    }

    for (let i = 0; i < fileUploadOptionVM?.length; i++) {
      if (payload.fileUploadOptionVM.length !== 0) {
        body.append(
          'model.CreateApplicationVM[' + i + '].DeliveryOption',
          payload.paymentDetailsVM.deliveryOption
        );
        body.append(
          'model.CreateApplicationVM[' +
          i +
          '].PaymentDetailsVM.ProcessingFeeAmount',
          payload.paymentDetailsVM.fee
        );
        body.append(
          'model.CreateApplicationVM[' + i + '].DocumentType',
          payload.paymentDetailsVM.documentType
        );
        body.append(
          'model.CreateApplicationVM[' + i + '].DocumentId',
          payload.paymentDetailsVM.documentId
        );
        body.append(
          'model.CreateApplicationVM[' + i + '].GraduateId',
          payload.academicDetails.id
        );
        body.append(
          'model.CreateApplicationVM[' + i + '].InstitutionId',
          payload.academicDetails.institutionId
        );
        body.append(
          'model.CreateApplicationVM[' + i + '].MatriculationNumber',
          payload.academicDetails.matriculationNumber
        );
        body.append(
          'model.CreateApplicationVM[' + i + '].InstitutionGraduateId',
          payload.academicDetails.id
        );
        body.append(
          'model.CreateApplicationVM[' + i + '].PhoneNumber',
          payload.fileUploadOptionVM.phoneNo.internationalNumber
        );
        body.append(
          'model.CreateApplicationVM[' + i + '].FileUploadOptionVM.UrlAddress',
          payload.fileUploadOptionVM[i].url
        );
        body.append(
          'model.CreateApplicationVM[' +
          i +
          '].FileUploadOptionVM.LoginUserName',
          payload.fileUploadOptionVM[i].loginUser
        );
        body.append(
          'model.CreateApplicationVM[' +
          i +
          '].FileUploadOptionVM.LoginPassword',
          payload.fileUploadOptionVM[i].loginPassword
        );
        body.append(
          'model.CreateApplicationVM[' + i + '].ReasonForRequest',
          payload.fileUploadOptionVM[i].reasonForRequest
        );

        body.append(
          'model.CreateApplicationVM[' +
          i +
          '].SupportingDocuments[0].SupportingDocumentType',
          payload.supportingDocument.whiteBgPassport.type
        );
        body.append(
          'model.CreateApplicationVM[' + i + '].SupportingDocuments[0].File',
          payload.supportingDocument.whiteBgPassport.File
        );
        body.append(
          'model.CreateApplicationVM[' +
          i +
          '].SupportingDocuments[1].SupportingDocumentType',
          payload.supportingDocument.validIdCard.type
        );
        body.append(
          'model.CreateApplicationVM[' + i + '].SupportingDocuments[1].File',
          payload.supportingDocument.validIdCard.File
        );
      }
    }
    for (let i = 0; i < hardCopyOptionVM?.length; i++) {
      if (payload.hardCopyOptionVM.length !== 0) {
        for (let i = 0; i < hardCopyOptionVM.length; i++) {
          body.append(
            'model.CreateApplicationVM[' + i + '].DocumentType',
            payload.paymentDetailsVM.documentType
          );
          body.append(
            'model.CreateApplicationVM[' + i + '].DeliveryOption',
            payload.paymentDetailsVM.deliveryOption
          );
          body.append(
            'model.CreateApplicationVM[' +
            i +
            '].PaymentDetailsVM.ProcessingFeeAmount',
            payload.paymentDetailsVM.fee
          );
          body.append(
            'model.CreateApplicationVM[' + i + '].DocumentId',
            payload.paymentDetailsVM.documentId
          );
          body.append(
            'model.CreateApplicationVM[' + i + '].InstitutionGraduateId',
            payload.academicDetails.id
          );
          body.append(
            'model.CreateApplicationVM[' + i + '].GraduateId',
            payload.academicDetails.GraduateId
          );
          body.append(
            'model.CreateApplicationVM[' + i + '].InstitutionId',
            payload.academicDetails.institutionId
          );
          body.append(
            'model.CreateApplicationVM[' + i + '].MatriculationNumber',
            payload.academicDetails.matriculationNumber
          );
          body.append(
            'model.CreateApplicationVM[' + i + '].PhoneNumber',
            payload.hardCopyOptionVM[i].phoneNo.internationalNumber
          );

          body.append(
            'model.CreateApplicationVM[' + i + '].ReasonForRequest',
            payload.hardCopyOptionVM[i].reasonForRequest
          );
          body.append(
            'model.CreateApplicationVM[' + i + '].HardCopyOptionVM.Country',
            payload.hardCopyOptionVM[i].country
          );
          body.append(
            'model.CreateApplicationVM[' + i + '].HardCopyOptionVM.State',
            payload.hardCopyOptionVM[i].state
          );
          body.append(
            'model.CreateApplicationVM[' + i + '].HardCopyOptionVM.City',
            payload.hardCopyOptionVM[i].city
          );
          body.append(
            'model.CreateApplicationVM[' +
            i +
            '].HardCopyOptionVM.postalOrZipCode',
            payload.hardCopyOptionVM[i].zipCode
          );
          body.append(
            'model.CreateApplicationVM[' + i + '].HardCopyOptionVM.Destination',
            payload.hardCopyOptionVM[i].address
          );
          body.append(
            'model.CreateApplicationVM[' +
            i +
            '].HardCopyOptionVM.DispatchMethod',
            payload.hardCopyOptionVM[i].dispatchMethod
          );

          body.append(
            'model.CreateApplicationVM[' +
            i +
            '].PaymentDetailsVM.DispatchAmount',
            payload.hardCopyOptionVM[i].dispatchAmount
          );

          body.append(
            'model.CreateApplicationVM[' +
            i +
            '].SupportingDocuments[0].SupportingDocumentType',
            payload.supportingDocument.whiteBgPassport.type
          );
          body.append(
            'model.CreateApplicationVM[' + i + '].SupportingDocuments[0].File',
            payload.supportingDocument.whiteBgPassport.File
          );
          body.append(
            'model.CreateApplicationVM[' +
            i +
            '].SupportingDocuments[1].SupportingDocumentType',
            payload.supportingDocument.validIdCard.type
          );
          body.append(
            'model.CreateApplicationVM[' + i + '].SupportingDocuments[1].File',
            payload.supportingDocument.validIdCard.File
          );
          if (
            payload.supportingDocument?.studentFinalClearance?.File.length !== 0
          ) {
            body.append(
              'model.CreateApplicationVM[' +
              i +
              '].SupportingDocuments[2].SupportingDocumentType',
              payload.supportingDocument.studentFinalClearance?.type
            );
            body.append(
              'model.CreateApplicationVM[' +
              i +
              '].SupportingDocuments[2].File',
              payload.supportingDocument.studentFinalClearance?.File
            );
          }
          if (
            payload.supportingDocument?.notificationOfResult?.File.length !== 0
          ) {
            body.append(
              'model.CreateApplicationVM[' +
              i +
              '].SupportingDocuments[3].SupportingDocumentType',
              payload.supportingDocument?.notificationOfResult?.type
            );
            body.append(
              'model.CreateApplicationVM[' +
              i +
              '].SupportingDocuments[3].File',
              payload.supportingDocument.notificationOfResult.File
            );
          }
          if (payload.supportingDocument?.affidavit?.File.length !== 0) {
            body.append(
              'model.CreateApplicationVM[' +
              i +
              '].SupportingDocuments[4].SupportingDocumentType',
              payload.supportingDocument?.affidavit?.type
            );
            body.append(
              'model.CreateApplicationVM[' +
              i +
              '].SupportingDocuments[4].File',
              payload.supportingDocument?.affidavit?.File
            );
          }
          if (payload.supportingDocument?.policceReport?.File.length !== 0) {
            body.append(
              'model.CreateApplicationVM[' +
              i +
              '].SupportingDocuments[5].SupportingDocumentType',
              payload.supportingDocument?.policceReport?.type
            );
            body.append(
              'model.CreateApplicationVM[' +
              i +
              '].SupportingDocuments[5].File',
              payload.supportingDocument?.policceReport?.File
            );
          }
        }
      }
    }

    return this.http.post<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/GraduateRequest/ApplicationRequest`,
      body
    );
  }

  createGraduateApplicationEmail(payload: any) {
    // console.log(payload)
    const { emailOptionVM, supportingDocument } = payload;
    // console.log(payload.academicDetails, payload.paymentDetailsVM, payload.emailOptionVM)
    const body = new FormData();
    body.append(
      'model.CreateApplicationVM[' + 0 + '].GraduateId',
      payload?.academicDetails.GraduateId
    );
    body.append(
      'model.CreateApplicationVM[' + 0 + '].InstitutionId',
      payload?.academicDetails.institutionId
    );
    body.append(
      'model.CreateApplicationVM[' + 0 + '].MatriculationNumber',
      payload?.academicDetails.matriculationNumber
    );
    body.append(
      'model.CreateApplicationVM[' + 0 + '].InstitutionGraduateId',
      payload?.academicDetails.id
    );
    body.append(
      'model.CreateApplicationVM[' + 0 + '].DeliveryOption',
      payload?.paymentDetailsVM.deliveryOption
    );
    body.append(
      'model.CreateApplicationVM[' + 0 + '].DocumentType',
      payload?.paymentDetailsVM.documentType
    );
    body.append(
      'model.CreateApplicationVM[' + 0 + '].DocumentId',
      payload?.paymentDetailsVM.documentId
    );
    body.append(
      'model.CreateApplicationVM[' +
      0 +
      '].PaymentDetailsVM.ProcessingFeeAmount',
      payload?.paymentDetailsVM.fee
    );
    for (let i = 0; i < emailOptionVM?.length; i++) {
      console.log(emailOptionVM[i]);
      body.append(
        'model.CreateApplicationVM[' + 0 + '].PhoneNumber',
        emailOptionVM[i].phoneNo.internationalNumber
      );
      body.append(
        'model.CreateApplicationVM[' + 0 + '].EmailOptionVM.Email',
        emailOptionVM[i].email
      );
      body.append(
        'model.CreateApplicationVM[' + 0 + '].ReasonForRequest',
        emailOptionVM[i].reasonForRequest
      );
    }
    for (let i = 0; i < supportingDocument?.length; i++) {
      console.log(supportingDocument[i]);

      body.append(
        'model.CreateApplicationVM[' +
        0 +
        '].SupportingDocuments[0].SupportingDocumentType',
        supportingDocument[0].type
      );
      body.append(
        'model.CreateApplicationVM[' + 0 + '].SupportingDocuments[0].File',
        supportingDocument[0].File
      );
      body.append(
        'model.CreateApplicationVM[' +
        0 +
        '].SupportingDocuments[1].SupportingDocumentType',
        supportingDocument[1].type
      );
      body.append(
        'model.CreateApplicationVM[' + 0 + '].SupportingDocuments[1].File',
        supportingDocument[1].File
      );
    }

    return this.http.post<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/GraduateRequest/ApplicationRequest`,
      body
    );
  }

  createGraduateApplicationFileUpload(payload: any) {
    const { fileUploadOptionVM, supportingDocument } = payload;
    const body = new FormData();
    body.append(
      'model.CreateApplicationVM[' + 0 + '].DeliveryOption',
      payload.paymentDetailsVM.deliveryOption
    );
    body.append(
      'model.CreateApplicationVM[' +
      0 +
      '].PaymentDetailsVM.ProcessingFeeAmount',
      payload.paymentDetailsVM.fee
    );
    body.append(
      'model.CreateApplicationVM[' + 0 + '].DocumentType',
      payload.paymentDetailsVM.documentType
    );
    body.append(
      'model.CreateApplicationVM[' + 0 + '].DocumentId',
      payload.paymentDetailsVM.documentId
    );
    body.append(
      'model.CreateApplicationVM[' + 0 + '].GraduateId',
      payload.academicDetails.id
    );
    body.append(
      'model.CreateApplicationVM[' + 0 + '].InstitutionId',
      payload.academicDetails.institutionId
    );
    body.append(
      'model.CreateApplicationVM[' + 0 + '].MatriculationNumber',
      payload.academicDetails.matriculationNumber
    );
    body.append(
      'model.CreateApplicationVM[' + 0 + '].InstitutionGraduateId',
      payload.academicDetails.id
    );

    for (let i = 0; i < fileUploadOptionVM?.length; i++) {
      console.log(fileUploadOptionVM[i]);

      body.append(
        'model.CreateApplicationVM[' + 0 + '].PhoneNumber',
        fileUploadOptionVM[i].phoneNo.internationalNumber
      );
      body.append(
        'model.CreateApplicationVM[' + 0 + '].FileUploadOptionVM.UrlAddress',
        fileUploadOptionVM[i].url
      );
      body.append(
        'model.CreateApplicationVM[' + 0 + '].FileUploadOptionVM.LoginUserName',
        fileUploadOptionVM[i].loginUser
      );
      body.append(
        'model.CreateApplicationVM[' + 0 + '].FileUploadOptionVM.LoginPassword',
        fileUploadOptionVM[i].loginPassword
      );
      body.append(
        'model.CreateApplicationVM[' + 0 + '].ReasonForRequest',
        fileUploadOptionVM[i].reasonForRequest
      );
    }

    for (let i = 0; i < supportingDocument?.length; i++) {
      console.log(supportingDocument[i]);

      body.append(
        'model.CreateApplicationVM[' +
        0 +
        '].SupportingDocuments[0].SupportingDocumentType',
        supportingDocument[0].type
      );
      body.append(
        'model.CreateApplicationVM[' + 0 + '].SupportingDocuments[0].File',
        supportingDocument[0].File
      );
      body.append(
        'model.CreateApplicationVM[' +
        0 +
        '].SupportingDocuments[1].SupportingDocumentType',
        supportingDocument[1].type
      );
      body.append(
        'model.CreateApplicationVM[' + 0 + '].SupportingDocuments[1].File',
        supportingDocument[1].File
      );
    }
    return this.http.post<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/GraduateRequest/ApplicationRequest`,
      body
    );
  }
  createGraduateApplicationHardCopy(payload: any) {
    const { hardCopyOptionVM, supportingDocument } = payload;
    const body = new FormData();
    body.append(
      'model.CreateApplicationVM[' + 0 + '].DocumentType',
      payload.paymentDetailsVM.documentType
    );
    body.append(
      'model.CreateApplicationVM[' + 0 + '].DeliveryOption',
      payload.paymentDetailsVM.deliveryOption
    );
    body.append(
      'model.CreateApplicationVM[' +
      0 +
      '].PaymentDetailsVM.ProcessingFeeAmount',
      payload.paymentDetailsVM.fee
    );
    body.append(
      'model.CreateApplicationVM[' + 0 + '].DocumentId',
      payload.paymentDetailsVM.documentId
    );
    body.append(
      'model.CreateApplicationVM[' + 0 + '].InstitutionGraduateId',
      payload.academicDetails.id
    );
    body.append(
      'model.CreateApplicationVM[' + 0 + '].GraduateId',
      payload.academicDetails.GraduateId
    );
    body.append(
      'model.CreateApplicationVM[' + 0 + '].InstitutionId',
      payload.academicDetails.institutionId
    );
    body.append(
      'model.CreateApplicationVM[' + 0 + '].MatriculationNumber',
      payload.academicDetails.matriculationNumber
    );

      body.append(
        'model.CreateApplicationVM[' + 0 + '].PhoneNumber',
        hardCopyOptionVM[0].phoneNo?.internationalNumber
      );
        body.append(
          'model.CreateApplicationVM[' + 0 + '].ReasonForRequest',
          hardCopyOptionVM[0].reasonForRequest
        );
        body.append(
          'model.CreateApplicationVM[' + 0 + '].HardCopyOptionVM.Country',
          hardCopyOptionVM[0].country
        );
        body.append(
          'model.CreateApplicationVM[' + 0 + '].HardCopyOptionVM.State',
          hardCopyOptionVM[0].state
        );
        body.append(
          'model.CreateApplicationVM[' + 0 + '].HardCopyOptionVM.City',
          hardCopyOptionVM[0].city
        );
        body.append(
          'model.CreateApplicationVM[' + 0 + '].HardCopyOptionVM.postalOrZipCode',
          hardCopyOptionVM[0].zipCode
        );
        body.append(
          'model.CreateApplicationVM[' + 0 + '].HardCopyOptionVM.Destination',
          hardCopyOptionVM[0].address
        );
        body.append(
          'model.CreateApplicationVM[' + 0 + '].HardCopyOptionVM.DispatchMethod',
          hardCopyOptionVM[0].dispatchMethod
        );
  
        body.append(
          'model.CreateApplicationVM[' + 0 + '].PaymentDetailsVM.DispatchAmount',
          hardCopyOptionVM[0].dispatchAmount
        );
   
        body.append(
          'model.CreateApplicationVM[' +
          0 +
          '].SupportingDocuments[0].SupportingDocumentType',
          supportingDocument[0].type
        );
        body.append(
          'model.CreateApplicationVM[' + 0 + '].SupportingDocuments[0].File',
          supportingDocument[0].File
        );
        body.append(
          'model.CreateApplicationVM[' +
          0 +
          '].SupportingDocuments[1].SupportingDocumentType',
          supportingDocument[1].type
        );
        body.append(
          'model.CreateApplicationVM[' + 0 + '].SupportingDocuments[1].File',
          supportingDocument[1].File
        );
        if (supportingDocument[2]?.File) {
              body.append(
                'model.CreateApplicationVM[' +
                0 +
                '].SupportingDocuments[2].SupportingDocumentType',
                supportingDocument[2].type
              );
              body.append(
                'model.CreateApplicationVM[' + 0 + '].SupportingDocuments[2].File',
                supportingDocument[2].File
              );
            }
        if (supportingDocument[3]?.File) {
              body.append(
                'model.CreateApplicationVM[' +
                0 +
                '].SupportingDocuments[3].SupportingDocumentType',
                supportingDocument[3].type
              );
              body.append(
                'model.CreateApplicationVM[' + 0 + '].SupportingDocuments[3].File',
                supportingDocument[3].File
              );
            }
        if (supportingDocument[4]?.File) {
              body.append(
                'model.CreateApplicationVM[' +
                0 +
                '].SupportingDocuments[4].SupportingDocumentType',
                supportingDocument[4].type
              );
              body.append(
                'model.CreateApplicationVM[' + 0 + '].SupportingDocuments[4].File',
                supportingDocument[4].File
              );
            }
        if (supportingDocument[5]?.File) {
              body.append(
                'model.CreateApplicationVM[' +
                0 +
                '].SupportingDocuments[5].SupportingDocumentType',
                supportingDocument[5].type
              );
              body.append(
                'model.CreateApplicationVM[' + 0 + '].SupportingDocuments[5].File',
                supportingDocument[5].File
              );
            }
 
    return this.http.post<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/GraduateRequest/ApplicationRequest`,
      body
    );
  }

  getActiveDeliveryOptions(processingfeeId: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionConfiguration/ActiveDeliveryOptions/${processingfeeId}`
    );
  }

  getTalentSearchProfileCmpletionStatus(graduateId: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/TalentSearch/Has-Completed-Profile-For-TalentSearch/${graduateId}`
    );
  }

  getTalentSearchProfile(graduateId: any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-auth/api/v1/TalentSearch/Experience-Profile/${graduateId}`
    );
  }

  completeGraduateTalentSearchProfile(payload: any) {
    const { educationalQualificationVM, skillSetVM, workHistoryVM } = payload;
    const body = new FormData();
    body.append(
      'GraduateId',
      payload.graduateId
    );
    body.append(
      'CreateProfessionalQualificationVM[' + 0 + '].LinkedInProfile',
      payload.linkedInProfile
    );
    body.append(
      'CreateProfessionalQualificationVM[' + 0 + '].PortfolioUrl',
      payload.porfolioUrl
    );
    body.append(
      'CreateProfessionalQualificationVM[' + 0 + '].DocumentVM.File',
      payload.resume
    );
    for (let i = 0; i < payload.qualifications?.length; i++) {

      body.append(
        `CreateProfessionalQualificationVM[0].ProfessionalQualification[${i}]`,
        payload.qualifications[i]
      );
   
    }
    for (let i = 0; i < educationalQualificationVM?.length; i++) {

      body.append(
        'CreateEducationalQualificationVM[' + i + '].InstitutionName',
        educationalQualificationVM[i].InstitutionName
      );
      body.append(
        'CreateEducationalQualificationVM[' + i + '].CourseOfStudy',
        educationalQualificationVM[i].course
      );
      body.append(
        'CreateEducationalQualificationVM[' + i + '].DegreeObtained',
        educationalQualificationVM[i].degree
      );
      body.append(
        'CreateEducationalQualificationVM[' + i + '].ClassOfDegree',
        educationalQualificationVM[i].classOfDegree
      );
      body.append(
        'CreateEducationalQualificationVM[' + i + '].YearOfGraduation',
        educationalQualificationVM[i].yearOfGraduation
      );
      body.append(
        'CreateEducationalQualificationVM[' + i + '].DocumentVM.File',
        educationalQualificationVM[i].certificate
      );
   
    }
    for (let i = 0; i < skillSetVM?.length; i++) {

      body.append(
        'CreateSkillSetVM[' + i + '].Description',
        skillSetVM[i].description
      );
      body.append(
        'CreateSkillSetVM[' + i + '].QualificationName',
        skillSetVM[i].title
      );
      body.append(
        'CreateSkillSetVM[' + i + '].YearOfCertification',
        skillSetVM[i].year
      );
    
      body.append(
        'CreateSkillSetVM[' + i + '].DocumentVM.File',
        skillSetVM[i].document
      );
   
    }
    for (let i = 0; i < workHistoryVM?.length; i++) {

      body.append(
        'CreateWorkHistoryVM[' + i + '].CompanyName',
        workHistoryVM[i].companyName
      );
      body.append(
        'CreateWorkHistoryVM[' + i + '].CompanyAddress',
        workHistoryVM[i].companyAddress
      );
      body.append(
        'CreateWorkHistoryVM[' + i + '].Profession',
        workHistoryVM[i].profession
      );
      body.append(
        'CreateWorkHistoryVM[' + i + '].Title',
        workHistoryVM[i].title
      );
      body.append(
        'CreateWorkHistoryVM[' + i + '].IsCurrentPlaceOfEmployment',
        workHistoryVM[i].isCurrent
      );
      body.append(
        'CreateWorkHistoryVM[' + i + '].DateOfEmployment',
        workHistoryVM[i].dateOfEmployment
      );
      body.append(
        'CreateWorkHistoryVM[' + i + '].EndDateOfEmployment',
        workHistoryVM[i].endOfEmployment
      );
      body.append(
        'CreateWorkHistoryVM[' + i + '].YearsOfExperience',
        workHistoryVM[i].yearsOfExperience
      );
    
     
   
    }
    return this.http.post<any>(
      `${this.baseUrl}mint-auth/api/v1/TalentSearch/Complete-Profile-For-TalentSearch`, body
    );
  }


  updateGraduateTalentSearchProfile(payload: any) {
    const { educationalQualificationVM, skillSetVM, workHistoryVM } = payload;
    const body = new FormData();
    body.append(
      'GraduateId',
      payload.graduateId
    );
    body.append(
      'UpdateProfessionalQualificationVM[' + 0 + '].LinkedInProfile',
      payload.linkedInProfile
    );
    body.append(
      'UpdateProfessionalQualificationVM[' + 0 + '].PortfolioUrl',
      payload.porfolioUrl
    );
    if (payload.resume) {
      body.append(
        'UpdateProfessionalQualificationVM[' + 0 + '].DocumentVM.File',
        payload.resume
      );

    }
    body.append(
      'UpdateProfessionalQualificationVM[' + 0 + '].Id',
      payload.id 
    );
    for (let i = 0; i < payload.qualifications?.length; i++) {

      body.append(
        `UpdateProfessionalQualificationVM[0].ProfessionalQualification[${i}]`,
        payload.qualifications[i]
      );
   
    }
    for (let i = 0; i < educationalQualificationVM?.length; i++) {

      body.append(
        'UpdateEducationalQualificationVM[' + i + '].Id',
        educationalQualificationVM[i].id
      );
      body.append(
        'UpdateEducationalQualificationVM[' + i + '].InstitutionName',
        educationalQualificationVM[i].InstitutionName
      );
      body.append(
        'UpdateEducationalQualificationVM[' + i + '].CourseOfStudy',
        educationalQualificationVM[i].course
      );
      body.append(
        'UpdateEducationalQualificationVM[' + i + '].DegreeObtained',
        educationalQualificationVM[i].degree
      );
      body.append(
        'UpdateEducationalQualificationVM[' + i + '].ClassOfDegree',
        educationalQualificationVM[i].classOfDegree
      );
      body.append(
        'UpdateEducationalQualificationVM[' + i + '].YearOfGraduation',
        educationalQualificationVM[i].yearOfGraduation
      );
      if (educationalQualificationVM[i].certificate) {

        body.append(
          'UpdateEducationalQualificationVM[' + i + '].DocumentVM.File',
          educationalQualificationVM[i].certificate
        );
      }
   
    }
    for (let i = 0; i < skillSetVM?.length; i++) {

      body.append(
        'UpdateSkillSetVM[' + i + '].Description',
        skillSetVM[i].description
      );
      body.append(
        'UpdateSkillSetVM[' + i + '].Id',
        skillSetVM[i].id
      );
      body.append(
        'UpdateSkillSetVM[' + i + '].QualificationName',
        skillSetVM[i].title
      );
      body.append(
        'UpdateSkillSetVM[' + i + '].YearOfCertification',
        skillSetVM[i].year
      );
    
      if (skillSetVM[i].document) {

        body.append(
          'UpdateSkillSetVM[' + i + '].DocumentVM.File',
          skillSetVM[i].document
        );
      }
   
    }
    for (let i = 0; i < workHistoryVM?.length; i++) {

      body.append(
        'UpdateWorkHistoryVM[' + i + '].Id',
        workHistoryVM[i].id
      );
      body.append(
        'UpdateWorkHistoryVM[' + i + '].CompanyName',
        workHistoryVM[i].companyName
      );
      body.append(
        'UpdateWorkHistoryVM[' + i + '].CompanyAddress',
        workHistoryVM[i].companyAddress
      );
      body.append(
        'UpdateWorkHistoryVM[' + i + '].Profession',
        workHistoryVM[i].profession
      );
      body.append(
        'UpdateWorkHistoryVM[' + i + '].Title',
        workHistoryVM[i].title
      );
      body.append(
        'UpdateWorkHistoryVM[' + i + '].DateOfEmployment',
        workHistoryVM[i].dateOfEmployment
      );
      body.append(
        'UpdateWorkHistoryVM[' + i + '].IsCurrentPlaceOfEmployment',
        workHistoryVM[i].isCurrent
      );
      body.append(
        'UpdateWorkHistoryVM[' + i + '].EndDateOfEmployment',
        workHistoryVM[i].endOfEmployment
      );
      body.append(
        'UpdateWorkHistoryVM[' + i + '].YearsOfExperience',
        workHistoryVM[i].yearsOfExperience
      );
    }
    return this.http.put<any>(
      `${this.baseUrl}mint-auth/api/v1/TalentSearch/Profile-For-TalentSearch`, body
    );
  }
}
