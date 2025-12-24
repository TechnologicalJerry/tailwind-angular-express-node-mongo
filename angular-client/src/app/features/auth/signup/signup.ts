import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { RegisterRequest } from '../../../shared/models/auth.model';

function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  };
}

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink, TitleCasePipe],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Signup {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  protected readonly signupForm: FormGroup;
  protected readonly isLoading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly genders = ['male', 'female', 'other'];

  constructor() {
    this.signupForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        userName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
        gender: ['', [Validators.required]],
        dob: ['', [Validators.required]],
      },
      { validators: passwordMatchValidator() }
    );
  }

  protected onSubmit(): void {
    if (this.signupForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);

      const formValue = this.signupForm.value;
      // Remove confirmPassword before submitting
      const { confirmPassword, ...signupData } = formValue;
      
      // Convert date from YYYY-MM-DD to DD-MM-YYYY format for backend
      if (signupData.dob) {
        const [year, month, day] = signupData.dob.split('-');
        signupData.dob = `${day}-${month}-${year}`;
      }
      
      const registerData: RegisterRequest = signupData;

      this.auth.register(registerData).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.isLoading.set(false);
          this.errorMessage.set(
            error.error?.message || 'Registration failed. Please try again.'
          );
        },
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  protected getFormControl(name: string) {
    return this.signupForm.get(name);
  }

  protected hasPasswordMismatch(): boolean {
    return (
      this.signupForm.hasError('passwordMismatch') &&
      this.signupForm.get('confirmPassword')?.touched === true
    );
  }

  protected getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}
