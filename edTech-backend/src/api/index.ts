import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';  // CORS middleware
import authRoutes from './authRoutes';  // Import auth routes
import profileRoutes from './profileRoutes';
import schoolRoutes from './schoolRoutes';
import studentRoutes from './studentRoutes';
import assignmentRoutes from './assignmentRoutes';
import { errorHandler } from '../utils/errorHandler';  // Custom error handler middleware
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../docs/swagger.json';

dotenv.config();  // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());  // Handle CORS
app.use(express.json());  /// Parse incoming JSON requests

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log(swaggerSpec);

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api', profileRoutes); // Profile routes mounted
app.use('/api', schoolRoutes); // School routes mounted
app.use('/api', studentRoutes); // Student routes mounted
app.use('/api/assignments', assignmentRoutes); // Assignment routes mounted

// Global Error Handling Middleware
app.use(errorHandler);  // Handle errors globally

// Default Route
app.get('/', (req: Request, res: Response) => {
  res.send('Appwrite Express API');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;