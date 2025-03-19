// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/auth'; // Base API URL

  constructor(private http: HttpClient) {}

  login(): Observable<any> {
    return this.http.get(`${this.apiUrl}/login/`);
  }

  spotifyCallback(): Observable<any> {
    return this.http.get(`${this.apiUrl}/spotify/callback/`);
  }
}
