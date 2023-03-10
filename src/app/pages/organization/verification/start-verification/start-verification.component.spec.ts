import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartVerificationComponent } from './start-verification.component';

describe('StartVerificationComponent', () => {
  let component: StartVerificationComponent;
  let fixture: ComponentFixture<StartVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartVerificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
