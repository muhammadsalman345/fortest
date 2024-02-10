
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { users } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private baseUrl = 'http://localhost:3000/api';
  private baseUrl = 'https://plain-suit-moth.cyclic.app/';

  constructor(private http: HttpClient) {}

  registerUser(userDetails: users): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    const signupEndpoint = `${this.baseUrl}/signup`;

    return this.http.post(signupEndpoint, userDetails, httpOptions);
  }

  // ... other methods

  // Add the method for OTP verification if not already present
  verifyOtp(email: string, otp: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    const verifyOtpEndpoint = `${this.baseUrl}/verify-otp`; // Adjust the endpoint accordingly

    return this.http.post(verifyOtpEndpoint, { email, otp }, httpOptions);
  }
}
