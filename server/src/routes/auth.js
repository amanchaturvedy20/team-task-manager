import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { validate, signupSchema, loginSchema } from '../middleware/validation.js';
import * as authController from '../controllers/authController.js';

const router = Router();

// User signup
router.post('/user/signup', validate(signupSchema), authController.signup);
router.post('/user/login', validate(loginSchema), authController.login);

// Admin signup
router.post('/admin/signup', validate(signupSchema), authController.signupAdmin);
router.post('/admin/login', validate(loginSchema), authController.loginAdmin);

// Protected routes
router.get('/profile', authenticate, authController.getProfile);

export default router;

