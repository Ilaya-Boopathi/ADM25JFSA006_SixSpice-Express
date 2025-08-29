import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { restaurantAuthGuardGuard } from './restaurant-auth-guard-guard';

describe('restaurantAuthGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => restaurantAuthGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
