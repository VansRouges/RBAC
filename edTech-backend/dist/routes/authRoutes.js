"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/authRoutes.ts
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controllers/authControllers");
const router = express_1.default.Router();
// Define auth-related endpoints
router.post('/signup', authControllers_1.signUp); // Signup route
router.post('/login', authControllers_1.login); // Login route
router.post('/logout', authControllers_1.logout); // Logout route
exports.default = router; // Export the router instance
