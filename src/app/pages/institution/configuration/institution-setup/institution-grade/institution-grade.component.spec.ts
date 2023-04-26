import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionGradeComponent } from './institution-grade.component';

describe('InstitutionGradeComponent', () => {
  let component: InstitutionGradeComponent;
  let fixture: ComponentFixture<InstitutionGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionGradeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitutionGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
