
import { Component } from '@angular/core';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * The root component of the myFlix Angular client application.
 * Handles application-level logic and layout.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavigationBarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  /**
   * Checks if the user is logged in by verifying the presence of a token in localStorage.
   * @returns True if the user is logged in, false otherwise.
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}