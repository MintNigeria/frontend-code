import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduateLoginComponent } from './graduate-login.component';

describe('GraduateLoginComponent', () => {
  let component: GraduateLoginComponent;
  let fixture: ComponentFixture<GraduateLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraduateLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraduateLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
