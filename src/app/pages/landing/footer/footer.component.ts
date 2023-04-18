import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateAccountModalComponent } from '../modals/create-account-modal/create-account-modal.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

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
