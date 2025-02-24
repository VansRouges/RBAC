import { 
    createSchoolInDB, 
    fetchSchoolByCacIdFromDB, 
    updateSchoolInDB,
    fetchAllSchools
} from '../models/schoolModel';
import { Request, Response } from 'express';

interface School {
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

export async function createSchool(req: Request, res: Response): Promise<void> {
    try {
        const { 
            name,
            address, 
            numberOfTeachers, 
            curriculum, 
            founder, 
            numberOfStudents, 
            gender, 
            proprietor, 
            proprietorEducation, 
            admittance, 
            email, 
            cacId, 
            foundingYear, 
            moeRegistrationId, 
            status, 
            userId, 
            schoolCode
         }: School = req.body;

        if (!['hybrid', 'day', 'boarding'].includes(admittance)) {
            res.status(400).json({ error: 'Invalid admittance type' });
            return;
        }

        if (!['girls', 'boys', 'mixed'].includes(gender)) {
            res.status(400).json({ error: 'Invalid gender type' });
            return;
        }

        const newSchool = await createSchoolInDB({
            name,
            address,
            numberOfTeachers,
            curriculum,
            founder,
            numberOfStudents,
            gender,
            proprietor,
            proprietorEducation,
            admittance,
            email,
            cacId,
            foundingYear,
            moeRegistrationId,
            status,
            userId,
            schoolCode
        });

        res.status(201).json(newSchool);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
}

export async function getSchoolByCacId(req: Request, res: Response): Promise<void> {
    try {
        const { userId } = req.params;
        const school = await fetchSchoolByCacIdFromDB(userId);

        if (!school) {
            res.status(404).json({ error: 'School not found' });
            return;
        }

        res.status(200).json(school);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
}

export async function updateSchool(req: Request, res: Response): Promise<void> {
    try {
        const { schoolId } = req.params;
        const data: Partial<School> = req.body;

        const updatedSchool = await updateSchoolInDB(schoolId, data);

        res.status(200).json(updatedSchool);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
}

export async function getAllSchools(req: Request, res: Response): Promise<void> {
    try {
        const schools = await fetchAllSchools();
        res.status(200).json(schools);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
}