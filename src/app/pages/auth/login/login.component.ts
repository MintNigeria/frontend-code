import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecaptchaErrorParameters } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginAuth!: FormGroup;
siteKey: string = environment.recaptchaKey
  currentRoute!: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentRoute = this.route.snapshot.url[1].path
    this.initLoginForm();

  }

  initLoginForm() {
    this.loginAuth = new FormGroup({ 
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl(
        '',
        Validators.compose([Validators.email, Validators.required])
      ),
      recaptchaReactive: new FormControl(null, [Validators.required])
    });
  }

  fetchOTPCode() {

  }

  public resolved(captchaResponse: string): void {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.loginAuth.controls['recaptchaReactive'].setValue(captchaResponse)
  }

  createAccount() {
    if (this.currentRoute === 'graduate') {
      this.router.navigateByUrl('/create-account/graduate')
    } else if (this.currentRoute === 'organization') {
      this.router.navigateByUrl('/create-account/institution')
    } else {
      this.router.navigateByUrl('/create-account/institution')

    }
  }



}
