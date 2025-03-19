import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-saved-tracks',
  imports: [TableModule],
  templateUrl: './saved-tracks.component.html',
  styleUrl: './saved-tracks.component.css',
})
export class SavedTracksComponent implements OnInit {
  savedTracks: any[] = [];
  loading: boolean = true;

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.loadSavedTracks();
  }

  loadSavedTracks(): void {
    this.loading = true;
    this.musicService.getSavedTracks().subscribe({
      next: (data) => {
        this.savedTracks = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching saved tracks:', error);
        this.loading = false;
        // Handle error
      },
    });
  }
}
