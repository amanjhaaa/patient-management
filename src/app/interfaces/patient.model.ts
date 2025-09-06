export interface Patient {
    id? : String;
    patientId: string;
    salutation: string;
    firstName: string;
    middleName?: string;   // optional
    lastName: string;
    dob: string;           // ISO date string (YYYY-MM-DD)
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    countryCode: string;
    mobile: string;
    altNumber?: string;    // optional
    email: string;
    pincode: string;
    country: string;
    state: string;
    district: string;
    city: string;
    address?: string;      // optional
  }
  