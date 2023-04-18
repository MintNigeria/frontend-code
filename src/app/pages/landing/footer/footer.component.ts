import { Component, OnInit } from '@angular/core';
import { LoginModalComponent } from '../modals/login-modal/login-modal.component';
import { MatDialog } from '@angular/material/dialog';

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

  openLogin() {
    const dialogRef = this.dialog.open(LoginModalComponent, {
    });
  }

}
