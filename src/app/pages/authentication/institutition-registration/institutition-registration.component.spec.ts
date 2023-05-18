import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutitionRegistrationComponent } from './institutition-registration.component';

describe('InstitutitionRegistrationComponent', () => {
  let component: InstitutitionRegistrationComponent;
  let fixture: ComponentFixture<InstitutitionRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutitionRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitutitionRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
