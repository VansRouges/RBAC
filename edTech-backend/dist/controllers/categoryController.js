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
exports.editCategoryController = exports.deleteCategoryController = exports.fetchCategoriesByRestaurantId = exports.createCategory = void 0;
const appwrite_1 = require("../config/appwrite"); // Import configured Appwrite SDK
const appwrite_2 = require("appwrite");
const environment_1 = require("../config/environment");
const categoryModels_1 = require("../models/categoryModels");
// Create a new category
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, imageUrl, restaurantId } = req.body;
    try {
        const category = yield appwrite_1.database.createDocument(environment_1.DATABASE_ID, environment_1.CATEGORY_COLLECTION_ID, appwrite_2.ID.unique(), { name, imageUrl, restaurantId });
        res.status(201).json({ success: true, category });
    }
    catch (error) {
        console.error('Create Category Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.createCategory = createCategory;
// Fetch all categories or categories by a query
const fetchCategoriesByRestaurantId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { restaurantId } = req.params;
    if (!restaurantId) {
        return res.status(400).json({ success: false, message: "Restaurant ID is required." });
    }
    try {
        const categories = yield (0, categoryModels_1.fetchCategoriesByRestaurantIdFromDB)(restaurantId);
        if (categories.length === 0) {
            return res.status(404).json({ success: false, message: 'Categories not found.' });
        }
        res.status(200).json(categories);
    }
    catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.fetchCategoriesByRestaurantId = fetchCategoriesByRestaurantId;
const deleteCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    if (!categoryId) {
        return res.status(400).json({ success: false, message: "Category ID is required." });
    }
    try {
        const result = yield (0, categoryModels_1.deleteCategory)(categoryId);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.deleteCategoryController = deleteCategoryController;
// Controller to Edit a Category
const editCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const { name, imageUrl } = req.body;
    if (!categoryId || !name || !imageUrl) {
        return res.status(400).json({
            success: false,
            message: "Category ID, name, and imageUrl are required.",
        });
    }
    try {
        const updatedCategory = yield (0, categoryModels_1.editCategory)(categoryId, name, imageUrl);
        res.status(200).json({ success: true, category: updatedCategory });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.editCategoryController = editCategoryController;
