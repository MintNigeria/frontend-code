import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduateRegistrationComponent } from './graduate-registration.component';

describe('GraduateRegistrationComponent', () => {
  let component: GraduateRegistrationComponent;
  let fixture: ComponentFixture<GraduateRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraduateRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraduateRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
