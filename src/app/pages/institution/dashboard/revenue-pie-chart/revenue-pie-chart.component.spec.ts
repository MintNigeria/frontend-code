import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuePieChartComponent } from './revenue-pie-chart.component';

describe('RevenuePieChartComponent', () => {
  let component: RevenuePieChartComponent;
  let fixture: ComponentFixture<RevenuePieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenuePieChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenuePieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
