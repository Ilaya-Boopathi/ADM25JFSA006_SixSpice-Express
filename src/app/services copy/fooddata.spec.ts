import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Fooddata } from './fooddata';

describe('Fooddata', () => {
  let service: Fooddata;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(Fooddata);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
