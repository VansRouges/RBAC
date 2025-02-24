"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const restaurantImageController_1 = require("../controllers/restaurantImageController");
const router = express_1.default.Router();
const upload = (0, multer_1.default)(); // Initialize Multer for in-memory file storage
// Route to upload an image
router.post('/upload', upload.single('image'), restaurantImageController_1.uploadImage);
exports.default = router;
