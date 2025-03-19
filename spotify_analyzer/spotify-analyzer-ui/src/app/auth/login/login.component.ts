import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  loginWithSpotify(): void {
    this.authService.login().subscribe({
      next: (response: any) => {
        // Assuming the backend returns the Spotify authorization URL
        window.location.href = response.authorization_url;
      },
      error: (error) => {
        console.error('Login error:', error);
        // Handle login error (e.g., display error message)
      },
    });
  }
}
