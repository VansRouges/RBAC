"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/restaurantRoutes.ts
const express_1 = __importDefault(require("express"));
const restaurantController_1 = require("../controllers/restaurantController");
const router = express_1.default.Router();
// Define restaurant-related endpoints
// Create a new restaurant
/**
 * @swagger
 * /api/restaurants/create:
 *   post:
 *     summary: Create a restaurant
 *     responses:
 *       200:
 *         description: Restaurant created successfully
 */
router.post('/create', restaurantController_1.createRestaurant);
// Fetch a restaurant by user ID
/**
 * @swagger
 * /api/restaurants/{userId}:
 *   get:
 *     summary: Fetch restaurants by user ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurants fetched successfully
 */
router.get('/:userId', (req, res, next) => {
    (0, restaurantController_1.fetchRestaurantByUserId)(req, res).then(() => {
        next();
    }).catch((err) => {
        next(err);
    });
});
exports.default = router; // Export the router instance
