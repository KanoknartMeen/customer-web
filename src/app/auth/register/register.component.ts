import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
      role: new FormControl('USER', [Validators.required])
    });
  }

  register() {
    if (this.registerForm.valid) {
      const { username, password, confirmPassword, role } = this.registerForm.value;
      if (password !== confirmPassword) {
        this.errorMessage = 'Passwords do not match!';
        return;
      }

      this.authService.register({ username, password, role}).subscribe({
        next: () => {
          this.successMessage = 'Registration successful! Redirecting to login...';
          setTimeout(() => this.router.navigate(['/login']), 1000);
        },
        error: () => {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      });
    }
  }
}
