import { Component, OnInit } from '@angular/core';

type Section = 'signup' | 'signin' | 'verification' | 'transcript' | 'payment' | 'security' | 'audit' | 'integration' | 'technical';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  sectionName = ['signup', 'signin', 'verification', 'transcript', 'payment', 'security', 'audit', 'integration', 'technical'];
  signup: boolean = true;
  signin: boolean = false;
  verification: boolean = false;
  transcript: boolean = false;
  payment: boolean = false;
  security: boolean = false;
  audit: boolean = false;
  integration: boolean = false;
  technical: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  showSection( section: Section) {
    
    const name = this.sectionName.find((name: string)  => name === section )
      
    if (name === section ) {
      this.signup = false;
      this.signin = false;
      this.verification = false;
      this.transcript = false;
      this.payment = false;
      this.security = false;
      this.audit = false;
      this.integration = false;
      this.technical = false;
      this[`${section}`] = true
    } 
  }

}
