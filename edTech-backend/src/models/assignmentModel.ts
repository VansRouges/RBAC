import { database, ID } from '../config/appwrite';
import { DATABASE_ID, ASSIGNMENTS_COLLECTION_ID } from '../config/environment';

export interface AssignmentData {
  title: string;
  subject: string;
  className: string;
  teacher: string;
  dueDate: string;
  creatorEmail: string;
}

// Create a new assignment
export async function createAssignmentInDB(data: AssignmentData) {
    return await database.createDocument(
      DATABASE_ID,
      ASSIGNMENTS_COLLECTION_ID,
      ID.unique(),
      data
    );
}

// Fetch all assignments
export async function fetchAssignmentsFromDB() {
  const response = await database.listDocuments(DATABASE_ID, ASSIGNMENTS_COLLECTION_ID);
  return response.documents;
}