import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { contactUs, contactUsSuccess, requestForDemo, requestForDemoSuccess } from 'src/app/store/institution copy/action';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-request-demo',
  templateUrl: './request-demo.component.html',
  styleUrls: ['./request-demo.component.scss']
})
export class RequestDemoComponent implements OnInit {
  SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  separateDialCode = true;

 
  contactForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private store: Store,
   private appStore: Store<AppStateInterface>,
   private actions$: Actions,
   private notification: NotificationsService
  ) { }

  ngOnInit(): void {
    this.initContactForm()
  
  }

  initContactForm() {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber : [''],
      jobTitle: [''],
      message: [''],
    })
  }

  submit() {
    const {firstName, lastName, email, phoneNumber, jobTitle, message } = this.contactForm.value;
    const payload = {
      firstName,
      lastName,
      email,
      phoneNumber: phoneNumber.internationalNumber,
      jobTitle,
      message
    }
    this.store.dispatch(requestForDemo({payload: payload}))
    this.actions$.pipe(ofType(requestForDemoSuccess)).subscribe((res: any) => {
      this.notification.publishMessages('success', res.payload.description)
      this.contactForm.reset()
    })
  }


}
