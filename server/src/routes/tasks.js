import { Router } from 'express';
import { authenticate, authorizeProjectAccess } from '../middleware/auth.js';
import { validate, createTaskSchema, updateTaskSchema } from '../middleware/validation.js';
import * as taskController from '../controllers/taskController.js';

const router = Router({ mergeParams: true });

// Protect all routes with authentication and project access
router.use(authenticate);
router.use(authorizeProjectAccess(['owner', 'lead', 'member']));

// Task CRUD operations
router.post('/', validate(createTaskSchema), taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/:taskId', taskController.getTask);
router.put('/:taskId', validate(updateTaskSchema), taskController.updateTask);
router.delete('/:taskId', taskController.deleteTask);

export default router;

