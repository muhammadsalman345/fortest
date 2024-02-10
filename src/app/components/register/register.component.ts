
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
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;

    this.loading = true;

    this.authService.registerUser(postData as users).subscribe(
      (response: any) => {
        if (response && response.message === 'OTP sent successfully') {
          this.messages.push({ severity: 'success', summary: 'Success', detail: 'Registration successful! Check your email for OTP.' });
          
          // Redirect to OTP verification page with email as query parameter
          this.router.navigate(['/verify-otp'], { queryParams: { email: this.email.value } });
          console.log('Navigating to /verify-otp...');
          
          this.registerForm.reset();
          this.loading = false;
        } else {
          this.messages.push({ severity: 'error', summary: 'Error', detail: 'Unknown response from the server.' });
          this.loading = false;
        }
      },
      (error: any) => {
        if (error.status === 409) {
          this.messages.push({ severity: 'warn', summary: 'Warning', detail: 'User already registered. Please log in.' });
          this.loading = false;
        } else if (error.error && error.error.message) {
          this.messages.push({ severity: 'error', summary: 'Error', detail: error.error.message });
          this.loading = false;
        } else {
          this.messages.push({ severity: 'error', summary: 'Error', detail: 'Error during registration. Please try again.' });
          this.loading = false;
        }
      },
      () => {
         // Set loading to false in the complete callback
      }
    );
  }
}
