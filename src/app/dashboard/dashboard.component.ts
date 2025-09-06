import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { PatientRegistrationComponent } from '../patient-registration/patient-registration.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private router: Router) {
    console.log('Dashboard component initialized');
  }

  logout() {
    // Clear any stored authentication data
    localStorage.removeItem('isLoggedIn');
    // Navigate back to login
    this.router.navigate(['/login']);
  }
}
