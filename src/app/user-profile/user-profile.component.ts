import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * Component for displaying and managing the user's profile in the myFlix Angular client.
 */
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userData: any = {};
  favoriteMovies: any[] = [];
  allMovies: any[] = [];

  /**
   * Creates an instance of UserProfileComponent.
   * @param fetchApiData Service for API calls.
   * @param router Angular Router for navigation.
   */
  constructor(
    private fetchApiData: FetchApiDataService,
    private router: Router
  ) {}

  /**
   * Angular lifecycle hook for component initialization. Loads user data and favorites.
   */
  ngOnInit(): void {
    // Load user data and favorites on component init
    this.loadUser();
  }

  /**
   * Load user profile from API and then fetch all movies for favorite matching.
   */
  loadUser(): void {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (!token || !username) return;
    this.fetchApiData.getUser(username, token).subscribe({
      next: (user) => {
          this.userData = user;
          if (user.birthday) {
            this.userData.birthday = user.birthday.slice(0, 10);
          }
          this.loadAllMovies();
      },
      error: (err) => console.error(err),
    });
  }

  // Load all movies to match user's favorites
  loadAllMovies(): void {
    const token = localStorage.getItem('token');
    if (!token) return;
    this.fetchApiData.getAllMovies(token).subscribe({
      next: (movies: any[]) => {
        this.allMovies = movies;
        if (!this.userData.favoriteMovies) {
          this.favoriteMovies = [];
          return;
        }
        this.favoriteMovies = this.allMovies.filter((m) =>
          this.userData.favoriteMovies.includes(m._id)
        );
      },
      error: (err) => console.error(err),
    });
  }

  removeFavorite(movieId: string): void {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (!token || !username) return;
    this.fetchApiData.deleteFavoriteMovie(username, movieId, token).subscribe({
      next: () => {
        this.userData.favoriteMovies = this.userData.favoriteMovies.filter(
          (id: string) => id !== movieId
        );
        this.favoriteMovies = this.favoriteMovies.filter(
          (movie) => movie._id !== movieId
        );
      },
      error: (err) => console.error(err),
    });
  }

  isFavorite(movieId: string): boolean {
    return this.userData.favoriteMovies?.includes(movieId);
  }

  toggleFavorite(movieId: string): void {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (!token || !username) return;
    if (!this.userData.favoriteMovies) {
      this.userData.favoriteMovies = [];
    }
    if (this.isFavorite(movieId)) {
      this.fetchApiData.deleteFavoriteMovie(username, movieId, token).subscribe({
        next: () => {
          this.userData.favoriteMovies = this.userData.favoriteMovies.filter(
            (id: string) => id !== movieId
          );
        },
        error: (err) => console.error(err),
      });
    } else {
      this.fetchApiData.addFavoriteMovie(username, movieId, token).subscribe({
        next: () => {
          this.userData.favoriteMovies.push(movieId);
        },
        error: (err) => console.error(err),
      });
    }
  }

  removeFromFavorites(movieId: string): void {
    this.removeFavorite(movieId);
  }

  updateUser(): void {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (!token || !username) return;
    this.fetchApiData.editUser(username, this.userData, token).subscribe({
      next: (result) => {
        alert('Profile updated!');
        localStorage.setItem('username', result.username);
      },
      error: (err) => console.error(err),
    });
  }

  deleteUser(): void {
    if (!confirm('Are you sure?')) return;
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (!token || !username) return;
    this.fetchApiData.deleteUser(username, token).subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigate(['/welcome']);
      },
      error: (err) => console.error(err),
    });
  }
}
