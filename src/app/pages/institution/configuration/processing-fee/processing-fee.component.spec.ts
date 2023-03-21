import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingFeeComponent } from './processing-fee.component';

describe('ProcessingFeeComponent', () => {
  let component: ProcessingFeeComponent;
  let fixture: ComponentFixture<ProcessingFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessingFeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessingFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
