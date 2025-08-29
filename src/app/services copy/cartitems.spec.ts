import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Cartitems } from './cartitems';

describe('Cartitems', () => {
  let service: Cartitems;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(Cartitems);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
