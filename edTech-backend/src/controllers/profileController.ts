import { Profile } from '@/models/profile';
import axios from 'axios';
import { database, ID, Query } from '../config/appwrite';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { PERMIT_API_KEY } from '../config/environment';

const profileId = process.env.APPWRITE_PROFILE_COLLECTION_ID as string; // Ensure this is in .env
const databaseId = process.env.APPWRITE_DATABASE_ID as string; // Ensure this is in .env

const PERMIT_API_URL = "https://api.permit.io/v2/facts/3e4b77901d8f4fd1a51109f8ed04f615/bf4959f547c74a1c8bff519b20a9174b/users";
const PERMIT_AUTH_HEADER = {
  Authorization: `Bearer ${PERMIT_API_KEY}`,
  "Content-Type": "application/json",
};

// Function to sync user with Permit.io


// Create Profile Controller
export const createProfile: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { firstName, lastName, email, role, userId } = req.body;
  console.log(req.body);

  if (!email || !role || !userId) {
    res.status(400).json({ error: 'FirstName, lastName, email, role, and userId are required.' });
    return;
  }

  // Validate role
  const allowedRoles: Profile['role'][] = ['Admin', 'Teacher', 'Student'];
  if (!allowedRoles.includes(role)) {
    res.status(400).json({ error: 'Invalid role. Allowed roles: admin, teacher, student' });
    return;
  }

  try {
    const newUser = await database.createDocument(
      databaseId,
      profileId,
      ID.unique(),
      { firstName, lastName, email, role, userId }
    );
    // Step 2: Sync user to Permit.io
    const permitPayload = {
      key: email,
      email,
      first_name: firstName,
      last_name: lastName,
      role_assignments: [{ role, tenant: "default" }],
    };

    let permitResponse;
    try {
      const response = await axios.post(PERMIT_API_URL, permitPayload, { headers: PERMIT_AUTH_HEADER });
      permitResponse = response.data;
      console.log("User synced to Permit.io:", permitResponse);
    } catch (permitError) {
      if (axios.isAxiosError(permitError)) {
        console.error("Failed to sync user to Permit.io:", permitError.response?.data || permitError.message);
      } else {
        console.error("Failed to sync user to Permit.io:", permitError);
      }
      permitResponse = { error: "Failed to sync with Permit.io" };
    }

    // Step 3: Return both responses
    res.status(201).json({
      message: "User profile created successfully",
      user: newUser,
      permit: permitResponse,
    });
    return;
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }
};

// Fetch Profile by Email
export const getProfileByEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email } = req.params;
    
  if (!email) {
    res.status(400).json({ error: 'Email is required.' });
    return;
  } 

  try {
    const profile = await database.listDocuments(
      databaseId,
      profileId, 
      [Query.equal("email", email)]
    );

    if (profile.documents.length === 0) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }

    res.status(200).json({ success: true, profile: profile.documents[0] });
  } catch (error: any) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
