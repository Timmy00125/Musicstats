// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

function getCookie(name: string): string | null {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : null;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000/user'; // Base API URL

  constructor(private http: HttpClient) {}

  getUserProfile(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}/`, {
      withCredentials: true,
    });
  }

  syncUserData(): Observable<any> {
    const csrfToken = getCookie('csrftoken');
    return this.http.post(
      `${this.apiUrl}/sync_data/`,
      {},
      {
        withCredentials: true,
        headers: { 'X-CSRFToken': csrfToken || '' },
      }
    );
  }
}
