import { TestBed } from '@angular/core/testing';

import { GraduateGuard } from './graduate.guard';

describe('GraduateGuard', () => {
  let guard: GraduateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GraduateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
