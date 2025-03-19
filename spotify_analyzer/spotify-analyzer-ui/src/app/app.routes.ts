import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SpotifyCallbackComponent } from './auth/spotify-callback/spotify-callback.component';
import { ListeningHistoryComponent } from './music-data/listening-history/listening-history.component';
import { RecentlyPlayedComponent } from './music-data/recently-played/recently-played.component';
import { SavedAlbumsComponent } from './music-data/saved-albums/saved-albums.component';
import { SavedTracksComponent } from './music-data/saved-tracks/saved-tracks.component';
import { TopArtistsComponent } from './music-data/top-artists/top-artists.component';
import { TopTracksComponent } from './music-data/top-tracks/top-tracks.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'spotify-callback', component: SpotifyCallbackComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'listening-history', component: ListeningHistoryComponent },
  { path: 'recently-played', component: RecentlyPlayedComponent },
  { path: 'saved-albums', component: SavedAlbumsComponent },
  { path: 'saved-tracks', component: SavedTracksComponent },
  { path: 'top-artists', component: TopArtistsComponent },
  { path: 'top-tracks', component: TopTracksComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login page
];
