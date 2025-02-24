export interface Profile {
    name: string;
    email: string;
    role: 'Admin' | 'Teacher' | 'Student';
    userId: string;
  }
  