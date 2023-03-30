import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verification-details',
  templateUrl: './verification-details.component.html',
  styleUrls: ['./verification-details.component.scss']
})
export class VerificationDetailsComponent implements OnInit {
  requestId: any;
  requestDetail: any;
  constructor() { }

  ngOnInit(): void {
    
  }

  download(file: any) {
    console.log(file)
       const link = document.createElement('a');
        link.download = `${file.fileUploadVM.name}`;
        link.href = 'data:image/png;base64,' + file.fileUploadVM.path;
        link.click();
  }
}
