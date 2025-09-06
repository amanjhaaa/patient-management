import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PatientService } from '../services/patient.service';
import { Patient } from '../interfaces/patient.model';

@Component({
  selector: 'app-patient-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-registration.component.html',
  styleUrl: './patient-registration.component.css'
})
export class PatientRegistrationComponent {
  patientForm: FormGroup;
  salutationList = ["Mr.", "Mrs.","Ms.","Dr.","Prof.","Hon.","Capt.","Col.","Lt.","Sir","Madam"];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private patientService: PatientService
  ) {
    this.patientForm = this.fb.group({
      salutation: [''],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      countryCode: ['', Validators.required],
      mobile: ['', Validators.required],
      altNumber: [''],
      email: ['', [Validators.required, Validators.email]],
      pincode: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
      address: ['']
    });

    // When DOB changes, calculate Age
    this.patientForm.get('dob')?.valueChanges.subscribe(dob => {
      if (dob) {
        const age = this.calculateAge(new Date(dob));
        this.patientForm.get('age')?.setValue(age, { emitEvent: false });
      }
    });

    // When Age changes, calculate DOB
    this.patientForm.get('age')?.valueChanges.subscribe(age => {
      if (age) {
        const dob = this.calculateDob(age);
        this.patientForm.get('dob')?.setValue(dob.toISOString().substring(0, 10), { emitEvent: false });
      }
    });
  }

  calculateAge(dob: Date): number {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  }

  calculateDob(age: number): Date {
    const today = new Date();
    return new Date(today.getFullYear() - age, today.getMonth(), today.getDate());
  }

   generatePatientId(): string {
    return "AM" + Math.floor(100000000 + Math.random() * 900000000).toString();
  }

  onSubmit() {
    if (this.patientForm.valid) {
      this.isLoading = true;
      const formData = this.patientForm.value;
      
      // Map form data to Patient interface
      const patientData: Patient = {
        patientId: this.generatePatientId(),
        salutation: formData.salutation,
        firstName: formData.firstName,
        middleName: formData.middleName || '',
        lastName: formData.lastName,
        dob: formData.dob,
        age: formData.age,
        gender: formData.gender,
        countryCode: formData.countryCode,
        mobile: formData.mobile,
        altNumber: formData.altNumber || '',
        email: formData.email,
        pincode: formData.pincode,
        country: formData.country,
        state: formData.state,
        district: formData.district,
        city: formData.city,
        address: formData.address || ''
      };

      // Call the service to create patient
      this.patientService.createPatient(patientData).subscribe({
        next: (createdPatient) => {
          console.log("Patient Registered Successfully:", createdPatient);
          alert("Patient Registered Successfully!");
          this.patientForm.reset();
          this.isLoading = false;
          // Navigate back to patient page with the new patient ID
          this.router.navigate(['/patient'], { 
            queryParams: { search: createdPatient.id } 
          });
        },
        error: (error) => {
          console.error("Error creating patient:", error);
          alert("Error creating patient. Please try again.");
          this.isLoading = false;
        }
      });
    } else {
      alert("Please fill all required fields!");
    }
  }

}
