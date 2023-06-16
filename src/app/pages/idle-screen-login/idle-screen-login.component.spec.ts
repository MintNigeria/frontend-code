import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdleScreenLoginComponent } from './idle-screen-login.component';

describe('IdleScreenLoginComponent', () => {
  let component: IdleScreenLoginComponent;
  let fixture: ComponentFixture<IdleScreenLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdleScreenLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdleScreenLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
