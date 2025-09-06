import { NgFor, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../services/patient.service';
import { Patient } from '../interfaces/patient.model';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [NgFor, RouterLink, CommonModule, FormsModule],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent implements OnInit {

  patient: Patient | null = null;
  searchQuery = '';
  
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check for route parameter first (e.g., /patient/1)
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadPatient(id);
        return;
      }
    });

    // Check for query parameters (e.g., /patient?search=123)
    this.route.queryParamMap.subscribe(queryParams => {
      const searchTerm = queryParams.get('search');
      if (searchTerm) {
        this.searchQuery = searchTerm;
        this.searchPatient(searchTerm);
      }
    });
  }
  
  loadPatient(id: string): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.patientService.getPatientById(id).subscribe({
      next: (data) => {
        this.patient = data;
        this.isLoading = false;
        console.log('Patient data:', data);
      },
      error: (err) => {
        console.error('Error fetching patient', err);
        this.errorMessage = 'Patient not found or error occurred';
        this.isLoading = false;
        this.patient = null;
      }
    });
  }

  searchPatient(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.patient = null;
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    
    // Try to search by ID first
    this.patientService.getPatientById(searchTerm.trim()).subscribe({
      next: (data) => {
        this.patient = data;
        this.isLoading = false;
        console.log('Patient found by ID:', data);
      },
      error: (err) => {
        console.error('Error fetching patient by ID, trying other methods', err);
        // If ID search fails, you could implement other search methods here
        // For now, we'll show an error
        this.errorMessage = 'Patient not found with the given search term';
        this.isLoading = false;
        this.patient = null;
      }
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/patient'], { 
        queryParams: { search: this.searchQuery.trim() }
      });
    }
  }

  onRowClick(patientId: string | undefined): void {
    console.log('Row clicked, patientId:', patientId);
    console.log('Patient object:', this.patient);
    if (patientId) {
      console.log('Navigating to epro with patientId:', patientId);
      this.router.navigate(['/epro'], { queryParams: { patientId: patientId } });
    } else {
      console.log('PatientId is null or undefined, cannot navigate');
    }
  }

  onRegister(){
    // Navigate to patient registration page
    this.router.navigate(['/patient-registration']);
  }
}