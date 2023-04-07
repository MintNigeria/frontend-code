import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionIndexComponent } from './institution-index.component';

describe('InstitutionIndexComponent', () => {
  let component: InstitutionIndexComponent;
  let fixture: ComponentFixture<InstitutionIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitutionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
