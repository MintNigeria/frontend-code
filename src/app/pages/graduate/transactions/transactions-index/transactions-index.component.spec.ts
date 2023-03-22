import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsIndexComponent } from './transactions-index.component';

describe('TransactionsIndexComponent', () => {
  let component: TransactionsIndexComponent;
  let fixture: ComponentFixture<TransactionsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
