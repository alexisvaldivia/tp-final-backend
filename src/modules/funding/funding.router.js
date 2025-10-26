import express from 'express';
import authMiddleware from '../../middleware/auth/auth.middleware.js';
import fundingController from './funding.controller.js';

const fundingRouter = express.Router();

fundingRouter.post('/funding', authMiddleware, fundingController.createFunding);

fundingRouter.get(
	'/funding/project/:projectId',
	fundingController.getFundingsByProject
);

export default fundingRouter;
