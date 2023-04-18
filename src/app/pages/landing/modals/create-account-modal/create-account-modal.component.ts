import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account-modal',
  templateUrl: './create-account-modal.component.html',
  styleUrls: ['./create-account-modal.component.scss']
})
export class CreateAccountModalComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<CreateAccountModalComponent>,

    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createAccount(route: string) {
    this.dialogRef.close();
    this.router.navigateByUrl(`/auth/create-account/${route}`)
    
  }
}
