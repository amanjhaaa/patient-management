import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private router = inject(Router);
  private userService = inject(UserService);
  
  loginData = {
    email: '',
    password: ''
  };
  
  rememberMe = false;
  showPassword = false;
  submitted = false;
  isLoading = false;
  errorMessage = '';

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  onSubmit() {
    console.log('onSubmit called');
    this.submitted = true;
    this.errorMessage = '';
    
    if (this.loginData.email && this.loginData.password) {
      console.log('Form validation passed');
      this.isLoading = true;
      
      // Call the user service login method
      this.userService.login(this.loginData.email, this.loginData.password).subscribe({
        next: (response) => {
          this.isLoading = false;
          
          if (response.success) {
            console.log('Login successful:', response.user);
            
            // Navigate to dashboard after successful login
            this.router.navigate(['/dashboard']).then(() => {
              console.log('Navigation successful');
            }).catch((error) => {
              console.error('Navigation failed:', error);
            });
          } else {
            // Login failed, show error message
            this.errorMessage = response.message || 'Login failed. Please try again.';
            console.log('Login failed:', response.message);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'An error occurred while logging in. Please try again later.';
          console.error('Login error:', error);
        }
      });
    } else {
      console.log('Form validation failed');
    }
  }
}
