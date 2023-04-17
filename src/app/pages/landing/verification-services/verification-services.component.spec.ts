import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationServicesComponent } from './verification-services.component';

describe('VerificationServicesComponent', () => {
  let component: VerificationServicesComponent;
  let fixture: ComponentFixture<VerificationServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificationServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificationServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
