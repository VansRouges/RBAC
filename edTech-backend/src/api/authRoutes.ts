// src/routes/authRoutes.ts
import express from 'express';
import { signUp, login, logout } from '../controllers/authControllers';

const router = express.Router();

// Define auth-related endpoints
router.post('/signup', (req, res, next) => { // Signup route
    signUp(req, res).then(() => {
      next();
    }).catch((err) => {
      next(err);
    });
});
router.post('/login', (req, res, next) => { // Login route
    login(req, res).then(() => {
      next();
    }).catch((err) => {
      next(err);
    });
});
router.post('/logout', logout); // Logout route

// Example: Only Admins can access this route
// router.get('/admin-dashboard', checkPermission('view', 'admin_dashboard'), (req, res, next) => {
//   // Access control logic for admin dashboard
//   res.json({ message: 'Welcome to the Admin Dashboard' });
// });

// // Example: Only Teachers can create assignments
// router.post('/assignments', checkPermission('create', 'assignment'), (req, res, next) => {
//   res.json({ message: 'Assignment created successfully' });
// });

export default router; // Export the router instance
