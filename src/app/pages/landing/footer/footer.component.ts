import { Component, OnInit } from '@angular/core';
import { LoginModalComponent } from '../modals/login-modal/login-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateAccountModalComponent } from '../modals/create-account-modal/create-account-modal.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear = new Date().getFullYear();
  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openLogin() {
    // const dialogRef = this.dialog.open(CreateAccountModalComponent, {
    //   width: '700px'
    // });
  }

}
