"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentControllers_1 = require("../controllers/studentControllers");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
// Define student-related endpoints
router.post('/students', authMiddleware_1.default, studentControllers_1.createStudent); // Create a new student
router.get('/students/:email', authMiddleware_1.default, studentControllers_1.fetchStudents); // Fetch all students
exports.default = router; // Export the router instance
