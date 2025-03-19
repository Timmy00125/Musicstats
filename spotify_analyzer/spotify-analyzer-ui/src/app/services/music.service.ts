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
    return this.http.get<any[]>(`${this.apiUrl}/listening_history/`);
  }

  getRecentlyPlayed(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recently_played/`);
  }

  getSavedAlbums(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/saved_albums/`);
  }

  getSavedTracks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/saved_tracks/`);
  }

  getTopArtists(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/top_artists/`);
  }

  getTopTracks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/top_tracks/`);
  }
}
