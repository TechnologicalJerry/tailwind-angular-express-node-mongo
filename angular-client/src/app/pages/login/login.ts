import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../core/auth/auth';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  form!: FormGroup;
  error = '';

  constructor(private fb: FormBuilder, private authService: Auth, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.fb.group({
      userId: ['technojerry', [Validators.required]],
      // userId: ['technojerry@domain.com', [Validators.required]],
      password: ['Jerry@123', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.form.controls;
  }

  login() {
    if (this.form.invalid) return;

    const { userId, password } = this.form.value;

    this.authService.login(userId, password).subscribe({
      next: (res) => {
        console.log('✅ Login successful');
        console.log('📦 Response data:', res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('❌ Login error');
        console.error('📦 Error object:', err);
        this.error = err.error?.message || 'Login failed';
      },
      complete: () => console.log('🔚 Login request completed')
    });
  }



}
