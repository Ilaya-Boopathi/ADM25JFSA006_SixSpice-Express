import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TrackPageService } from './track-page-service';

describe('TrackPageService', () => {
  let service: TrackPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TrackPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
