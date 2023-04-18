import { Component, OnInit } from '@angular/core';
import { CreateAccountModalComponent } from '../../modals/create-account-modal/create-account-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {
  constructor(
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
  }

  createAccount() {
    const dialogRef = this.dialog.open(CreateAccountModalComponent, {
      width: '800px',
      // height: '600px'
    });
  }

}
