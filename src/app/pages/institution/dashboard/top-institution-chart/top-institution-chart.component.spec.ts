import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopInstitutionChartComponent } from './top-institution-chart.component';

describe('TopInstitutionChartComponent', () => {
  let component: TopInstitutionChartComponent;
  let fixture: ComponentFixture<TopInstitutionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopInstitutionChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopInstitutionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
