import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../model/user-profile.model';
import { TopArtist } from '../model/top-artist.model';
import { TopTrack } from '../model/top-track.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private backendApiUrl = 'http://localhost:8000/user'; // Django backend user API endpoint

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.backendApiUrl}/profile/`);
  }

  getTopArtists(): Observable<TopArtist[]> {
    return this.http.get<TopArtist[]>(`${this.backendApiUrl}/top-artists/`);
  }

  getTopTracks(): Observable<TopTrack[]> {
    return this.http.get<TopTrack[]>(`${this.backendApiUrl}/top-tracks/`);
  }

  syncData(): Observable<any> {
    return this.http.post(`${this.backendApiUrl}/sync-data/`, {});
  }

  // ... methods for other data endpoints (listening history, recently played, etc.) ...
}
