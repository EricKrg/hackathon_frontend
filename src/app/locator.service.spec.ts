import { TestBed } from '@angular/core/testing';

import { LocatorService } from './locator.service';

describe('LocatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocatorService = TestBed.get(LocatorService);
    expect(service).toBeTruthy();
  });
});
