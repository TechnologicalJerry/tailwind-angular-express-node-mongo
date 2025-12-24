import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly contactForm: FormGroup;
  protected readonly isLoading = signal(false);
  protected readonly isSubmitted = signal(false);

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  protected onSubmit(): void {
    if (this.contactForm.valid) {
      this.isLoading.set(true);
      const formValue = this.contactForm.value;
      console.log('Contact form submitted:', formValue);
      // TODO: Implement actual contact form submission logic
      setTimeout(() => {
        this.isLoading.set(false);
        this.isSubmitted.set(true);
        this.contactForm.reset();
        setTimeout(() => {
          this.isSubmitted.set(false);
        }, 5000);
      }, 1000);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  protected getFormControl(name: string) {
    return this.contactForm.get(name);
  }
}
