export interface ReportingStateInterface {
  reports: { data: Array<any>; totalCount: number };
  transactions: { data: any; totalCount: number };
  excelExport: any;
  csvExport: any;
  excelExportReport: any;
  csvExportReport: any;
}
