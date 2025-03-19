import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { OnInit } from '@angular/core';
import { ListeningHistoryComponent } from './music-data/listening-history/listening-history.component';
import { LoginComponent } from './auth/login/login.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { RecentlyPlayedComponent } from './music-data/recently-played/recently-played.component';
import { TopArtistsComponent } from './music-data/top-artists/top-artists.component';
import { TopTracksComponent } from './music-data/top-tracks/top-tracks.component';
import { SavedAlbumsComponent } from './music-data/saved-albums/saved-albums.component';
import { SavedTracksComponent } from './music-data/saved-tracks/saved-tracks.component';

@Component({
  selector: 'app-root',
  imports: [
    ListeningHistoryComponent,
    LoginComponent,
    UserProfileComponent,
    RecentlyPlayedComponent,
    TopArtistsComponent,
    TopTracksComponent,
    SavedAlbumsComponent,
    SavedTracksComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'spotify-analyzer-ui';
  constructor(private primengConfig: PrimeNG) {}

  ngOnInit() {
    this.primengConfig.ripple.set(true); // Enable ripple effect globally for PrimeNG
  }
}
