import { Component } from '@angular/core';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavigationBarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}