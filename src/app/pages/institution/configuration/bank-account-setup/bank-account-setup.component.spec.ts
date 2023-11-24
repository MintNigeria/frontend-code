import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountSetupComponent } from './bank-account-setup.component';

describe('BankAccountSetupComponent', () => {
  let component: BankAccountSetupComponent;
  let fixture: ComponentFixture<BankAccountSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankAccountSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankAccountSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
