import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  searchQuery: string = '';

  onSearch(): void {
    // Implement search functionality here
    console.log('Search query:', this.searchQuery);
  }
}
