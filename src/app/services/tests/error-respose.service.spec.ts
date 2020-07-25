import { TestBed } from '@angular/core/testing';

import { ErrorResposeService } from './error-respose.service';

describe('ErrorResposeService', () => {
  let service: ErrorResposeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorResposeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
