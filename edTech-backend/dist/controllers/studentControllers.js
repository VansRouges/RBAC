"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudent = createStudent;
exports.fetchStudents = fetchStudents;
const studentModel_1 = require("../models/studentModel");
const permitMiddleware_1 = require("../middlewares/permitMiddleware");
function createStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { firstName, lastName, gender, className, age, creatorEmail } = req.body;
            if (!['girl', 'boy'].includes(gender)) {
                res.status(400).json({ error: 'Invalid gender type' });
                return;
            }
            const isPermitted = yield (0, permitMiddleware_1.syncUserToPermitStudents)(creatorEmail, "create", "students");
            if (!isPermitted) {
                res.status(403).json({ message: 'Not authorized' });
                return;
            }
            const newStudent = yield (0, studentModel_1.createStudentInDB)({
                firstName,
                lastName,
                gender,
                className,
                age,
                creatorEmail
            });
            res.status(201).json(newStudent);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
// Fetch all students
function fetchStudents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = req.params;
            const isPermitted = yield (0, permitMiddleware_1.syncUserToPermitStudents)(email, "read", "students");
            if (!isPermitted) {
                res.status(403).json({ message: 'Not authorized' });
                return;
            }
            const students = yield (0, studentModel_1.fetchStudentsFromDB)();
            res.status(200).json(students);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
