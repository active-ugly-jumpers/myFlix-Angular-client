import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * Component for displaying details of a specific movie in the myFlix Angular client.
 */
@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: any = null;
  favoriteMovies: string[] = [];
  username: string | null = null;

  /**
   * Creates an instance of MovieDetailsComponent.
   * @param route ActivatedRoute for accessing route parameters.
   * @param fetchApiData Service for fetching API data.
   * @param router Angular Router for navigation.
   */
  constructor(private route: ActivatedRoute, private fetchApiData: FetchApiDataService, private router: Router) {}

  /**
   * Angular lifecycle hook for component initialization. Fetches movie details and user's favorites.
   */
  ngOnInit(): void {
    // Get movie id from route, fetch movie details and user's favorites
    this.username = localStorage.getItem('username');
    const id = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');
    if (id && token) {
      this.fetchApiData.getAllMovies(token).subscribe({
        next: (movies: any[]) => {
          this.movie = movies.find(m => m._id === id);
        },
        error: (err: any) => console.error('Error loading movie:', err),
      });
      if (this.username) {
        this.fetchApiData.getUser(this.username, token).subscribe({
          next: (user: any) => {
            this.favoriteMovies = user.favoriteMovies || [];
          },
          error: (err: any) => console.error('Error loading favorites:', err),
        });
      }
    }
  }

  // Check if a movie is in user's favorites
  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  /**
   * Add or remove a movie from favorites, updating after backend confirms.
   */
  toggleFavorite(movieId: string): void {
    const token = localStorage.getItem('token');
    if (!token || !this.username) return;
    if (this.isFavorite(movieId)) {
      this.fetchApiData.deleteFavoriteMovie(this.username, movieId, token).subscribe({
        next: () => {
          this.loadFavorites();
        },
        error: (err: any) => console.error('Error removing favorite:', err),
      });
    } else {
      this.fetchApiData.addFavoriteMovie(this.username, movieId, token).subscribe({
        next: () => {
          this.loadFavorites();
        },
        error: (err: any) => console.error('Error adding favorite:', err),
      });
    }
  }

  loadFavorites(): void {
    const token = localStorage.getItem('token');
    if (!token || !this.username) return;
    this.fetchApiData.getUser(this.username, token).subscribe({
      next: (user: any) => {
        this.favoriteMovies = user.favoriteMovies || [];
      },
      error: (err: any) => console.error('Error loading favorites:', err),
    });
  }

  goToMovies(): void {
    this.router.navigate(['/movies']);
  }

  goToDirector(name: string): void {
    if (name && this.movie?._id) {
      this.router.navigate(['/directors', name], { queryParams: { movieId: this.movie._id } });
    }
  }

  goToGenre(name: string): void {
    if (name && this.movie?._id) {
      this.router.navigate(['/genres', name], { queryParams: { movieId: this.movie._id } });
    }
  }
}
