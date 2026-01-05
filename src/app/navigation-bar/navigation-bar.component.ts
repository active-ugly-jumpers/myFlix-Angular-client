import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

/**
 * Navigation bar component for the myFlix Angular client.
 * Provides navigation and logout functionality.
 */
@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  imports: [CommonModule, RouterModule, MatButtonModule],
})
export class NavigationBarComponent {
  /**
   * Creates an instance of NavigationBarComponent.
   * @param router Angular Router for navigation.
   */
  constructor(private router: Router) {}

  /**
   * Logs out the user by clearing local storage and navigating to the welcome page.
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }
}
