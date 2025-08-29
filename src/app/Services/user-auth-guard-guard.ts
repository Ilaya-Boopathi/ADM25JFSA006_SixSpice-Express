import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './auth';
import { inject } from '@angular/core';

export const userAuthGuardGuard: CanActivateFn = (route, state) => {
  const authService=inject(Auth);
  const router=inject(Router);
  if(authService.isUserLoggedIn()){
    return true;
  }

  if(authService.isRestaurantLoggedIn()){
    router.navigate(['/dashboard-layout']);
    return false;
  }

  router.navigate(['/login-page']);
  return false;
};
