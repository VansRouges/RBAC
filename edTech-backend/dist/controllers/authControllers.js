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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signUp = void 0;
const appwrite_1 = require("../config/appwrite");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET; // Ensure this is set in your .env file
// Sign-up Controller
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ error: 'Name, email, and password are required.' });
    }
    try {
        const user = yield appwrite_1.account.create(appwrite_1.ID.unique(), email, password, name);
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ email }, JWT_SECRET, { expiresIn: '8h' });
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
        });
        res.status(201).json({ success: true, user, token });
    }
    catch (error) {
        console.error('Sign-up Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.signUp = signUp;
// Login Controller
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }
    try {
        const session = yield appwrite_1.account.createEmailPasswordSession(email, password);
        // Generate JWT without role
        const token = jsonwebtoken_1.default.sign({ userId: session.userId, email }, // No role included
        JWT_SECRET, { expiresIn: '8h' });
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
        });
        res.status(200).json({ success: true, token, session });
    }
    catch (error) {
        console.error('Login Error:', error);
        res.status(401).json({ success: false, message: error.message });
    }
});
exports.login = login;
// Logout Controller
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield appwrite_1.account.deleteSession('Current Session ID');
        res.clearCookie('token');
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    }
    catch (error) {
        console.error('Logout Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.logout = logout;
