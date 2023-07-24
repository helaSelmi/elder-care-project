import { TestBed } from '@angular/core/testing';

import { ValidationUserService } from './validation-user.service';

describe('ValidationUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidationUserService = TestBed.get(ValidationUserService);
    expect(service).toBeTruthy();
  });
});
