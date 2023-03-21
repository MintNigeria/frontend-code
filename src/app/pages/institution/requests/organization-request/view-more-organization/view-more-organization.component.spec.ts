import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMoreOrganizationComponent } from './view-more-organization.component';

describe('ViewMoreOrganizationComponent', () => {
  let component: ViewMoreOrganizationComponent;
  let fixture: ComponentFixture<ViewMoreOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMoreOrganizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMoreOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
