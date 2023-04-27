import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduateVerificationDetailsComponent } from './graduate-verification-details.component';

describe('GraduateVerificationDetailsComponent', () => {
  let component: GraduateVerificationDetailsComponent;
  let fixture: ComponentFixture<GraduateVerificationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraduateVerificationDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraduateVerificationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
