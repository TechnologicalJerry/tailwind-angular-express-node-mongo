import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, tap, catchError, of, map } from 'rxjs';
import { Api } from './api';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../../shared/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly api = inject(Api);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly currentUserSignal = signal<User | null>(null);
  private readonly isAuthenticatedSignal = signal<boolean>(false);

  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = this.isAuthenticatedSignal.asReadonly();

  constructor() {
    // Check if user is logged in on service initialization (only in browser)
    if (this.isBrowser) {
      const token = this.getToken();
      if (token) {
        // Subscribe to checkAuth to restore authentication state
        this.checkAuth().subscribe();
      }
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.api.post<AuthResponse>('/api/auth/login', credentials).pipe(
      tap((response) => {
        this.setAuthData(response.token, response.user);
      })
    );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    // Convert dob from DD-MM-YYYY to YYYY-MM-DD format
    const registerData = {
      ...userData,
      dob: this.convertDateFormat(userData.dob),
    };
    return this.api.post<AuthResponse>('/api/auth/register', registerData).pipe(
      tap((response) => {
        this.setAuthData(response.token, response.user);
      })
    );
  }

  logout(): Observable<void> {
    return this.api.post<void>('/api/auth/logout', {}).pipe(
      tap(() => {
        this.clearAuthData();
        this.router.navigate(['/']);
      })
    );
  }

  getCurrentUser(): Observable<User> {
    return this.api.get<User>('/api/auth/me').pipe(
      tap((user) => {
        this.currentUserSignal.set(user);
        this.isAuthenticatedSignal.set(true);
      })
    );
  }

  checkAuth(): Observable<boolean> {
    if (!this.isBrowser) {
      return of(false);
    }

    const token = this.getToken();
    if (token) {
      return this.getCurrentUser().pipe(
        tap({
          next: () => {
            // User is authenticated, signals are already updated in getCurrentUser
          },
          error: () => {
            this.clearAuthData();
          },
        }),
        map(() => true),
        catchError(() => {
          this.clearAuthData();
          return of(false);
        })
      );
    } else {
      this.clearAuthData();
      return of(false);
    }
  }

  isAuthenticatedValue(): boolean {
    return this.isAuthenticatedSignal();
  }

  private getToken(): string | null {
    if (!this.isBrowser) {
      return null;
    }
    return localStorage.getItem('authToken');
  }

  private setAuthData(token: string, user: User): void {
    if (this.isBrowser) {
      localStorage.setItem('authToken', token);
    }
    this.currentUserSignal.set(user);
    this.isAuthenticatedSignal.set(true);
  }

  private clearAuthData(): void {
    if (this.isBrowser) {
      localStorage.removeItem('authToken');
    }
    this.currentUserSignal.set(null);
    this.isAuthenticatedSignal.set(false);
  }

  private convertDateFormat(dateStr: string): string {
    // Convert from DD-MM-YYYY to YYYY-MM-DD
    const [day, month, year] = dateStr.split('-');
    return `${year}-${month}-${day}`;
  }
}
