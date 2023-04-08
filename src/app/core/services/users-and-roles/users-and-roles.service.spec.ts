import { TestBed } from '@angular/core/testing';

import { UsersAndRolesService } from './users-and-roles.service';

describe('UsersAndRolesService', () => {
  let service: UsersAndRolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersAndRolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
