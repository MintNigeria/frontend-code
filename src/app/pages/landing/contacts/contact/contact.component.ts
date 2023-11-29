import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'src/app/core/services/shared/notifications.service';
import { contactUs, contactUsSuccess } from 'src/app/store/institution copy/action';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  

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
      PhoneNumber : [''],
      subject: [''],
      message: [''],
    })
  }

  submit() {
    this.store.dispatch(contactUs({payload: this.contactForm.value}))
    this.actions$.pipe(ofType(contactUsSuccess)).subscribe((res: any) => {
      this.notification.publishMessages('success', res.payload.description)
      this.contactForm.reset()
    })
  }



  

}
