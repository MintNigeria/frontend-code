export enum Status {
    LOADING = 'LOADING',
    NORMAL = 'NORMAL',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
  }
  
  export type SidebarRoute = {
    route: string;
    name: string;
    activeImage: string;
    image: string;
  };


  export interface PlaceOrderData {
    selectedPatient: any;
    patientDetail: any;
    testDrugAndOtherDetails: any;
    paymentDetail: any;
  }
  

  

