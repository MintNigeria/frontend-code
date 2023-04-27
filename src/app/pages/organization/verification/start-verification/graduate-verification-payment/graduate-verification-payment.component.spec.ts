import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduateVerificationPaymentComponent } from './graduate-verification-payment.component';

describe('GraduateVerificationPaymentComponent', () => {
  let component: GraduateVerificationPaymentComponent;
  let fixture: ComponentFixture<GraduateVerificationPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraduateVerificationPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraduateVerificationPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
