import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId);

  if (isBrowser) {
    const token = localStorage.getItem('authToken');
    if (token && auth.isAuthenticatedValue()) {
      return true;
    }
  }

  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
