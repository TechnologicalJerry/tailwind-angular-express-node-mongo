import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, Header, Footer],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly auth = inject(Auth);
  private subscription?: Subscription;
  
  protected readonly navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/dashboard/products', label: 'Products List', icon: '📦' },
    { path: '/dashboard/users', label: 'User List', icon: '👥' },
    { path: '/dashboard/profile', label: 'Profile', icon: '👤' },
  ];

  protected readonly isDashboardHome = signal(this.router.url === '/dashboard');
  protected readonly currentUser = this.auth.currentUser;

  ngOnInit(): void {
    this.subscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isDashboardHome.set(this.router.url === '/dashboard');
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  protected logout(): void {
    this.auth.logout().subscribe();
  }
}
