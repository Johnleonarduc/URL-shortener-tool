import { TestBed } from '@angular/core/testing';

import { UrlShortenerApiService } from './url-shortener-api.service';

describe('UrlShortenerApiService', () => {
  let service: UrlShortenerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlShortenerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
