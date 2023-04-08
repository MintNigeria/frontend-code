import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicSearchDetailsComponent } from './academic-search-details.component';

describe('AcademicSearchDetailsComponent', () => {
  let component: AcademicSearchDetailsComponent;
  let fixture: ComponentFixture<AcademicSearchDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicSearchDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicSearchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
