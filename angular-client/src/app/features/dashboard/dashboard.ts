import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private subscription?: Subscription;
  
  protected readonly navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/dashboard/products', label: 'Products List', icon: '📦' },
    { path: '/dashboard/users', label: 'User List', icon: '👥' },
    { path: '/dashboard/profile', label: 'Profile', icon: '👤' },
  ];

  protected readonly isDashboardHome = signal(this.router.url === '/dashboard');

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
}
