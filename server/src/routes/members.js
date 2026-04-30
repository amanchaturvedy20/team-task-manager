import { Router } from 'express';
import { authenticate, authorizeProjectAccess } from '../middleware/auth.js';
import { validate, addProjectMemberSchema } from '../middleware/validation.js';
import * as memberController from '../controllers/memberController.js';

const router = Router({ mergeParams: true });

// Protect all routes with authentication
router.use(authenticate);

// Project member routes
router.post('/', authorizeProjectAccess(['owner']), validate(addProjectMemberSchema), memberController.addProjectMember);
router.get('/', authorizeProjectAccess(['owner', 'lead', 'member']), memberController.getProjectMembers);
router.delete('/:memberId', authorizeProjectAccess(['owner']), memberController.removeProjectMember);
router.put('/:memberId', authorizeProjectAccess(['owner']), memberController.updateMemberRole);

export default router;

