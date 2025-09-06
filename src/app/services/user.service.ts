import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) { 
    // Check if user is already logged in from localStorage (only in browser)
    if (this.isBrowser()) {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      this.isLoggedInSubject.next(isLoggedIn);
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && window.localStorage !== undefined;
  }

  baseUrl = "http://localhost:3000";

  // Get all users
  getUser(): Observable<User[]> {
    const url = this.baseUrl + "/user";
    return this.http.get<User[]>(url);
  }

  // Login method - validates user credentials against API
  login(email: string, password: string): Observable<{ success: boolean; user?: User; message?: string }> {
    return this.getUser().pipe(
      map(users => {
        // Find user with matching email and password
        const user = users.find(u => 
          u.loginEmailId === email && u.password === password
        );
        
        if (user) {
          // User found, login successful
          this.isLoggedInSubject.next(true);
          if (this.isBrowser()) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return { success: true, user: user };
        } else {
          // User not found, login failed
          return { 
            success: false, 
            message: 'Invalid email or password. Please check your credentials and try again.' 
          };
        }
      })
    );
  }

  // Signup method - creates a new user
  signup(signupData: any): Observable<{ success: boolean; user?: User; message?: string }> {
    // First check if user already exists
    return this.getUser().pipe(
      switchMap(users => {
        const existingUser = users.find(u => u.loginEmailId === signupData.email);
        
        if (existingUser) {
          return of({ 
            success: false, 
            message: 'An account with this email already exists. Please use a different email or try logging in.' 
          });
        }
        
        // If user doesn't exist, create new user and save to database
        const newUser: User = {
          id: (users.length + 1).toString(),
          firstName: signupData.firstName,
          lastName: signupData.lastName,
          loginEmailId: signupData.email,
          password: signupData.password,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        // Save to database via POST request
        return this.http.post<{ success: boolean; user: User; message: string }>(
          `${this.baseUrl}/user`, 
          newUser
        );
      })
    );
  }

  // Logout method
  logout(): void {
    this.isLoggedInSubject.next(false);
    if (this.isBrowser()) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('currentUser');
    }
  }

  // Get current user
  getCurrentUser(): User | null {
    if (!this.isBrowser()) {
      return null;
    }
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Check if user is logged in
  isUserLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
}
