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
exports.syncUserToPermitAssigment = exports.syncUserToPermitStudents = void 0;
const permit_1 = __importDefault(require("../utils/permit"));
const syncUserToPermitStudents = (email, action, resource) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const permitted = yield permit_1.default.check(email, action, resource);
        console.log("Permitted", permitted);
        return permitted;
    }
    catch (error) {
        console.error(`Error syncing user ${email} to Permit.io:`, error);
        return false;
    }
});
exports.syncUserToPermitStudents = syncUserToPermitStudents;
const syncUserToPermitAssigment = (email, action, resource) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const permitted = yield permit_1.default.check(email, action, resource);
        console.log("Permitted", permitted);
        return permitted;
    }
    catch (error) {
        console.error(`Error syncing user ${email} to Permit.io:`, error);
        return false;
    }
});
exports.syncUserToPermitAssigment = syncUserToPermitAssigment;
