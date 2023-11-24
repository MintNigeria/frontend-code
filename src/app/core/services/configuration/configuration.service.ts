import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateInstitutionType, IUpdateInstitutionType } from 'src/app/store/configuration/types/index.types';
import { BaseURI } from '../shared/baseURI.shared';

abstract class AbstractConfigurationService {
  abstract getAllConfiguration(
    configurationStatus: number,
    keyword: string,
    filter: string,
    pageSize: number,
    pageIndex: number
  ): Observable<any>;
  abstract getAllProcessingDocument(): Observable<any>;
  abstract createProcessingDocument(
    documentName: string,
    description: string,
    deliveryOptions: number[]
  ): Observable<any>;
  abstract getAllPaymentPlans(): Observable<any>;
  abstract updatePaymentPlans(payload: any[]): Observable<any>;
  abstract getInstitutionSelector():Observable<any>;
  abstract getInstitutionType():Observable<any>;
  abstract getInstitutionBody():Observable<any>;
  abstract getInstitutionName():Observable<any>;
  abstract createInstitutionName(payload : any):Observable<any>;
  // abstract updateInstitutionName(payload : any):Observable<any>;
  abstract createInstitutionType(payload : ICreateInstitutionType): Observable<any>;
  abstract createInstitutionBody(payload : ICreateInstitutionType): Observable<any>;
  abstract updateInstitutionBody(payload : IUpdateInstitutionType): Observable<any>;
  abstract createInstitutionSector(payload : ICreateInstitutionType): Observable<any>;
  abstract updateInstitutionSector(payload : IUpdateInstitutionType): Observable<any>;

}

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService
  extends BaseURI
  implements AbstractConfigurationService
{
  constructor(private http: HttpClient) {
    super();
  }

  getAllConfiguration(
    configurationStatus: number,
    keyword: string,
    filter: string,
    pageSize: number,
    pageIndex: number
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Configuration/AllConfigurations?Keyword=${keyword}&Filter=${filter}&PageIndex=${pageIndex}&PageSize=${pageSize}&ConfigurationStatus=${configurationStatus}`
    );
  }
  
  

  getAllPaymentPlans() {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/subscription/all-payment-plans`
    );
  }

  updatePaymentPlans(payload: any[]) {
    return this.http.put<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Subscription/Payment-Plan`,
      payload
    );
  }

  createProcessingDocument(
    documentName: string,
    description: string,
    deliveryOptions: number[]
  ) {
    const payload = {
      documentName,
      description,
      deliveryOptions,
    };
    return this.http.post<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/ProcessingFeeDocument`,
      payload
    );
  }

  getInstitutionSelector(){
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Sector/GetAllInstitutionSector`
    );
  }

  getInstitutionType() {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionType/GetAllInstitutionTypes`
    );
  }
  getInstitutionBody(){
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionBody/GetAllInstitutionBodies`
    );
  }

  getInstitutionName(){
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Institution/AllInstitutionRecordsPaginated?PageIndex=1&PageSize=10`
    );
  }

  createInstitutionName(payload : any){
    return this.http.post<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Institution/CreateInstitutionRecord`, payload
    )
  }

  // updateInstitutionName(payload : any){
  //   return this.http.post<any>(
  //     `${this.baseUrl}mint-higherinstitution/api/v1/Institution/CreateInstitutionRecord`, payload
  //   )
  // }

  createInstitutionType(payload : ICreateInstitutionType){
    return this.http.post<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionType/CreateInstitutionType`, payload
    );
  }

  updateInstitutionType(payload : IUpdateInstitutionType){
    return this.http.put<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionType/UpdateInstitutionType`, payload
    );
  }

  createInstitutionBody(payload : ICreateInstitutionType){
    return this.http.post<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionBody/CreateInstitutionBody`, payload
    );
  }

  updateInstitutionBody(payload : IUpdateInstitutionType){
    return this.http.put<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionType/UpdateInstitutionType`, payload
    );
  }

  createInstitutionSector(payload : ICreateInstitutionType){
    return this.http.post<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Sector/CreateInstitutionSector`, payload
    );
  }

  updateInstitutionSector(payload : IUpdateInstitutionType){
    return this.http.post<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Sector/UpdateInstitutionSector`, payload
    );
  }

  getOrganaisationIndustry(){
    return this.http.get<any>(
      `${this.baseUrl}mint-organization/api/v1/Industy/GetAllIndustries`
    );
  }

  createOrganisationIndustry(payload : ICreateInstitutionType){
    return this.http.post<any>(
      `${this.baseUrl}mint-organization/api/v1/Industy/CreateIndustry`, payload
    );
  }

  
  updateOrganisationIndustry(payload : IUpdateInstitutionType){
    return this.http.post<any>(
      `${this.baseUrl}mint-organization/api/v1/Industy/UpdateIndustry`, payload
    );
  }

  
  getOrganaisationSector(){
    return this.http.get<any>(
      `${this.baseUrl}mint-organization/api/v1/OrganizationSector/GetAllOrganizationSectors`
    );
  }

  
  createOrganisationSector(payload : ICreateInstitutionType){
    return this.http.post<any>(
      `${this.baseUrl}mint-organization/api/v1/OrganizationSector/CreateOrganizationSector`, payload
    );
  }

  
  updateOrganisationSector(payload : IUpdateInstitutionType){
    return this.http.post<any>(
      `${this.baseUrl}mint-organization/api/v1/OrganizationSector/UpdateOrganizationSector`, payload
    );
  }

  

  updateInstitutionConfigurationDispatchFee(
    institutionId: string,
    payload: any
  ) {
    return this.http.put<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionConfiguration/DispatchFee/${institutionId}`, payload
    );
  }

  updateInstitutionConfigurationProcessingFee(
    institutionId: string,
    payload: any
  ) {
    return this.http.put<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionConfiguration/ProcessingFee/${institutionId}`, payload
    );
  }

  updateInstitutionVerificationFee(
    institutionId: string,
    payload: any
  ) {
    return this.http.put<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionConfiguration/VerificationFees/${institutionId}`, payload
    );
  }

  getActiveInstitutionConfigurations(
    institutionId: string,
    payload: any
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionConfiguration/ActiveDeliveryOptions/${institutionId}`
    );
  }


  // mine

  getInstitutionConfiguration(
    institutionId: string
  ) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionConfiguration/Configuration/${institutionId}`
    );
  }

  getAllProcessingDocument() {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/ProcessingFeeDocument`
    );
  }

  createProcessingFeeDocumentType(
    institutionId: string,
   payload : any
  ) {
    
    return this.http.post<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionConfiguration/ProcessingFeeDocumentType/${institutionId}`,
      payload
    );
  }

  sendProcessingFeeForApproval(
    institutionId: string,
   payload : any
  ) {
    
    return this.http.put<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionConfiguration/ProcessingFee/${institutionId}`,
      payload
    );
  }

  sendverificationFeeForApproval(
    institutionId: string,
   payload : any
  ) {
    
    return this.http.put<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionConfiguration/VerificationFees/${institutionId}`,
      payload
    );
  }

  saveDispatchFee(
    institutionId: string,
   payload : any
  ) {
    
    return this.http.put<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/InstitutionConfiguration/DispatchFee/${institutionId}`,
      payload
    );
  }

  createBankAccountDetails(
    payload : any,
    institutionId: string
  ) {
    
    return this.http.post<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Payment/Flutterwave/SubAccount/${institutionId}`,
      payload
    );
  }

  validateAccountDetails(
   payload : any
  ) {
    
    return this.http.post<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Payment/Flutterwave/Validate-Account-Details`,
      payload
    );
  }

  verifyFLWTransactions(transactionId : any) {
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Payment/Flutterwave/Verify-Transaction/${transactionId}`,
    );
  }

  getAllBanks() {
    
    return this.http.get<any>(
      `${this.baseUrl}mint-higherinstitution/api/v1/Payment/All-Banks`,
    );
  }

}
