import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationDetailsComponent } from './verification-details.component';

describe('VerificationDetailsComponent', () => {
  let component: VerificationDetailsComponent;
  let fixture: ComponentFixture<VerificationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificationDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
