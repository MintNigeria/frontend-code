import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDegreeTypeComponent } from './create-degree-type.component';

describe('CreateDegreeTypeComponent', () => {
  let component: CreateDegreeTypeComponent;
  let fixture: ComponentFixture<CreateDegreeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDegreeTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDegreeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
