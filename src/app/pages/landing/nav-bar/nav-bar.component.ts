import { Component, OnInit } from '@angular/core';
import { LoginModalComponent } from '../modals/login-modal/login-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateAccountModalComponent } from '../modals/create-account-modal/create-account-modal.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  mobileMenuOpen = false;

  constructor(
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
  }

  openLogin() {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      // width: '600px',
      // height: '600px'
    });
  }
  
  openCreateAccount() {
    const dialogRef = this.dialog.open(CreateAccountModalComponent, {
      width: '700px'
      // height: '600px'
    });

  }

}
