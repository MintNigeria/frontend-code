import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeTypeComponent } from './degree-type.component';

describe('DegreeTypeComponent', () => {
  let component: DegreeTypeComponent;
  let fixture: ComponentFixture<DegreeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DegreeTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DegreeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
