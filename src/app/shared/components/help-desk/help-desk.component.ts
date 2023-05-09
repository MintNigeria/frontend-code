import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { contactHelpDesk, contactHelpDeskSuccess } from 'src/app/store/institution copy/action';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-help-desk',
  templateUrl: './help-desk.component.html',
  styleUrls: ['./help-desk.component.scss']
})
export class HelpDeskComponent implements OnInit {
  helpDeskForm!: FormGroup
  user: any;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<HelpDeskComponent>,
    private appStore: Store<AppStateInterface>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    private $action: Actions,
    private store: Store,
    private notification : NotificationsService

  ) { 
    const data: any = localStorage.getItem('authData')
    this.user = JSON.parse(data)
  }

  ngOnInit(): void {
    this.helpDeskForm = this.fb.group({
      subject: ['', Validators.required],
      enquiry: ['', Validators.required]
    })
  }

  closeModal() {
    this.dialogRef.close();

  }

  submit() {
    const {subject, enquiry} = this.helpDeskForm.value
    const payload = {
      firstName: this.user.user.firstName,
      lastName: this.user.user.lastName,
      phoneNumber: this.user.user.phoneNumber,
      email: this.user.user.email,
      userType: String(this.modalData.userType),
      subject,
      enquiry
    }
    this.store.dispatch(contactHelpDesk({payload}))
    this.$action.pipe(ofType(contactHelpDeskSuccess)).subscribe((res: any) => {
      if (res.payload.hasErrors === false) {
        this.notification.publishMessages('success', res.payload.description)
        this.dialogRef.close()
      }
    })
  }
}
