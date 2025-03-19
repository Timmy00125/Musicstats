import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { DataViewModule } from 'primeng/dataview';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-saved-albums',
  imports: [DataViewModule, NgIf],
  templateUrl: './saved-albums.component.html',
  styleUrl: './saved-albums.component.css',
})
export class SavedAlbumsComponent implements OnInit {
  savedAlbums: any[] = [];
  loading: boolean = true;

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.loadSavedAlbums();
  }

  loadSavedAlbums(): void {
    this.loading = true;
    this.musicService.getSavedAlbums().subscribe({
      next: (data) => {
        this.savedAlbums = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching saved albums:', error);
        this.loading = false;
        // Handle error
      },
    });
  }
}
