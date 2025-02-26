import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private backendUrl = 'http://localhost:8000/auth'; // Django backend auth endpoint

  constructor(private http: HttpClient) {}

  login(): Observable<any> {
    return this.http.post(`${this.backendUrl}/login/`, {}); // Trigger Django Spotify login
  }

  // ... other auth related methods (logout, check auth status, etc.) ...
}
