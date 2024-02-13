import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFailedDataComponent } from './view-failed-data.component';

describe('ViewFailedDataComponent', () => {
  let component: ViewFailedDataComponent;
  let fixture: ComponentFixture<ViewFailedDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFailedDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFailedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
