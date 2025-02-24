"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const router = express_1.default.Router();
// Route to create a category
router.post('/create', categoryController_1.createCategory);
// Route to fetch categories by restaurantId
router.get('/:restaurantId', (req, res, next) => {
    (0, categoryController_1.fetchCategoriesByRestaurantId)(req, res).then(() => {
        next();
    }).catch((err) => {
        next(err);
    });
});
exports.default = router;
