import { Component } from '@angular/core';
import { Auth } from '../../core/auth/auth';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup {
  form!: FormGroup;
  error = '';
  success = '';

  constructor(private fb: FormBuilder, private authService: Auth, private router: Router) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.fb.group({
      userName: ['technojerry', Validators.required],
      email: ['technojerry@domain.com', [Validators.required, Validators.email]],
      phoneNumber: ['9876543210', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['M.P, India', Validators.required],
      firstName: ['Techno', Validators.required],
      lastName: ['Jerry', Validators.required],
      password: ['Jerry@123', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['Jerry@123', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  get f() {
    return this.form.controls;
  }

  signup() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('Form submitted:', this.form.value);
    // return;

    this.authService.signup(this.form.value).subscribe({
      next: () => {
        this.success = 'Signup successful! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: err => this.error = err.error?.message || 'Signup failed',
    });
  }
}
