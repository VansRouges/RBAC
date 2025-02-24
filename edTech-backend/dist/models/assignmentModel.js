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
exports.createAssignmentInDB = createAssignmentInDB;
exports.fetchAssignmentsFromDB = fetchAssignmentsFromDB;
const appwrite_1 = require("../config/appwrite");
const environment_1 = require("../config/environment");
// Create a new assignment
function createAssignmentInDB(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield appwrite_1.database.createDocument(environment_1.DATABASE_ID, environment_1.ASSIGNMENTS_COLLECTION_ID, appwrite_1.ID.unique(), data);
    });
}
// Fetch all assignments
function fetchAssignmentsFromDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield appwrite_1.database.listDocuments(environment_1.DATABASE_ID, environment_1.ASSIGNMENTS_COLLECTION_ID);
        return response.documents;
    });
}
