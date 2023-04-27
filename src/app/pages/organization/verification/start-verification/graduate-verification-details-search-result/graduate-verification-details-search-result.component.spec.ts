import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduateVerificationDetailsSearchResultComponent } from './graduate-verification-details-search-result.component';

describe('GraduateVerificationDetailsSearchResultComponent', () => {
  let component: GraduateVerificationDetailsSearchResultComponent;
  let fixture: ComponentFixture<GraduateVerificationDetailsSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraduateVerificationDetailsSearchResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraduateVerificationDetailsSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
