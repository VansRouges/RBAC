import { database, ID, Permission, Role, Query } from '../config/appwrite';
import { DATABASE_ID, SCHOOL_COLLECTION_ID } from '../config/environment';

type AdmittanceType = 'hybrid' | 'day' | 'boarding';
type GenderType = 'girls' | 'boys' | 'mixed';

export interface SchoolData {
  name: string;
  address: string;
  numberOfTeachers: number;
  curriculum: string;
  founder: string;
  numberOfStudents: number;
  gender: 'girls' | 'boys' | 'mixed';
  proprietor: string;
  proprietorEducation: string;
  admittance: 'hybrid' | 'day' | 'boarding';
  email: string;
  cacId: string;
  foundingYear: number;
  moeRegistrationId: string;
  status?: 'pending' | 'approved' | 'rejected';
  userId: string; 
  schoolCode?: string;
}

// Create a new school
export async function createSchoolInDB(data: SchoolData) {
    return await database.createDocument(
      DATABASE_ID,
      SCHOOL_COLLECTION_ID,
      ID.unique(),
      data,
      [
        Permission.read(Role.any()),  // Public read permission
      ]
    );
}

// Fetch a school by cacId
export async function fetchSchoolByCacIdFromDB(userId: string) {
  const response = await database.listDocuments(DATABASE_ID, SCHOOL_COLLECTION_ID, [
    Query.equal('userId', userId),
  ]);
  return response.documents.length > 0 ? response.documents[0] : null;
}

// Update a school by ID
export async function updateSchoolInDB(schoolId: string, data: Partial<SchoolData>) {
  try {
    const updatedSchool = await database.updateDocument(
      DATABASE_ID,
      SCHOOL_COLLECTION_ID,
      schoolId,
      data
    );
    return updatedSchool;
  } catch (error) {
    console.error('Error updating school:', error);
    throw error;
  }
}

// Fetch all schools and return an array of objects with school name and schoolCode
export async function fetchAllSchools(): Promise<{ name: string; schoolCode?: string }[]> {
  try {
    const response = await database.listDocuments(DATABASE_ID, SCHOOL_COLLECTION_ID);
    return response.documents.map((document) => {
      const school = document as unknown as SchoolData;
      return {
        name: school.name,
        schoolCode: school.schoolCode,
      };
    });
  } catch (error) {
    console.error('Error fetching schools:', error);
    throw error;
  }
}