import express from 'express';
import userController from './user.controller.js';
import authMiddleware from '../../middleware/auth/auth.middleware.js';

const userRouter = express.Router();

userRouter.get('/user/:id', authMiddleware, userController.getUserById);
userRouter.patch('/user/:id', authMiddleware, userController.updateUser);

export default userRouter;
