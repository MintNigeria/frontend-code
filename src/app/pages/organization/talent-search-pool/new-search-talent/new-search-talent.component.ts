import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-search-talent',
  templateUrl: './new-search-talent.component.html',
  styleUrls: ['./new-search-talent.component.scss']
})
export class NewSearchTalentComponent implements OnInit {

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
