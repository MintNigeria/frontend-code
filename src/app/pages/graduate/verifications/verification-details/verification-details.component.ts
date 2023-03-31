import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verification-details',
  templateUrl: './verification-details.component.html',
  styleUrls: ['./verification-details.component.scss']
})
export class VerificationDetailsComponent implements OnInit {
  requestId: any;
  requestDetail: any;
  verificationDetails: boolean = false;
  id!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private location: LocationStrategy
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id !== undefined){
      this.verificationDetails = true;
    }
  }

  download(file: any) {
    console.log(file)
       const link = document.createElement('a');
        link.download = `${file.fileUploadVM.name}`;
        link.href = 'data:image/png;base64,' + file.fileUploadVM.path;
        link.click();
  }

  back() {
    this.location.back();
  }


}
