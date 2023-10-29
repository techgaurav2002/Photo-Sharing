import { TestBed } from '@angular/core/testing';

import { NormalGurdService } from './normal-gurd.service';

describe('NormalGurdService', () => {
  let service: NormalGurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NormalGurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
