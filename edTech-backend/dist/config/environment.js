"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROFILE_COLLECTION_ID = exports.ASSIGNMENTS_COLLECTION_ID = exports.STUDENTS_COLLECTION_ID = exports.SCHOOL_COLLECTION_ID = exports.DATABASE_ID = exports.APPWRITE_API_KEY = exports.APPWRITE_PROJECT_ID = exports.PERMIT_API_KEY = exports.APPWRITE_ENDPOINT = void 0;
// Environment variables setup
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env
exports.APPWRITE_ENDPOINT = process.env.APPWRITE_ENDPOINT || '';
exports.PERMIT_API_KEY = process.env.PERMIT_API_KEY || '';
exports.APPWRITE_PROJECT_ID = process.env.APPWRITE_PROJECT_ID || '';
exports.APPWRITE_API_KEY = process.env.APPWRITE_API_KEY || '';
exports.DATABASE_ID = process.env.APPWRITE_DATABASE_ID || '';
exports.SCHOOL_COLLECTION_ID = process.env.APPWRITE_SCHOOL_COLLECTION_ID || '';
exports.STUDENTS_COLLECTION_ID = process.env.APPWRITE_STUDENTS_COLLECTION_ID || '';
exports.ASSIGNMENTS_COLLECTION_ID = process.env.APPWRITE_ASSIGNMENTS_COLLECTION_ID || '';
exports.PROFILE_COLLECTION_ID = process.env.APPWRITE_PROFILE_COLLECTION_ID || '';
