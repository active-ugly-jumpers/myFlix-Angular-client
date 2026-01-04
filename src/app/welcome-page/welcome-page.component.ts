import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    // Removed unused dialog components from imports
    MovieCardComponent,
  ],
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  isLoggedIn = false;
  username: string | null = null;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.updateLoginState();
  }

  /** Update login state */
  private updateLoginState(): void {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    this.isLoggedIn = !!token;
    this.username = user;
  }

  openUserRegistrationDialog(): void {
    const dialogRef = this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'registered') {
        setTimeout(() => {
          this.openUserLoginDialog();
        }, 100);
      }
    });
  }

  openUserLoginDialog(): void {
    const dialogRef = this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updateLoginState();
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.updateLoginState();
  }
}
