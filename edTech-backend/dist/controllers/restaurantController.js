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
exports.validateSlug = exports.createRestaurant = exports.fetchRestaurantByUserId = void 0;
const restaurantModels_1 = require("../models/restaurantModels");
const appwrite_1 = require("../config/appwrite");
const environment_1 = require("../config/environment");
// Fetch a restaurant by user ID
const fetchRestaurantByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const restaurant = yield (0, restaurantModels_1.fetchRestaurantByUserIdFromDB)(userId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found.' });
        }
        res.status(200).json(restaurant);
    }
    catch (error) {
        console.error('Error fetching restaurant:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.fetchRestaurantByUserId = fetchRestaurantByUserId;
// Create a new restaurant
const createRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurantData = req.body;
    try {
        const restaurant = yield (0, restaurantModels_1.createRestaurantInDB)(restaurantData);
        res.status(201).json({ success: true, restaurant });
    }
    catch (error) {
        console.error('Error creating restaurant:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.createRestaurant = createRestaurant;
// Function to generate slugs
function generateSlug(str) {
    return str
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .trim()
        .replace(/\s+/g, '-'); // Replace spaces with hyphens
}
// Controller to validate slug uniqueness
const validateSlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { restaurantName } = req.body;
        if (!restaurantName) {
            return res.status(400).json({ message: 'Restaurant name is required.' });
        }
        const slug = generateSlug(restaurantName);
        // Check if the slug already exists in the restaurant collection
        const existingSlugs = yield appwrite_1.database.listDocuments(environment_1.DATABASE_ID, environment_1.RESTAURANT_COLLECTION_ID, [
            appwrite_1.Query.equal('slug', slug),
        ]);
        if (existingSlugs.documents.length > 0) {
            return res.status(409).json({ message: 'This restaurant name is already taken. Please choose a different name.' });
        }
        return res.status(200).json({ message: 'Slug is available.', slug });
    }
    catch (error) {
        console.error('Error validating slug:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});
exports.validateSlug = validateSlug;
