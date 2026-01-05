import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * Component for displaying movie cards in the myFlix Angular client.
 */
@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  favoriteMovies: string[] = [];
  username: string | null = null;
  selectedMovie: any = null;

  /**
   * Creates an instance of MovieCardComponent.
   * @param fetchApiData Service for fetching API data.
   * @param router Angular Router for navigation.
   */
  constructor(private fetchApiData: FetchApiDataService, private router: Router) {}

  /**
   * Angular lifecycle hook for component initialization. Loads movies and favorites.
   */
  ngOnInit(): void {
    // Get username from local storage for API calls
    this.username = localStorage.getItem('username');
    this.loadMovies();
    this.loadFavorites();
  }

  loadMovies(): void {
    // Fetch all movies from API
    const token = localStorage.getItem('token');
    if (!token) return;
    this.fetchApiData.getAllMovies(token).subscribe({
      next: (movies: any[]) => (this.movies = movies),
      error: (err: any) => console.error('Error loading movies:', err),
    });
  }

  loadFavorites(): void {
    // Fetch user's favorite movies from API
    const token = localStorage.getItem('token');
    if (!token || !this.username) return;
    this.fetchApiData.getUser(this.username, token).subscribe({
      next: (user: any) => {
        this.favoriteMovies = user.favoriteMovies || [];
      },
      error: (err: any) => console.error('Error loading favorites:', err),
    });
  }

  // Check if a movie is in user's favorites
  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  /**
   * Add or remove a movie from favorites.
   * Only updates after backend confirms.
   */
  toggleFavorite(movieId: string): void {
    const token = localStorage.getItem('token');
    if (!token || !this.username) return;
    if (this.isFavorite(movieId)) {
      this.fetchApiData.deleteFavoriteMovie(this.username, movieId, token).subscribe({
        next: () => {
          this.loadFavorites(); // Only update after backend confirms
        },
        error: (err: any) => console.error('Error removing favorite:', err),
      });
    } else {
      this.fetchApiData.addFavoriteMovie(this.username, movieId, token).subscribe({
        next: () => {
          this.loadFavorites(); // Only update after backend confirms
        },
        error: (err: any) => console.error('Error adding favorite:', err),
      });
    }
  }

  openMovieDetails(movie: any): void {
    this.router.navigate(['/movies', movie._id]);
  }

  closeMovieDetails(): void {
    this.selectedMovie = null;
  }
}