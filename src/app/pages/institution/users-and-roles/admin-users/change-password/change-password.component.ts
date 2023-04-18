import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { messageNotification } from 'src/app/store/auth/selector';
import { selectAppAPIResponse } from 'src/app/store/shared/app.selector';
import { changePasswordUserRole, changePasswordUserRoleSuccess } from 'src/app/store/users-and-roles/actions';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { Status } from 'src/app/types/shared.types';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm! : FormGroup;

  confirmChanges = 'confirmChanges';
  changesConfirmed = 'changesConfirmed';
  status: Status = Status.NORMAL;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<AppStateInterface>,
    private actions$: Actions,
    private notification: NotificationsService

  ) { }

  ngOnInit(): void {
    this.initPasswordForm()
  
  }

  initPasswordForm() {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required],
    }, {
      validator: this.MustMatch('newPassword', 'confirmNewPassword')
    })
  }


   openConfirmChanges() {
    document.getElementById('confirmChanges')?.click();
  }

  cancelConfirmChanges() {
    document.getElementById('confirmChanges')?.click();
  }

  openChangesConfirmed(){
  }
  
  updatePassword(){
    // document.getElementById('changesConfirmed')?.click();
    this.store.dispatch(changePasswordUserRole({ payload: this.passwordForm.value }));
    let message$ = this.appStore.pipe(select(messageNotification), take(2));
    this.actions$.pipe(ofType(changePasswordUserRoleSuccess)).subscribe((res: any) => {
      if (res.message.hasErrors === false) {
        document.getElementById('confirmChanges')?.click();
        this.notification.publishMessages('success', res.message.description)
        this.passwordForm.reset()
      }

    })

  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
  
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }
  
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }


}
