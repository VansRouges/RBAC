import express from 'express';
import { createSchool, getSchoolByCacId, updateSchool, getAllSchools } from '../controllers/schoolController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/schools', authMiddleware, createSchool);
router.get('/schools/:userId', authMiddleware, getSchoolByCacId);
router.put('/schools/:schoolId', authMiddleware, updateSchool);
router.get('/schools', authMiddleware, getAllSchools);

export default router;
