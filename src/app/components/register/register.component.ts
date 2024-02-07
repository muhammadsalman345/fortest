// register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { users } from '../../interfaces/auth';
import { passwordMatchValidator } from '../../PasswordValidators/passwordMatchvalidatores';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent {
  messages: { severity: string, summary: string, detail: string }[] = [];
  loading: boolean = false;

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?:[a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, { validators: passwordMatchValidator });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  get username() {
    return this.registerForm.controls['username'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  submitDetails() {
    console.log('Submit button clicked');
    const postData = { ...this.registerForm.value };
    console.log('post data', postData);
    delete postData.confirmPassword;

    this.loading = true;

    this.authService.registerUser(postData as users).subscribe(
      (response: any) => {
        console.log('Request Data:', postData); 
        console.log('Response:', response);

        if (response && response.message === 'OTP sent successfully') {
          this.messages.push({ severity: 'success', summary: 'Success', detail: 'Registration successful! Check your email for OTP.' });
          this.registerForm.reset();
          this.router.navigate(['/otpverification']);
        } else {
          this.messages.push({ severity: 'error', summary: 'Error', detail: 'Unknown response from the server.' });
        }
      },
      (error: any) => {
        console.error('Error:', error);

        if (error.status === 409) {
          // HTTP status code 409 indicates a conflict, meaning the user is already registered
          this.messages.push({ severity: 'warn', summary: 'Warning', detail: 'User already registered. Please log in.' });
        } else if (error.error && error.error.message) {
          this.messages.push({ severity: 'error', summary: 'Error', detail: error.error.message });
        } else {
          this.messages.push({ severity: 'error', summary: 'Error', detail: 'Error during registration. Please try again.' });
        }
      },
      () => {
        console.log('Observable complete.');
        this.loading = false;
      }
    );
  }
}
