import { TestBed } from '@angular/core/testing';

import { FetchdriversService } from './fetchdrivers.service';

describe('FetchdriversService', () => {
  let service: FetchdriversService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchdriversService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
