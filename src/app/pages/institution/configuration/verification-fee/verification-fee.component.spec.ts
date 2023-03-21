import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationFeeComponent } from './verification-fee.component';

describe('VerificationFeeComponent', () => {
  let component: VerificationFeeComponent;
  let fixture: ComponentFixture<VerificationFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificationFeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificationFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
