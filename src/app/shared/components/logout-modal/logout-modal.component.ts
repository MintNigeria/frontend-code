import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { StorageService } from 'src/app/core/services/shared/storage.service';
import { logoutAction } from 'src/app/store/auth/action';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.scss']
})
export class LogoutModalComponent implements OnInit {
  user: any;

  constructor(
    private dialogRef: MatDialogRef<LogoutModalComponent>,
    private localStorage: StorageService,
    private router: Router,
    private notificationService: NotificationsService,
    private authService: AuthService,
    private store: Store,



  ) { }

  ngOnInit(): void {
    const data: any = localStorage.getItem('authData')
    this.user = JSON.parse(data)
    console.log(this.user)
  }


  closeModal() {
    this.dialogRef.close();

  }


  logOutUser() {
    const payload = {
      emailAddress : this.user.user.email
    }
      this.authService.logOut(payload).subscribe((res: any) => {
        if (res) {
          this.notificationService.publishMessages('success', 'User logged out successfully')
          this.router.navigateByUrl('/')
          this.closeModal()
          this.store.dispatch(logoutAction());
          localStorage.clear()
          localStorage.removeItem('auth');
        }
       
      })
  }

}
