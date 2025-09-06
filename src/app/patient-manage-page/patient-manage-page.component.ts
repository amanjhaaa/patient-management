import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-patient-manage-page',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './patient-manage-page.component.html',
  styleUrl: './patient-manage-page.component.css'
})
export class PatientManagePageComponent {
  private router = inject(Router);
  query = '';

  onSearch() {
    const queryValue = this.query.trim();
    this.router.navigate(['/patient'], { 
      queryParams: { search: queryValue }
    });
    console.log('Searching for:', queryValue);
  }
  
}