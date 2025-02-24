"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/authRoutes.ts
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controllers/authControllers");
const router = express_1.default.Router();
// Define auth-related endpoints
router.post('/signup', (req, res, next) => {
    (0, authControllers_1.signUp)(req, res).then(() => {
        next();
    }).catch((err) => {
        next(err);
    });
});
router.post('/login', (req, res, next) => {
    (0, authControllers_1.login)(req, res).then(() => {
        next();
    }).catch((err) => {
        next(err);
    });
});
router.post('/logout', authControllers_1.logout); // Logout route
// Example: Only Admins can access this route
// router.get('/admin-dashboard', checkPermission('view', 'admin_dashboard'), (req, res, next) => {
//   // Access control logic for admin dashboard
//   res.json({ message: 'Welcome to the Admin Dashboard' });
// });
// // Example: Only Teachers can create assignments
// router.post('/assignments', checkPermission('create', 'assignment'), (req, res, next) => {
//   res.json({ message: 'Assignment created successfully' });
// });
exports.default = router; // Export the router instance
