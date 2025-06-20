import { Routes } from '@angular/router';
import { Guard } from './core/auth/guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/landing/landing').then(m => m.Landing)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.Login)
    },
    {
        path: 'signup',
        loadComponent: () => import('./pages/signup/signup').then(m => m.Signup)
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('./pages/forgot-password/forgot-password').then(m => m.ForgotPassword)
    },
    {
        path: 'dashboard', canActivate: [Guard],
        loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
    },
    {
        path: 'products', canActivate: [Guard],
        loadComponent: () => import('./pages/products/products').then(m => m.Products)
    },
    {
        path: '**', redirectTo: ''
    }
];
