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
exports.createSchoolInDB = createSchoolInDB;
exports.fetchSchoolByCacIdFromDB = fetchSchoolByCacIdFromDB;
exports.updateSchoolInDB = updateSchoolInDB;
exports.fetchAllSchools = fetchAllSchools;
const appwrite_1 = require("../config/appwrite");
const environment_1 = require("../config/environment");
// Create a new school
function createSchoolInDB(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield appwrite_1.database.createDocument(environment_1.DATABASE_ID, environment_1.SCHOOL_COLLECTION_ID, appwrite_1.ID.unique(), data, [
            appwrite_1.Permission.read(appwrite_1.Role.any()), // Public read permission
        ]);
    });
}
// Fetch a school by cacId
function fetchSchoolByCacIdFromDB(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield appwrite_1.database.listDocuments(environment_1.DATABASE_ID, environment_1.SCHOOL_COLLECTION_ID, [
            appwrite_1.Query.equal('userId', userId),
        ]);
        return response.documents.length > 0 ? response.documents[0] : null;
    });
}
// Update a school by ID
function updateSchoolInDB(schoolId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedSchool = yield appwrite_1.database.updateDocument(environment_1.DATABASE_ID, environment_1.SCHOOL_COLLECTION_ID, schoolId, data);
            return updatedSchool;
        }
        catch (error) {
            console.error('Error updating school:', error);
            throw error;
        }
    });
}
// Fetch all schools and return an array of objects with school name and schoolCode
function fetchAllSchools() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield appwrite_1.database.listDocuments(environment_1.DATABASE_ID, environment_1.SCHOOL_COLLECTION_ID);
            return response.documents.map((document) => {
                const school = document;
                return {
                    name: school.name,
                    schoolCode: school.schoolCode,
                };
            });
        }
        catch (error) {
            console.error('Error fetching schools:', error);
            throw error;
        }
    });
}
