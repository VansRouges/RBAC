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
exports.createSchool = createSchool;
exports.getSchoolByCacId = getSchoolByCacId;
exports.updateSchool = updateSchool;
exports.getAllSchools = getAllSchools;
const schoolModel_1 = require("../models/schoolModel");
function createSchool(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, address, numberOfTeachers, curriculum, founder, numberOfStudents, gender, proprietor, proprietorEducation, admittance, email, cacId, foundingYear, moeRegistrationId, status, userId, schoolCode } = req.body;
            if (!['hybrid', 'day', 'boarding'].includes(admittance)) {
                res.status(400).json({ error: 'Invalid admittance type' });
                return;
            }
            if (!['girls', 'boys', 'mixed'].includes(gender)) {
                res.status(400).json({ error: 'Invalid gender type' });
                return;
            }
            const newSchool = yield (0, schoolModel_1.createSchoolInDB)({
                name,
                address,
                numberOfTeachers,
                curriculum,
                founder,
                numberOfStudents,
                gender,
                proprietor,
                proprietorEducation,
                admittance,
                email,
                cacId,
                foundingYear,
                moeRegistrationId,
                status,
                userId,
                schoolCode
            });
            res.status(201).json(newSchool);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function getSchoolByCacId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            const school = yield (0, schoolModel_1.fetchSchoolByCacIdFromDB)(userId);
            if (!school) {
                res.status(404).json({ error: 'School not found' });
                return;
            }
            res.status(200).json(school);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function updateSchool(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { schoolId } = req.params;
            const data = req.body;
            const updatedSchool = yield (0, schoolModel_1.updateSchoolInDB)(schoolId, data);
            res.status(200).json(updatedSchool);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function getAllSchools(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const schools = yield (0, schoolModel_1.fetchAllSchools)();
            res.status(200).json(schools);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
