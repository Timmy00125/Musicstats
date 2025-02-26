import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout/layout.component'; // You'll create this next

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, // Use LayoutComponent as shell
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.routes').then(
            (m) => m.DASHBOARD_ROUTES
          ), // Lazy load dashboard module
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.routes').then((m) => m.AUTH_ROUTES), // Lazy load auth module
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '' }, // Redirect any unknown routes to home
];
