import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-director-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './director-details.component.html',
  styleUrls: ['./director-details.component.scss']
})
export class DirectorDetailsComponent implements OnInit {
  director: any = null;

  constructor(private route: ActivatedRoute, private fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    const token = localStorage.getItem('token');
    if (name && token) {
      this.fetchApiData.getDirector(name, token).subscribe({
        next: (director: any) => {
          this.director = director;
        },
        error: (err: any) => console.error('Error loading director:', err),
      });
    }
  }
}
