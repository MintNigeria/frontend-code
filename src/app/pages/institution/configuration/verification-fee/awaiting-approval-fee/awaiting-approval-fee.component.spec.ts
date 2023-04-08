import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitingApprovalFeeComponent } from './awaiting-approval-fee.component';

describe('AwaitingApprovalFeeComponent', () => {
  let component: AwaitingApprovalFeeComponent;
  let fixture: ComponentFixture<AwaitingApprovalFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwaitingApprovalFeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwaitingApprovalFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
