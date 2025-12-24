import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { LoginRequest } from '../../../shared/models/auth.model';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);

  protected readonly loginForm: FormGroup;
  protected readonly isLoading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  protected onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);

      const credentials: LoginRequest = this.loginForm.value;

      this.auth.login(credentials).subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigate([returnUrl]);
        },
        error: (error) => {
          this.isLoading.set(false);
          this.errorMessage.set(
            error.error?.message || 'Login failed. Please check your credentials.'
          );
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
