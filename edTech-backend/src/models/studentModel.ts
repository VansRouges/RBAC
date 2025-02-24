import { database, ID, Permission, Role, Query } from '../config/appwrite';
import { DATABASE_ID, STUDENTS_COLLECTION_ID } from '../config/environment';

export interface StudentData {
  firstName: string;
  lastName: string;
  gender: 'girl' | 'boy' | 'Boy' | 'Girl';
  className: string;
  age: number;
  creatorEmail: string;
}

// Create a new student
export async function createStudentInDB(data: StudentData) {
    return await database.createDocument(
      DATABASE_ID,
      STUDENTS_COLLECTION_ID,
      ID.unique(),
      data,
      [
        Permission.read(Role.any()),  // Public read permission
      ]
    );
}

// Fetch all students
export async function fetchStudentsFromDB() {
  const response = await database.listDocuments(DATABASE_ID, STUDENTS_COLLECTION_ID);
  return response.documents;
}