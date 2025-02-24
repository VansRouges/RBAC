// Environment variables setup
import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env

export const APPWRITE_ENDPOINT = process.env.APPWRITE_ENDPOINT || '';
export const PERMIT_API_KEY = process.env.PERMIT_API_KEY || '';
export const APPWRITE_PROJECT_ID = process.env.APPWRITE_PROJECT_ID || '';
export const APPWRITE_API_KEY = process.env.APPWRITE_API_KEY || '';
export const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || '';
export const SCHOOL_COLLECTION_ID = process.env.APPWRITE_SCHOOL_COLLECTION_ID || '';
export const STUDENTS_COLLECTION_ID = process.env.APPWRITE_STUDENTS_COLLECTION_ID || '';
export const ASSIGNMENTS_COLLECTION_ID = process.env.APPWRITE_ASSIGNMENTS_COLLECTION_ID || '';
export const PROFILE_COLLECTION_ID = process.env.APPWRITE_PROFILE_COLLECTION_ID || '';