import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {AuthService} from '../auth/auth.service';
import {MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import {MatInput} from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    MatCardModule,
    MatCardHeader,
    MatCardContent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatIcon,
    MatProgressSpinner,
    MatButton,
    NgIf
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  isLoading = false;
  error = '';

  private auth = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  onSubmit() {
    if (this.form.invalid) return;

    this.isLoading = true;
    this.error = '';

    this.auth.login(
      this.form.value.email!,
      this.form.value.password!
    ).subscribe({
      next: () => {
        this.router.navigate(['/problems']);
        this.snackBar.open('Login successful', 'Close', { duration: 3000 });
      },
      error: (err) => {
        this.error = err.message || 'Invalid email or password';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
