import express from 'express';
import { authController } from './auth.controller.js';

const authRouter = express.Router();

authRouter.post('/auth/register', authController.singUp);

export default authRouter;