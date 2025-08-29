import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AgentsService } from './agents-service';

describe('AgentsService', () => {
  let service: AgentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AgentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
