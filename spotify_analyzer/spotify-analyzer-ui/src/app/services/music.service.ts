// src/app/services/music.service.ts
// src/app/services/music.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private apiUrl = 'http://localhost:8000/user'; // Base API URL

  constructor(private http: HttpClient) {}

  getListeningHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listening_history/`, {
      withCredentials: true,
    });
  }

  getRecentlyPlayed(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recently_played/`, {
      withCredentials: true,
    });
  }

  getSavedAlbums(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/saved_albums/`, {
      withCredentials: true,
    });
  }

  getSavedTracks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/saved_tracks/`, {
      withCredentials: true,
    });
  }

  getTopArtists(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/top_artists/`, {
      withCredentials: true,
    });
  }

  getTopTracks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/top_tracks/`, {
      withCredentials: true,
    });
  }
}
