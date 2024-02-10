import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css'],
  providers: [MessageService]
})
export class VerifyOtpComponent {
  email!: string;
  otp!: number;
  loading: boolean = false;
  messages: { severity: string, summary: string, detail: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    // Retrieve email from query parameters
    this.route.queryParams.subscribe(params => {
      this.email = params['email']!;
      
      // Check if email is not present, redirect to signup
      if (!this.email) {
        this.router.navigate(['/signup']);
      }
    });
  }

  onSubmit() {
    this.loading = true;

    // Add OTP verification logic here
    this.authService.verifyOtp(this.email, this.otp).subscribe(
      (response: any) => {
        if (response && response.message === 'Email verification successful' && response.token) {
          // Store token in local storage
          localStorage.setItem('jwtToken', response.token);

          this.messages.push({ severity: 'success', summary: 'Success', detail: 'OTP verified successfully!' });
          this.router.navigate(['/home']);
        } else {
          this.messages.push({ severity: 'error', summary: 'Error', detail: 'Incorrect OTP. Please try again.' });
        }
        this.loading = false;
      },
      (error: any) => {
        if (error && error.error && error.error.message === 'Invalid OTP') {
          this.messages.push({ severity: 'error', summary: 'Error', detail: 'Incorrect OTP. Please try again.' });
        } else {
          this.messages.push({ severity: 'error', summary: 'Error', detail: 'Error during OTP verification. Please try again.' });
        }
        this.loading = false;
      }
    );
  }
}
