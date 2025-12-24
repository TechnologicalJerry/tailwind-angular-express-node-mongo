import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Unauthorized - clear auth data and redirect to login
        if (isBrowser) {
          localStorage.removeItem('authToken');
          // Use setTimeout to avoid navigation during interceptor execution
          setTimeout(() => {
            router.navigate(['/login']);
          }, 0);
        }
      }

      // You can add more error handling logic here
      // For example, show toast notifications for specific error types
      return throwError(() => error);
    })
  );
};
