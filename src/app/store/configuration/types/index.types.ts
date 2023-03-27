export interface ICreateInstitutionType {
  name: string,
  imei: string,
  serialNumber: string,
  device: string,
  ipAddress: string
}

export interface IUpdateInstitutionType {
  id : number,
  name: string,
  imei: string,
  serialNumber: string,
  device: string,
  ipAddress: string
}
export interface ConfigurationStateInterface {
  configuration: { data: Array<any>; totalCount: number };
  documentType: any[];
  paymentPlan: any[];
  selector : any[],
  type : any[],
  body : any[],
  name : any[],
  organisationSector : any[],
  organisationIndustry : any[],
  message: string;
  institutionConfig: any;
  processingfee: any;
  newprocessingfee: any;
}
