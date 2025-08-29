import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Restaurantdata } from './restaurantdata';

describe('Restaurantdata', () => {
  let service: Restaurantdata;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(Restaurantdata);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
