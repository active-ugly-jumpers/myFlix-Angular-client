import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { DirectorDetailsComponent } from './director-details/director-details.component';
import { GenreDetailsComponent } from './genre-details/genre-details.component';

export const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: 'directors/:name', component: DirectorDetailsComponent },
  { path: 'genres/:name', component: GenreDetailsComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];
