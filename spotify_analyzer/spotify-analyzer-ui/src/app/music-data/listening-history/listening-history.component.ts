import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-listening-history',
  imports: [TableModule, DatePipe],
  templateUrl: './listening-history.component.html',
  styleUrl: './listening-history.component.css',
})
export class ListeningHistoryComponent implements OnInit {
  listeningHistory: any[] = [];
  loading: boolean = true;

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.loadListeningHistory();
  }

  loadListeningHistory(): void {
    this.loading = true;
    this.musicService.getListeningHistory().subscribe({
      next: (data) => {
        this.listeningHistory = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching listening history:', error);
        this.loading = false;
        // Handle error (e.g., display error message)
      },
    });
  }
}
