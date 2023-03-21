import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-value-added-services',
  templateUrl: './value-added-services.component.html',
  styleUrls: ['./value-added-services.component.scss']
})
export class ValueAddedServicesComponent implements OnInit {

  selectedOption: string = "Academic Report";

  confirmChanges = 'confirmChanges';
  changesConfirmed = 'changesConfirmed';

  constructor() { }

  ngOnInit(): void {
  }

  generateReport() {
    document.getElementById('confirmChanges')?.click();
  }

  cancelConfirmChanges() {
    document.getElementById('confirmChanges')?.click();
  }

}
