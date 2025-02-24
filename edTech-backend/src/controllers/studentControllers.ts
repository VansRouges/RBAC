import {
    createStudentInDB,
    fetchStudentsFromDB,
    StudentData
} from '../models/studentModel';
import { Request, Response } from 'express';
import { syncUserToPermitStudents } from '../middlewares/permitMiddleware';


export async function createStudent(req: Request, res: Response): Promise<void> {
    try {
        const { firstName, lastName, gender, className, age, creatorEmail }: StudentData = req.body;

        if (!['girl', 'boy'].includes(gender)) {
            res.status(400).json({ error: 'Invalid gender type' });
            return;
        }

        const isPermitted = await syncUserToPermitStudents(creatorEmail, "create", "students");
        if (!isPermitted) {
            res.status(403).json({ message: 'Not authorized' });
            return;
        }

        const newStudent = await createStudentInDB({ 
            firstName,
            lastName,
            gender,
            className,
            age,
            creatorEmail
        });
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }   
}

// Fetch all students
export async function fetchStudents(req: Request, res: Response): Promise<void> {
    try {
        const { email } = req.params;

        const isPermitted = await syncUserToPermitStudents(email, "read", "students");
        if (!isPermitted) {
            res.status(403).json({ message: 'Not authorized' });
            return;
        }

        const students = await fetchStudentsFromDB();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
}