import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() type: 'primary' | 'secondary' = 'primary'; // Example types

  get buttonClasses(): string {
    let classes =
      'px-4 py-2 rounded-full focus:outline-none transition-colors duration-200 ';
    if (this.type === 'primary') {
      classes += 'bg-spotify-green text-spotify-dark-gray hover:bg-green-600';
    } else if (this.type === 'secondary') {
      classes +=
        'bg-spotify-dark-gray text-spotify-white hover:bg-gray-700 border border-spotify-gray';
    }
    return classes;
  }
}
