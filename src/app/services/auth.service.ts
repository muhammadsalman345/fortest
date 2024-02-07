import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { users } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://adorable-waders-crab.cyclic.app/api'; // this is online applicatin user
  // private baseUrl = 'http://localhost:3000/api'; 
  constructor(private http: HttpClient) {}

  registerUser(userDetails: users): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    // Use the specific endpoint for registration
    const signupEndpoint = `${this.baseUrl}/signup`;

    return this.http.post(signupEndpoint, userDetails, httpOptions);
  }

  
}
