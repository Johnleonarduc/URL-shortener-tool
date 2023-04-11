import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UrlShortenerApiService } from './url-shortener-api.service';

describe('UrlShortenerApiService', () => {
  let service: UrlShortenerApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ UrlShortenerApiService ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UrlShortenerApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
