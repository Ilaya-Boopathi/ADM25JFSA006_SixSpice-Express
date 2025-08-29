import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './auth';

export const restaurantAuthGuardGuard: CanActivateFn = (route, state) => {
  const authService=inject(Auth);
  const router=inject(Router);
  if(authService.isRestaurantLoggedIn()){
    return true;
  }

  if(authService.isUserLoggedIn()){
    router.navigate(['/menu-management/menu']);
    return false;
  }

  router.navigate(['/login-page']);
  return false;
};
