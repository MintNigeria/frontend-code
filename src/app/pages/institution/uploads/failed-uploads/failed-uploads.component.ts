import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-failed-uploads',
  templateUrl: './failed-uploads.component.html',
  styleUrls: ['./failed-uploads.component.scss']
})
export class FailedUploadsComponent implements OnInit {

  selectedData: any;
  selectedDataId: any;
  
  

  

  infoData = {
    batchNUmber: '1234567',
    uploadedBy: 'Glory-ann Chiemela',
    dateUploaded: '12th June, 2022, 9:23 AM',
    count: '40 successful, 10 failed',
    status: "Failed"
  }


  uploadsData = [
    {
    id: 1,
    date: 'Jan 6,2022',
    time: '12:24 AM',
    batchNUmber: '1234567',
    count: '40',
    status: 'failed',
    action: 'view'
    
  },
  {
    id: 2,
    date: 'Jan 6,2022',
    time: '12:24 AM',
    batchNUmber: '1234567',
    count: '40',
    status: 'failed',
    action: 'view'
    
  },
  {
    id: 3,
    date: 'Jan 6,2022',
    time: '12:24 AM',
    batchNUmber: '1234567',
    count: '40',
    status: 'failed',
    action: 'view'
    
  },
  {
    id: 4,
    date: 'Jan 6,2022',
    time: '12:24 AM',
    batchNUmber: '1234567',
    count: '40',
    status: 'failed',
    action: 'view'
    
  },
  {
    id: 5,
    date: 'Jan 6,2022',
    initiator: 'Adekunle Ciroma',
    amount: '2,000',
    action: 'view',
    
  },
  {
    id: 6,
    date: 'Jan 6,2022',
    time: '12:24 AM',
    batchNUmber: '1234567',
    count: '40',
    status: 'failed',
    action: 'view'
    
  },
   {
    id: 7,
    date: 'Jan 6,2022',
    time: '12:24 AM',
    batchNUmber: '1234567',
    count: '40',
    status: 'failed',
    action: 'view'
    
  },
   {
    id: 8,
    date: 'Jan 6,2022',
    time: '12:24 AM',
    batchNUmber: '1234567',
    count: '40',
    status: 'failed',
    action: 'view'
    
  },
   {
    id: 9,
    date: 'Jan 6,2022',
    time: '12:24 AM',
    batchNUmber: '1234567',
    count: '40',
    status: 'failed',
    action: 'view'
    
  },
   {
    id: 10,
    date: 'Jan 6,2022',
    time: '12:24 AM',
    batchNUmber: '1234567',
    count: '40',
    status: 'failed',
    action: 'view'
    
  }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  showData(id: number) {
    this.selectedData = this.uploadsData.find(data => data.id === id);
    this.selectedDataId = this.uploadsData.find((uploads) => uploads.id === id);

    console.log(this.selectedData,this.selectedDataId)
  }


}
