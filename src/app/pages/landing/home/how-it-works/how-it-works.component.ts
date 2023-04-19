import { Component, OnInit } from '@angular/core';
import { LoginModalComponent } from '../../modals/login-modal/login-modal.component';
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

  openLogin() {
    const dialogRef = this.dialog.open(LoginModalComponent, {
    });
  }

}
