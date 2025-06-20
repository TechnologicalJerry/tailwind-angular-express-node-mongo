import { TestBed } from '@angular/core/testing';

import { Constants } from './constants';

describe('Constants', () => {
  let service: Constants;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Constants);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
