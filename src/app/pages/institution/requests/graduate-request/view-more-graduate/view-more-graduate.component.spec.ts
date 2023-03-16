import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMoreGraduateComponent } from './view-more-graduate.component';

describe('ViewMoreGraduateComponent', () => {
  let component: ViewMoreGraduateComponent;
  let fixture: ComponentFixture<ViewMoreGraduateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMoreGraduateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMoreGraduateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
