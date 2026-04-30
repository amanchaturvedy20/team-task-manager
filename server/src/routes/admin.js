import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import * as adminController from '../controllers/adminController.js';

const router = Router();

// All admin routes require authentication + admin role
router.use(authenticate);
router.use(authorize(['admin']));

// User management
router.get('/users', adminController.getAllUsers);
router.put('/users/:userId/role', adminController.updateUserRole);
router.put('/users/:userId/toggle-active', adminController.toggleUserActive);

// System stats
router.get('/stats', adminController.getSystemStats);

// All projects
router.get('/projects', adminController.getAllProjects);

export default router;
