import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-director-details',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './director-details.component.html',
  styleUrls: ['./director-details.component.scss']
})
export class DirectorDetailsComponent implements OnInit {
  director: any = null;

  movieId: string | null = null;

  constructor(private route: ActivatedRoute, private fetchApiData: FetchApiDataService, private router: Router) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    const token = localStorage.getItem('token');
    this.movieId = this.route.snapshot.queryParamMap.get('movieId');
    if (name && token) {
      this.fetchApiData.getDirector(name, token).subscribe({
        next: (director: any) => {
          this.director = director;
        },
        error: (err: any) => console.error('Error loading director:', err),
      });
    }
  }

  returnToMovie(): void {
    if (this.movieId) {
      this.router.navigate(['/movies', this.movieId]);
    } else {
      this.router.navigate(['/movies']);
    }
  }
}
