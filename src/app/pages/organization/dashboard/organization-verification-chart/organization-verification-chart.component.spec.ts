import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationVerificationChartComponent } from './organization-verification-chart.component';

describe('OrganizationVerificationChartComponent', () => {
  let component: OrganizationVerificationChartComponent;
  let fixture: ComponentFixture<OrganizationVerificationChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationVerificationChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationVerificationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
