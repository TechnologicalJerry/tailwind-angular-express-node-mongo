import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  submitted = false;

  email: any;

  userForm: any = new FormGroup({});

  constructor(
    private contactService: ContactService,
    private fb: FormBuilder
  ) {}
}
