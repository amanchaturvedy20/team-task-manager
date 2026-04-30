import { Router } from 'express';
import { authenticate, authorizeProjectAccess } from '../middleware/auth.js';
import { validate, createProjectSchema, updateProjectSchema } from '../middleware/validation.js';
import * as projectController from '../controllers/projectController.js';

const router = Router();

// Protect all routes with authentication
router.use(authenticate);

// Project CRUD operations
router.post('/', validate(createProjectSchema), projectController.createProject);
router.get('/', projectController.getProjects);
router.get('/:projectId', authorizeProjectAccess(['owner', 'lead', 'member']), projectController.getProject);
router.put('/:projectId', authorizeProjectAccess(['owner']), validate(updateProjectSchema), projectController.updateProject);
router.delete('/:projectId', authorizeProjectAccess(['owner']), projectController.deleteProject);

export default router;

