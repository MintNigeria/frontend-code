import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationServiceComponent } from './verification-service.component';

describe('VerificationServiceComponent', () => {
  let component: VerificationServiceComponent;
  let fixture: ComponentFixture<VerificationServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificationServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificationServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
