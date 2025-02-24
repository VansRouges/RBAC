"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profileController_1 = require("../controllers/profileController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
// Route for creating a profile
router.post('/profile', authMiddleware_1.default, profileController_1.createProfile);
// Route for getting a profile by email
router.get('/profile/:email', authMiddleware_1.default, profileController_1.getProfileByEmail);
exports.default = router;
