import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-idle-screen-login',
  templateUrl: './idle-screen-login.component.html',
  styleUrls: ['./idle-screen-login.component.scss']
})
export class IdleScreenLoginComponent implements OnInit {
  loginAuth!: FormGroup;
  returnUrl: any;
  userData: any
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationsService,

  ) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    const data: any = localStorage.getItem('userData')
    this.userData = JSON.parse(data)

    this.initLoginForm()
    // console.log(this.userData)
  }
  initLoginForm() {
    this.loginAuth = new FormGroup({
      
      email: new FormControl(
        '',
        Validators.compose([Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), Validators.required])
      ),
    });
  }

  submit() {
    // console.log(this.returnUrl)
    const {email} = this.loginAuth.value;
    if (email !== this.userData.email) {
      this.notificationService.publishMessages('error', 'Invalid credential, please try again')
      return
    } else {

      this.router.navigateByUrl(this.returnUrl)
    }
  }

}
