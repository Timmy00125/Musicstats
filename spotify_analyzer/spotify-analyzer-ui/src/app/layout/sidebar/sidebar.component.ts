import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  path: string;
  icon: string; // Tailwind icon class or component
  label: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  navItems: NavItem[] = [
    { path: '/home', icon: 'home', label: 'Home' },
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/auth', icon: 'auth', label: 'Auth' }, // Example icon names - replace with actual icons
    // Add more navigation items here
  ];
}
