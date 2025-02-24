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
exports.deleteMenu = exports.createMenu = exports.fetchMenusByRestaurantId = void 0;
const menuModels_1 = require("../models/menuModels");
const appwrite_1 = require("../config/appwrite");
const environment_1 = require("../config/environment");
// Create a new menu
const fetchMenusByRestaurantId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { restaurantId } = req.params;
    try {
        const menus = yield (0, menuModels_1.fetchMenuByRestaurantIdFromDB)(restaurantId);
        if (menus.length === 0) {
            return res.status(404).json({ success: false, message: 'Menus not found.' });
        }
        res.status(200).json(menus);
    }
    catch (error) {
        console.error('Error fetching menus:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.fetchMenusByRestaurantId = fetchMenusByRestaurantId;
// Fetch menus by restaurantId
const createMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { restaurantId, name, amount, discountedAmount, categories, imageUrl } = req.body;
    try {
        const menu = yield (0, menuModels_1.createMenuInDB)({
            name,
            amount,
            discountedAmount,
            categories,
            imageUrl,
            restaurantId,
        });
        res.status(201).json({ success: true, menu });
    }
    catch (error) {
        console.error('Error creating restaurant:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.createMenu = createMenu;
// Delete Menu Controller
const deleteMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { menuId } = req.params;
    if (!menuId) {
        return res.status(400).json({ success: false, message: 'Menu ID is required.' });
    }
    try {
        yield appwrite_1.database.deleteDocument(environment_1.DATABASE_ID, environment_1.MENU_COLLECTION_ID, menuId);
        res.status(200).json({ success: true, message: 'Menu deleted successfully.' });
    }
    catch (error) {
        console.error('Error deleting menu:', error.message);
        res.status(500).json({ success: false, message: 'Failed to delete menu.' });
    }
});
exports.deleteMenu = deleteMenu;
