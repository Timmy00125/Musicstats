import { Component, OnInit, viewChild } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { ChartModule } from 'primeng/chart';
import { UIChart } from 'primeng/chart';
import { Panel, PanelModule } from 'primeng/panel';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-top-tracks',
  imports: [ChartModule, PanelModule, NgIf],
  templateUrl: './top-tracks.component.html',
  styleUrl: './top-tracks.component.css',
})
export class TopTracksComponent implements OnInit {
  topTracks: any[] = [];
  loading: boolean = true;
  topTracksChartData: any;
  chartOptions: any;

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.loadTopTracks();
  }

  loadTopTracks(): void {
    this.loading = true;
    this.musicService.getTopTracks().subscribe({
      next: (data) => {
        this.topTracks = data;
        this.loading = false;
        this.prepareChartData();
      },
      error: (error) => {
        console.error('Error fetching top tracks:', error);
        this.loading = false;
        // Handle error
      },
    });
  }

  prepareChartData(): void {
    if (this.topTracks && this.topTracks.length > 0) {
      const labels = this.topTracks.map((track) => track.track_name);
      const popularityData = this.topTracks.map((track) => track.popularity); // Assuming 'popularity' is in the response

      this.topTracksChartData = {
        labels: labels,
        datasets: [
          {
            label: 'Popularity',
            backgroundColor: '#42A5F5',
            data: popularityData,
          },
        ],
      };

      this.chartOptions = {
        plugins: {
          legend: {
            labels: {
              color: '#495057',
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#495057',
            },
            grid: {
              color: '#ebedef',
            },
          },
          y: {
            ticks: {
              color: '#495057',
            },
            grid: {
              color: '#ebedef',
            },
          },
        },
      };
    }
  }
}
