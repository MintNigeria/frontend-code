import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationRequestComponent } from './organization-request.component';

describe('OrganizationRequestComponent', () => {
  let component: OrganizationRequestComponent;
  let fixture: ComponentFixture<OrganizationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
