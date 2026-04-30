import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import * as dashboardController from '../controllers/dashboardController.js';

const router = Router();

// Protect all routes
router.use(authenticate);

router.get('/', dashboardController.getDashboard);
router.get('/project/:projectId', dashboardController.getProjectStats);

export default router;

