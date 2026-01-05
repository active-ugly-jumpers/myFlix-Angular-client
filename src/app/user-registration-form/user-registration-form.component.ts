import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

/**
 * Component for the user registration form in the myFlix Angular client.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
  ],
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * User registration data bound to form inputs.
   */
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  /**
   * Creates an instance of UserRegistrationFormComponent.
   * @param fetchApiData Service for API calls.
   * @param dialogRef Reference to the dialog containing this component.
   * @param snackBar Material snackbar for notifications.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  /**
   * Angular lifecycle hook for component initialization.
   */
  ngOnInit(): void {
  }

  /**
   * Sends the registration form inputs to the backend API.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}