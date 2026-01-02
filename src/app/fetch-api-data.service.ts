import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://arcane-movies-f00164225bec.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  constructor(private http: HttpClient) {}

  // User registration
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // User login
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Get all movies
  public getAllMovies(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.get(apiUrl + 'movies', { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Get one movie
  public getOneMovie(title: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.get(apiUrl + 'movies/' + title, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Get director
  public getDirector(name: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.get(apiUrl + 'directors/' + name, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Get genre
  public getGenre(name: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.get(apiUrl + 'genres/' + name, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Get user
  public getUser(username: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.get(apiUrl + 'users/' + username, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Get favorite movies for a user
  public getFavoriteMovies(username: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.get(apiUrl + 'users/' + username + '/movies', { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Add a movie to favorite movies
  public addFavoriteMovie(username: string, movieId: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieId, {}, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Edit user
  public editUser(username: string, userDetails: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.put(apiUrl + 'users/' + username, userDetails, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Delete user
  public deleteUser(username: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.delete(apiUrl + 'users/' + username, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a movie from the favorite movies
  public deleteFavoriteMovie(username: string, movieId: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieId, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}