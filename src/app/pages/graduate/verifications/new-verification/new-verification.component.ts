import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-verification',
  templateUrl: './new-verification.component.html',
  styleUrls: ['./new-verification.component.scss']
})
export class NewVerificationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goBack() {
  window.history.back();
  }

}
