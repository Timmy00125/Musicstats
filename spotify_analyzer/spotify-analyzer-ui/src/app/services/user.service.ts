// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000'; // Base API URL

  constructor(private http: HttpClient) {}

  getUserProfile(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}/`);
  }

  syncUserData(): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/sync_data/`, {});
  }
}
