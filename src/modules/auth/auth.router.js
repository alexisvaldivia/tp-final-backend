import { Router } from 'express';
import authController from '../auth/auth.controller.js';
import authMiddleware from '../../middleware/auth/auth.middleware.js';

const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

export default authRouter;