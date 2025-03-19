import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-user-profile',
  imports: [NgIf, PanelModule, ButtonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  userProfile: any;
  userId = 'me'; // Assuming 'me' is a valid identifier for the current user

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getUserProfile(this.userId).subscribe({
      next: (data) => {
        this.userProfile = data;
      },
      error: (error) => {
        console.error('Error fetching user profile:', error);
        // Handle error (e.g., display error message)
      },
    });
  }

  syncData(): void {
    this.userService.syncUserData().subscribe({
      next: (response) => {
        console.log('Data synchronization initiated:', response);
        // Optionally provide feedback to the user
        alert('Data synchronization initiated!');
        this.loadUserProfile(); // Refresh user profile after sync
      },
      error: (error) => {
        console.error('Error synchronizing data:', error);
        // Handle error (e.g., display error message)
        alert('Data synchronization failed.');
      },
    });
  }
}
