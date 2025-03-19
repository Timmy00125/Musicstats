import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-top-artists',
  imports: [DataViewModule, PanelModule, NgIf],
  templateUrl: './top-artists.component.html',
  styleUrl: './top-artists.component.css',
})
export class TopArtistsComponent implements OnInit {
  topArtists: any[] = [];
  loading: boolean = true;

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.loadTopArtists();
  }

  loadTopArtists(): void {
    this.loading = true;
    this.musicService.getTopArtists().subscribe({
      next: (data) => {
        this.topArtists = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching top artists:', error);
        this.loading = false;
        // Handle error
      },
    });
  }
}
