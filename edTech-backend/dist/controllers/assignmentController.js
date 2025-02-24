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
exports.createAssignment = createAssignment;
exports.fetchAssignments = fetchAssignments;
const assignmentModel_1 = require("../models/assignmentModel");
const permitMiddleware_1 = require("../middlewares/permitMiddleware");
// Create a new assignment
function createAssignment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, subject, teacher, className, dueDate, creatorEmail } = req.body;
            const isPermitted = yield (0, permitMiddleware_1.syncUserToPermitAssigment)(creatorEmail, "create", "assignments");
            if (!isPermitted) {
                res.status(403).json({ error: 'Not authorized' });
                return;
            }
            const newAssignment = yield (0, assignmentModel_1.createAssignmentInDB)({
                title,
                subject,
                teacher,
                className,
                dueDate,
                creatorEmail
            });
            console.log('New assignment created:', newAssignment);
            res.status(201).json(newAssignment);
        }
        catch (error) {
            console.error('Error creating assignment:', error);
            res.status(500).json({ error: error.message });
        }
    });
}
// Fetch all assignments
function fetchAssignments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = req.params;
            const isPermitted = yield (0, permitMiddleware_1.syncUserToPermitAssigment)(email, "read", "assignments");
            if (!isPermitted) {
                res.status(403).json({ message: 'Not authorized' });
                return;
            }
            const assignments = yield (0, assignmentModel_1.fetchAssignmentsFromDB)();
            res.status(200).json(assignments);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
