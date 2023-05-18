import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<LoginModalComponent>,

    private router: Router
  ) { }

  ngOnInit(): void {
  }

  gotoLogin(route: string) {
    this.dialogRef.close();
    this.router.navigateByUrl(`/authentication/${route}`)
    // this.router.navigateByUrl(`/auth/${route}`)
    
  }

}
