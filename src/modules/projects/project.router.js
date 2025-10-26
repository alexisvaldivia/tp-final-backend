import express from 'express';
import projectController from './project.controller.js';
import authMiddleware from '../../middleware/auth/auth.middleware.js';

const projectRouter = express.Router();

projectRouter.get('/projects', projectController.getAll);
projectRouter.post(
	'/projects',
	authMiddleware,
	projectController.createProject
);
projectRouter.get('/projects/:idUser', projectController.getAllUserProjects)

export default projectRouter;
