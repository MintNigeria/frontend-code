import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduateRequestComponent } from './graduate-request.component';

describe('GraduateRequestComponent', () => {
  let component: GraduateRequestComponent;
  let fixture: ComponentFixture<GraduateRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraduateRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraduateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
