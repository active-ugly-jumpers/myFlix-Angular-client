import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

/**
 * Component for displaying genre details in the myFlix Angular client.
 */
@Component({
  selector: 'app-genre-details',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './genre-details.component.html',
  styleUrls: ['./genre-details.component.scss']
})
export class GenreDetailsComponent implements OnInit {
  genre: any = null;
  movieId: string | null = null;

  /**
   * Creates an instance of GenreDetailsComponent.
   * @param route ActivatedRoute for accessing route parameters.
   * @param fetchApiData Service for fetching API data.
   * @param router Angular Router for navigation.
   */
  constructor(private route: ActivatedRoute, private fetchApiData: FetchApiDataService, private router: Router) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    const token = localStorage.getItem('token');
    this.movieId = this.route.snapshot.queryParamMap.get('movieId');
    if (name && token) {
      this.fetchApiData.getGenre(name, token).subscribe({
        next: (genre: any) => {
          this.genre = genre;
        },
        error: (err: any) => console.error('Error loading genre:', err),
      });
    }
  }

  /**
   * Navigates back to the movie details or movies list.
   */
  returnToMovie(): void {
    if (this.movieId) {
      this.router.navigate(['/movies', this.movieId]);
    } else {
      this.router.navigate(['/movies']);
    }
  }
}
