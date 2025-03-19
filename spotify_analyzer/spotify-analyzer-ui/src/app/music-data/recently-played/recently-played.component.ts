import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { DatePipe } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-recently-played',
  imports: [PanelModule, DatePipe, DataViewModule, NgIf],
  templateUrl: './recently-played.component.html',
  styleUrl: './recently-played.component.css',
})
export class RecentlyPlayedComponent implements OnInit {
  recentlyPlayed: any[] = [];
  loading: boolean = true;

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.loadRecentlyPlayed();
  }

  loadRecentlyPlayed(): void {
    this.loading = true;
    this.musicService.getRecentlyPlayed().subscribe({
      next: (data) => {
        this.recentlyPlayed = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching recently played tracks:', error);
        this.loading = false;
        // Handle error
      },
    });
  }
}
