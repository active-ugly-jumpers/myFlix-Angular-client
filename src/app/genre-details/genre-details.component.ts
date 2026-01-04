import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-genre-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './genre-details.component.html',
  styleUrls: ['./genre-details.component.scss']
})
export class GenreDetailsComponent implements OnInit {
  genre: any = null;

  constructor(private route: ActivatedRoute, private fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    const token = localStorage.getItem('token');
    if (name && token) {
      this.fetchApiData.getGenre(name, token).subscribe({
        next: (genre: any) => {
          this.genre = genre;
        },
        error: (err: any) => console.error('Error loading genre:', err),
      });
    }
  }
}
