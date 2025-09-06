import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientComponent } from './patient/patient.component';
import { EproComponent } from './epro/epro.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { PatientManagePageComponent } from './patient-manage-page/patient-manage-page.component';
import { MedicationManagePageComponent } from './medication-manage-page/medication-manage-page.component';
import { ReportManagePageComponent } from './report-manage-page/report-manage-page.component';
import { NotfoundComponent } from './notfound/notfound.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'signup', component: SignupComponent, data: { title: 'Sign Up' } },
  { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'manage-patient', component: PatientManagePageComponent, data: { title: 'Manage Patient' } },
  { path: 'manage-medication', component: MedicationManagePageComponent, data: { title: 'Manage Medicine' } },
  { path: 'manage-reports', component: ReportManagePageComponent, data: { title: 'Manage Report' } },
  { path: 'patient', component: PatientComponent, data: { title: 'Patient Search' } }, // Added route for patient search
  { path: 'patient/:id', component: PatientComponent, data: { title: 'Patient' } },
  { path: 'patient-registration', component: PatientRegistrationComponent, data: { title: 'Patient Registration' } },
  { path: 'epro', component: EproComponent, data: { title: 'Epro' } },
  
  { path: '**', component: NotfoundComponent }
];