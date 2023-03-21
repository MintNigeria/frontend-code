import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePaymentVasComponent } from './make-payment-vas.component';

describe('MakePaymentVasComponent', () => {
  let component: MakePaymentVasComponent;
  let fixture: ComponentFixture<MakePaymentVasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakePaymentVasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakePaymentVasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
