import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationReasonComponent } from './verification-reason.component';

describe('VerificationReasonComponent', () => {
  let component: VerificationReasonComponent;
  let fixture: ComponentFixture<VerificationReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificationReasonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificationReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
