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
exports.uploadImage = void 0;
const appwrite_1 = require("../config/appwrite"); // Ensure Appwrite client is configured
const environment_1 = require("../config/environment");
// Upload an image and return the file URL
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        const { originalname, buffer } = req.file;
        const file = new File([buffer], originalname, { type: req.file.mimetype });
        // Use .then().catch() for error handling without try-catch block
        appwrite_1.storage
            .createFile(environment_1.MENU_BUCKET_ID, appwrite_1.ID.unique(), file)
            .then((imageResponse) => {
            const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${environment_1.MENU_BUCKET_ID}/files/${imageResponse.$id}/view?project=${environment_1.APPWRITE_PROJECT_ID}`;
            res.status(201).send(imageUrl);
        })
            .catch((error) => {
            console.error('Error uploading image:', error); // Log the error
            res.status(500).json({ success: false, message: 'Image upload failed.', error: error.message });
        });
    }
    else {
        res.status(400).json({ success: false, message: 'No file uploaded.' });
    }
});
exports.uploadImage = uploadImage;
