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
exports.getProfileByEmail = exports.createProfile = void 0;
const axios_1 = __importDefault(require("axios"));
const appwrite_1 = require("../config/appwrite");
const environment_1 = require("../config/environment");
const profileId = process.env.APPWRITE_PROFILE_COLLECTION_ID; // Ensure this is in .env
const databaseId = process.env.APPWRITE_DATABASE_ID; // Ensure this is in .env
const PERMIT_API_URL = "https://api.permit.io/v2/facts/3e4b77901d8f4fd1a51109f8ed04f615/bf4959f547c74a1c8bff519b20a9174b/users";
const PERMIT_AUTH_HEADER = {
    Authorization: `Bearer ${environment_1.PERMIT_API_KEY}`,
    "Content-Type": "application/json",
};
// Function to sync user with Permit.io
// Create Profile Controller
const createProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { firstName, lastName, email, role, userId } = req.body;
    console.log(req.body);
    if (!email || !role || !userId) {
        res.status(400).json({ error: 'FirstName, lastName, email, role, and userId are required.' });
        return;
    }
    // Validate role
    const allowedRoles = ['Admin', 'Teacher', 'Student'];
    if (!allowedRoles.includes(role)) {
        res.status(400).json({ error: 'Invalid role. Allowed roles: admin, teacher, student' });
        return;
    }
    try {
        const newUser = yield appwrite_1.database.createDocument(databaseId, profileId, appwrite_1.ID.unique(), { firstName, lastName, email, role, userId });
        // Step 2: Sync user to Permit.io
        const permitPayload = {
            key: email,
            email,
            first_name: firstName,
            last_name: lastName,
            role_assignments: [{ role, tenant: "default" }],
        };
        let permitResponse;
        try {
            const response = yield axios_1.default.post(PERMIT_API_URL, permitPayload, { headers: PERMIT_AUTH_HEADER });
            permitResponse = response.data;
            console.log("User synced to Permit.io:", permitResponse);
        }
        catch (permitError) {
            if (axios_1.default.isAxiosError(permitError)) {
                console.error("Failed to sync user to Permit.io:", ((_a = permitError.response) === null || _a === void 0 ? void 0 : _a.data) || permitError.message);
            }
            else {
                console.error("Failed to sync user to Permit.io:", permitError);
            }
            permitResponse = { error: "Failed to sync with Permit.io" };
        }
        // Step 3: Return both responses
        res.status(201).json({
            message: "User profile created successfully",
            user: newUser,
            permit: permitResponse,
        });
        return;
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
        return;
    }
});
exports.createProfile = createProfile;
// Fetch Profile by Email
const getProfileByEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    if (!email) {
        res.status(400).json({ error: 'Email is required.' });
        return;
    }
    try {
        const profile = yield appwrite_1.database.listDocuments(databaseId, profileId, [appwrite_1.Query.equal("email", email)]);
        if (profile.documents.length === 0) {
            res.status(404).json({ error: 'Profile not found' });
            return;
        }
        res.status(200).json({ success: true, profile: profile.documents[0] });
    }
    catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.getProfileByEmail = getProfileByEmail;
