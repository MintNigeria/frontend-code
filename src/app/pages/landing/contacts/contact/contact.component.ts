import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initContactForm()
    setTimeout(() => {
      this.populateForm()
    }, 2000);
  }

  initContactForm() {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      tel: [''],
      text: [''],
    })
  }

  populateForm() {
    this.contactForm.patchValue({
      firstName: 'Rodney',
      lastName: 'Guy',
      email: 'rodneyguy@guy.com',
      tel: '28374892023',
      text: 'I cant access my account '
    })
  }

}
