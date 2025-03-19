import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spotify-callback',
  imports: [],
  templateUrl: './spotify-callback.component.html',
  styleUrl: './spotify-callback.component.css',
})
export class SpotifyCallbackComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.spotifyCallback().subscribe({
      next: (response) => {
        // Assuming successful callback, store tokens or user info if needed
        console.log('Spotify callback successful', response);
        // Redirect to profile page or dashboard after successful authentication
        this.router.navigate(['/profile']); // Redirect to profile page after successful auth
      },
      error: (error) => {
        console.error('Spotify callback error:', error);
        // Handle callback error (e.g., display error message and redirect to login)
        this.router.navigate(['/login']); // Redirect to login on error
      },
    });
  }
}
