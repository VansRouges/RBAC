"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/menuRoutes.ts
const express_1 = __importDefault(require("express"));
const menuController_1 = require("../controllers/menuController");
const router = express_1.default.Router();
// Route to create a new menu
router.post('/create', menuController_1.createMenu);
// Route to fetch menus by restaurantId
router.get('/:restaurantId', (req, res, next) => {
    (0, menuController_1.fetchMenusByRestaurantId)(req, res).then(() => {
        next();
    }).catch((err) => {
        next(err);
    });
});
exports.default = router;
