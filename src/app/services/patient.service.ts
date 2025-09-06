import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../interfaces/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient)  { }
  baseUrl = "http://localhost:3000";
  
  getAllPatient(): Observable<Patient[]> {
    const url = this.baseUrl + "/user";
    return this.http.get<Patient[]>(url);
  }

  getPatientById(id: String): Observable<Patient> {
    const url = this.baseUrl + "/patient/" + id;
    return this.http.get<Patient>(url);
  }

  createPatient(patient: Patient): Observable<Patient> {
    const url = this.baseUrl + "/patient/";
    return this.http.post<Patient>(url, patient);
  }
}
