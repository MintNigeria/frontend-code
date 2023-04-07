import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { StorageService } from 'src/app/core/services/shared/storage.service';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.scss']
})
export class LogoutModalComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<LogoutModalComponent>,
    private localStorage: StorageService,
    private router: Router,
    private notificationService: NotificationsService

  ) { }

  ngOnInit(): void {
  }


  closeModal() {
    this.dialogRef.close();

  }


  logOutUser() {
      this.localStorage.clear()
      this.notificationService.publishMessages('success', 'User logged out successfully')
      setTimeout(() => {
        this.closeModal()

        this.router.navigateByUrl('/')
      }, 1000);
  }

}
