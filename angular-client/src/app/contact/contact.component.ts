import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  submitted = false;

  email: any;

  userForm: any = new FormGroup({});

  constructor(private userService: AppService, private fb: FormBuilder) {}
}
