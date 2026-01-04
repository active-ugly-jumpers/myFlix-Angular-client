import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: any = null;

  constructor(private route: ActivatedRoute, private fetchApiData: FetchApiDataService, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');
    if (id && token) {
      this.fetchApiData.getAllMovies(token).subscribe({
        next: (movies: any[]) => {
          this.movie = movies.find(m => m._id === id);
        },
        error: (err: any) => console.error('Error loading movie:', err),
      });
    }
  }

  goToMovies(): void {
    this.router.navigate(['/movies']);
  }

  goToDirector(name: string): void {
    if (name) {
      this.router.navigate(['/directors', name]);
    }
  }

  goToGenre(name: string): void {
    if (name) {
      this.router.navigate(['/genres', name]);
    }
  }
}
