import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchFeeComponent } from './dispatch-fee.component';

describe('DispatchFeeComponent', () => {
  let component: DispatchFeeComponent;
  let fixture: ComponentFixture<DispatchFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispatchFeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispatchFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
