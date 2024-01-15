import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactService } from './contact.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
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

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      _id: '',
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
          ),
        ],
      ],
      mobileNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/
          ),
          // Validators.maxLength(13),
        ],
      ],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(\d{1,}) [a-zA-Z0-9\s]+(\,)? [a-zA-Z]+(\,)? [A-Z]{2} [0-9]{5,6}$/
          ),
        ],
      ],
    });
  }

  get myForm() {
    return this.userForm.controls;
  }

  protected get registerFormControl() {
    return this.userForm.controls;
  }

  onSubmit(): void {
    // if (this.userForm.value.address) {
    //   const enteredAddress = this.userForm.value.address;
    //   const validAddress = this.patternAddress(enteredAddress);

    //   if (validAddress.match) {
    //     console.log('Parsed Address:', validAddress);
    //   } else {
    //     console.error('Invalid Address');
    //   }
    //   this.userForm.value.address = validAddress;
    // }
    console.log('USER Info into component::BEFORE', this.userForm.value);
    if (this.userForm.get('email').valid) {
      console.log('USER Info into component::AFTER', this.userForm.value);
      let user = this.userForm.value;
      console.log('USER Info into component::', user);

      this.userService.addUser(user).subscribe(
        (response: any) => {
          console.log('User added successfully:', response.data);
          if (response.status === 200) {
            this.initializeForm();
            this.userForm.value = this.userForm.reset(response.data);
          }
        },
        (error) => {
          console.error('Error adding user:', error);
        }
      );
    } else {
      console.warn('there are some error while adding Users Values');
    }
  }

}
