import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  private router = inject(Router);
  private userService = inject(UserService);
  
  signupData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  
  showPassword = false;
  showConfirmPassword = false;
  submitted = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    console.log('onSubmit called');
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    // Validate form
    if (!this.validateForm()) {
      return;
    }
    
    this.isLoading = true;
    
    // Call the user service signup method
    this.userService.signup(this.signupData).subscribe({
      next: (response) => {
        this.isLoading = false;
        
        if (response.success) {
          console.log('Signup successful:', response.user);
          this.successMessage = 'Account created successfully! Redirecting to login...';
          
          // Navigate to login after successful signup
          setTimeout(() => {
            this.router.navigate(['/login']).then(() => {
              console.log('Navigation to login successful');
            }).catch((error) => {
              console.error('Navigation failed:', error);
            });
          }, 2000);
        } else {
          // Signup failed, show error message
          this.errorMessage = response.message || 'Signup failed. Please try again.';
          console.log('Signup failed:', response.message);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'An error occurred while creating your account. Please try again later.';
        console.error('Signup error:', error);
      }
    });
  }

  private validateForm(): boolean {
    // Check if all required fields are filled
    if (!this.signupData.firstName || !this.signupData.lastName || 
        !this.signupData.email || !this.signupData.password || !this.signupData.confirmPassword) {
      this.errorMessage = 'All fields are required.';
      return false;
    }

    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.signupData.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return false;
    }

    // Check password length
    if (this.signupData.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long.';
      return false;
    }

    // Check if passwords match
    if (this.signupData.password !== this.signupData.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return false;
    }

    return true;
  }
  navigateToLogin(){
    this.router.navigate(['/login']);
  }
}