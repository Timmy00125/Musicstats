import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'spotify-analyzer-ui';
}
