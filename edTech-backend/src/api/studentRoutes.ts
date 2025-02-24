import express from 'express';
import { createStudent, fetchStudents } from '../controllers/studentControllers';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// Define student-related endpoints
router.post('/students', authMiddleware, createStudent); // Create a new student
router.get('/students/:email', authMiddleware, fetchStudents); // Fetch all students

export default router; // Export the router instance