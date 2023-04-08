import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestEmptyStateComponent } from './request-empty-state.component';

describe('RequestEmptyStateComponent', () => {
  let component: RequestEmptyStateComponent;
  let fixture: ComponentFixture<RequestEmptyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RequestEmptyStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestEmptyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
